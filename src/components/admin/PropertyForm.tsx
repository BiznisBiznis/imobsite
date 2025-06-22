import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { teamService } from "@/services/api";
import type { TeamMember } from "@/types/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { Property } from "@/types/api";

// Property types
const PROPERTY_TYPES = [
  "Apartament",
  "Garsonieră",
  "Casă",
  "Teren",
  "Spațiu comercial"
] as const;

// Define the form schema with conditional validation
const propertyFormSchema = z.object({
  title: z.string().min(10, "Titlul trebuie să aibă cel puțin 10 caractere"),
  description: z.string().optional(),
  price: z.number().min(1, "Prețul trebuie să fie mai mare de 0"),
  address: z.string().optional(),
  city: z.string().optional(),
  county: z.string().optional(),
  area: z.number().min(1, "Suprafața trebuie să fie mai mare de 0"),
  rooms: z.number().min(0, "Numărul de camere nu poate fi negativ").optional(),
  floor: z.number().optional(),
  yearBuilt: z.number().min(1900, "Anul construcției nu este valid").optional(),
  type: z.string().min(1, "Tipul proprietății este obligatoriu"),
  category: z.string().default("vanzare"),
  status: z.string().default("disponibil"),
  videoUrl: z.string().url("URL-ul video nu este valid").or(z.literal("")).optional(),
  thumbnailUrl: z.string().url("URL-ul imaginii nu este valid").or(z.literal("")).optional(),
  featured: z.boolean().default(false),
  badges: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),
  currency: z.string().default("EUR"),
  agentId: z.string().optional(),
}).refine((data) => {
  // Make rooms required only for non-land property types
  if (data.type !== 'Teren' && (data.rooms === undefined || data.rooms === null)) {
    return false;
  }
  return true;
}, {
  message: "Numărul de camere este obligatoriu pentru acest tip de proprietate",
  path: ["rooms"]
});

// Define form values type
type PropertyFormValues = z.infer<typeof propertyFormSchema>;

// Interface for property form data
interface PropertyFormData extends Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'contactCount' | 'coordinates' | 'agent' | 'county' | 'agentId'> {
  address?: string;
  badges: string[];
  agentId?: string; // Make agentId optional in the form
  county?: string;
}

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PropertyForm = ({
  initialData = {},
  onSubmit: onSubmitProp,
  onCancel,
  isLoading,
}: PropertyFormProps) => {
  // Create default form values based on the schema
  // Default form values
  const defaultFormValues: PropertyFormValues = {
    title: "",
    description: "",
    price: 0,
    type: "Apartament",
    area: 0,
    address: "",
    city: "",
    county: "",
    rooms: 1, // Default to 1 room for new properties
    yearBuilt: new Date().getFullYear(), // Default to current year
    floor: 0, // Default to ground floor
    videoUrl: "",
    thumbnailUrl: "",
    featured: false,
    currency: "EUR",
    badges: [],
    amenities: [],
    category: "vanzare",
    status: "disponibil",
    agentId: ""
  };

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  // Fetch team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoadingTeam(true);
        const response = await teamService.getAll();
        if (response?.data?.data) {
          setTeamMembers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
        // Optionally show error to user
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      ...defaultFormValues,
      ...initialData,
    },
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      // Create a clean object with only the fields that exist in the form schema
      const cleanInitialData: Record<string, unknown> = {};
      
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Only include fields that exist in the form schema
          if (key in propertyFormSchema.shape) {
            // Convert string numbers to numbers for numeric fields
            if (['floor', 'yearBuilt', 'totalFloors', 'rooms', 'area', 'price'].includes(key)) {
              if (value === '') {
                cleanInitialData[key] = undefined;
              } else {
                const numValue = Number(value);
                cleanInitialData[key] = isNaN(numValue) ? undefined : numValue;
              }
            } else {
              cleanInitialData[key] = value;
            }
          }
        }
      });
      
      // Create a new object with default values and override with initial data
      const formValues: PropertyFormValues = {
        ...defaultFormValues,
        ...cleanInitialData,
        // Ensure arrays are properly initialized
        badges: Array.isArray(cleanInitialData.badges) ? cleanInitialData.badges : [],
        amenities: Array.isArray(cleanInitialData.amenities) ? cleanInitialData.amenities : [],
      };
      
      // Reset form with merged values
      form.reset(formValues);
    }
  }, [initialData, form, defaultFormValues]);

  const onSubmit = (data: PropertyFormValues) => {
    // Prepare the data for submission with proper defaults
    const isLand = data.type === 'Teren';
    const submitData: any = {
      ...data,
      // Ensure numeric fields are properly converted
      price: Number(data.price) || 0,
      area: Number(data.area) || 0,
      rooms: isLand ? 0 : (Number(data.rooms) || 0),
      floor: isLand ? 0 : (Number(data.floor) || 0),
      yearBuilt: isLand ? new Date().getFullYear() : (Number(data.yearBuilt) || new Date().getFullYear()),
      
      // Ensure arrays are properly formatted
      badges: Array.isArray(data.badges) ? data.badges : [],
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      
      // Ensure required strings are not empty
      title: data.title?.trim() || 'Fără titlu',
      description: data.description?.trim() || '',
      address: data.address?.trim() || null,
      city: data.city?.trim() || null,
      county: data.county?.trim() || null,
      type: data.type || 'Apartament',
      category: data.category || 'vanzare',
      status: data.status || 'disponibil',
      currency: data.currency || 'EUR',
      
      // Handle optional URLs
      videoUrl: data.videoUrl?.trim() || null,
      thumbnailUrl: data.thumbnailUrl?.trim() || null,
      
      // Only include agentId if it's a non-empty string
      ...(data.agentId?.trim() ? { agentId: data.agentId.trim() } : {})
    };
    
    console.log('Submitting property data:', submitData);
    onSubmitProp(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titlu Proprietate *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Exemplu: Apartament 2 camere ultracentral..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preț (€) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Exemplu: 85000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tip proprietate *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează tipul" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suprafață (mp) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="65"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresă (opțional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Strada, număr, bloc, scara..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oraș (opțional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Exemplu: București"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("type") !== "Teren" && (
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Camere</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Exemplu: 3"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.watch("type") !== "Teren" && (
              <>
                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>An construcție</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1900"
                          max={new Date().getFullYear() + 1}
                          placeholder="Exemplu: 2020"
                          value={field.value === undefined ? '' : field.value}
                          onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value);
                            field.onChange(isNaN(value) ? undefined : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etaj</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Exemplu: 2"
                          value={field.value === undefined ? '' : field.value}
                          onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value);
                            field.onChange(isNaN(value) ? undefined : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriere</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descriere detaliată a proprietății..."
                    className="min-h-[120px]"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video YouTube</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lipește aici link-ul YouTube (ex: https://www.youtube.com/watch?v=...)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Poți lipi link-ul direct de la un video YouTube (normal sau Shorts).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Thumbnail (opțional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Sau lasă gol pentru thumbnail-ul automat din YouTube
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Video Preview */}
          {form.watch("videoUrl") && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-medium mb-3">Previzualizare Video</h4>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={(() => {
                    const url = form.watch("videoUrl") || '';
                    // Handle regular YouTube URLs
                    if (url.includes('youtube.com/watch?v=')) {
                      return url.replace('watch?v=', 'embed/');
                    }
                    // Handle youtu.be short URLs
                    if (url.includes('youtu.be/')) {
                      return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
                    }
                    // Handle YouTube Shorts
                    if (url.includes('youtube.com/shorts/')) {
                      return url.replace('shorts/', 'embed/');
                    }
                    return url;
                  })()}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Video Preview"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                💡 Pentru a selecta un thumbnail personalizat din video, poți
                face screenshot și uploada imaginea
              </p>
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Auto-generate thumbnail URL from YouTube video
                    const videoUrl = form.watch("videoUrl") || '';
                    let videoId = '';
                    
                    // Extract video ID from different YouTube URL formats
                    if (videoUrl.includes('youtube.com/watch?v=')) {
                      videoId = videoUrl.split('v=')[1].split('&')[0];
                    } else if (videoUrl.includes('youtu.be/')) {
                      videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                    } else if (videoUrl.includes('youtube.com/shorts/')) {
                      videoId = videoUrl.split('shorts/')[1].split('?')[0];
                    }
                    
                    if (videoId) {
                      // Set thumbnail URL (maxresdefault.jpg for best quality)
                      form.setValue('thumbnailUrl', `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
                      
                      // Also try to set the title automatically if empty
                      if (!form.watch('title')) {
                        // This is a placeholder - in a real app, you might want to use the YouTube API
                        form.setValue('title', 'Video din YouTube');
                      }
                    }
                  }}
                >
                  Generează thumbnail din video
                </Button>
              </div>
            </div>
          )}

          {/* Agent Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agent Imobiliar</h3>
            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === 'none' ? undefined : value);
                    }}
                    value={field.value || 'none'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează agentul imobiliar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Fără agent</SelectItem>
                      {loadingTeam ? (
                        <div className="px-2 py-1.5 text-sm text-gray-500">Se încarcă agenții...</div>
                      ) : teamMembers?.length > 0 ? (
                        teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} {member.role ? `- ${member.role}` : ''}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-1.5 text-sm text-gray-500">Niciun agent disponibil</div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading || loadingTeam}
            >
              {isLoading
                ? "Se salvează..."
                : initialData
                  ? "Actualizează"
                  : "Adaugă Proprietatea"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Anulează
            </Button>
          </div>
          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Etichete</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {['Nou', 'Vânzare', 'Închiriere', 'Recomandat', 'Redus', 'Oferta zilei'].map((badge) => (
                <div key={badge} className="flex items-center space-x-2">
                  <Checkbox
                    id={`badge-${badge}`}
                    checked={form.watch('badges')?.includes(badge) || false}
                    onCheckedChange={(checked) => {
                      const currentBadges = form.getValues('badges') || [];
                      if (checked) {
                        form.setValue('badges', [...currentBadges, badge]);
                      } else {
                        form.setValue('badges', currentBadges.filter(b => b !== badge));
                      }
                    }}
                  />
                  <label
                    htmlFor={`badge-${badge}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {badge}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Input
                placeholder="Adaugă altă etichetă"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.preventDefault();
                    const newBadge = e.currentTarget.value.trim();
                    const currentBadges = form.getValues('badges') || [];
                    if (!currentBadges.includes(newBadge)) {
                      form.setValue('badges', [...currentBadges, newBadge]);
                    }
                    e.currentTarget.value = '';
                  }
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Apasă Enter pentru a adăuga o etichetă nouă
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.watch('badges')?.map((badge) => (
                <div 
                  key={badge} 
                  className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-md flex items-center"
                >
                  {badge}
                  <button
                    type="button"
                    onClick={() => {
                      const currentBadges = form.getValues('badges') || [];
                      form.setValue('badges', currentBadges.filter(b => b !== badge));
                    }}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PropertyForm;
