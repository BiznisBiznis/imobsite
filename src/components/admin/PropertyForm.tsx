import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { YouTubePlayer } from "../YouTubePlayer";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const propertyFormSchema = z.object({
  title: z.string().min(10, "Titlul trebuie să aibă cel puțin 10 caractere"),
  price: z.union([
    z.number().min(1, "Prețul trebuie să fie mai mare de 0"),
    z.string().min(1, "Prețul este obligatoriu").transform(Number)
  ]).refine(val => val > 0, "Prețul trebuie să fie mai mare de 0"),
  location: z.string().min(5, "Locația trebuie să aibă cel puțin 5 caractere"),
  area: z.union([
    z.number().min(1, "Suprafața trebuie să fie mai mare de 0"),
    z.string().min(1, "Suprafața este obligatorie").transform(Number)
  ]).refine(val => val > 0, "Suprafața trebuie să fie mai mare de 0"),
  rooms: z.union([
    z.number().min(0, "Numărul de camere nu poate fi negativ"),
    z.string().transform(val => val === '' ? 0 : Number(val))
  ]).optional(),
  type: z.string().min(1, "Te rugăm să selectezi tipul proprietății"),
  videoUrl: z.string().url("URL-ul video nu este valid").or(z.literal("")).optional(),
  videoFocusPoint: z.string().optional(),
  thumbnailUrl: z.string().url("URL-ul imaginii nu este valid").or(z.literal("")).optional(),
  description: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  initialData?: Partial<PropertyFormValues>;
  onSubmit: (data: PropertyFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PropertyForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: PropertyFormProps) => {
  const [focusPoint, setFocusPoint] = useState({ x: 0.5, y: 0.5 });
  const [showFocusControls, setShowFocusControls] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      price: initialData?.price?.toString() || "",
      location: initialData?.location || "",
      area: initialData?.area?.toString() || "",
      rooms: initialData?.rooms?.toString() || "0",
      type: initialData?.type || "",
      videoUrl: initialData?.videoUrl || "",
      thumbnailUrl: initialData?.thumbnailUrl || "",
      description: initialData?.description || "",
      videoFocusPoint: initialData?.videoFocusPoint || JSON.stringify({ x: 0.5, y: 0.5 })
    },
  });

  const handleSubmit = (formValues: PropertyFormValues) => {
    try {
      // Format the data before submission
      const formData: any = {
        ...formValues,
        price: typeof formValues.price === 'string' ? Number(formValues.price) : formValues.price,
        area: typeof formValues.area === 'string' ? Number(formValues.area) : formValues.area,
        rooms: formValues.rooms ? (typeof formValues.rooms === 'string' ? Number(formValues.rooms) : formValues.rooms) : 0,
      };
      
      // Only include videoFocusPoint if there's a video URL
      if (formValues.videoUrl) {
        formData.videoFocusPoint = JSON.stringify(focusPoint);
      }
      
      // Remove empty strings from optional fields
      if (formValues.videoUrl === '') delete formData.videoUrl;
      if (formValues.thumbnailUrl === '') delete formData.thumbnailUrl;
      if (formValues.description === '') delete formData.description;
      
      // Ensure numbers are not NaN
      if (isNaN(formData.price)) formData.price = 0;
      if (isNaN(formData.area)) formData.area = 0;
      if (formData.rooms && isNaN(formData.rooms)) formData.rooms = 0;
      
      console.log('Submitting form data:', formData);
      onSubmit(formData as any);
    } catch (error) {
      console.error('Error formatting form data:', error);
      // Still submit the data even if there's an error with formatting
      // The server will handle the validation
      onSubmit(formValues);
    }
  };

  // Log form values when they change (for debugging)
  const formValues = form.watch();
  useEffect(() => {
    console.log('Form values:', formValues);
  }, [formValues]);

  // Initialize focus point from form data
  useEffect(() => {
    if (initialData?.videoFocusPoint) {
      try {
        const point = JSON.parse(initialData.videoFocusPoint);
        if (point.x !== undefined && point.y !== undefined) {
          setFocusPoint(point);
        }
      } catch (e) {
        console.error('Error parsing video focus point:', e);
      }
    }
  }, [initialData?.videoFocusPoint]);

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showFocusControls) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const newFocusPoint = {
      x: Math.min(Math.max(x, 0), 1),
      y: Math.min(Math.max(y, 0), 1)
    };
    
    setFocusPoint(newFocusPoint);
    form.setValue('videoFocusPoint', JSON.stringify(newFocusPoint));
  };

  const propertyTypes = [
    "Apartament cu 1 camera de vânzare",
    "Apartament cu 2 camere de vânzare",
    "Apartament cu 3 camere de vânzare",
    "Apartament cu 4+ camere de vânzare",
    "Casa de vânzare",
    "Vila de vânzare",
    "Teren de vânzare",
    "Spațiu comercial de vânzare",
    "Apartament de închiriat",
    "Casa de închiriat",
    "Spațiu comercial de închiriat",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Titlu Proprietate</FormLabel>
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

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preț (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Exemplu: 85000"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suprafață (mp)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Exemplu: 65"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Număr Camere (opțional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Exemplu: 2"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
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
                <FormLabel>Tip Proprietate</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează tipul proprietății" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
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

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Locație</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Exemplu: Apartament cu 2 camere de vânzare Pipera, București"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 md:col-span-2">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embed Video YouTube</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <Input
                        placeholder="Lipește aici link-ul YouTube (ex: https://www.youtube.com/watch?v=...)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          field.onChange(value);
                          setVideoError(null);
                          
                          // Reset focus point when URL changes
                          if (value) {
                            setFocusPoint({ x: 0.5, y: 0.5 });
                            form.setValue('videoFocusPoint', JSON.stringify({ x: 0.5, y: 0.5 }));
                          }
                        }}
                        onPaste={(e) => {
                          // Handle paste
                          const pastedText = e.clipboardData.getData('text/plain').trim();
                          if (pastedText) {
                            setVideoError(null);
                            // Small delay to let the input update
                            setTimeout(() => {
                              form.trigger('videoUrl');
                            }, 100);
                          }
                        }}
                      />
                      {field.value && !form.formState.errors.videoUrl && (
                        <div className="text-xs text-muted-foreground">
                          Acceptă link-uri YouTube (inclusiv Shorts)
                        </div>
                      )}
                      {videoError && (
                        <div className="text-xs text-red-500">
                          {videoError}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('videoUrl') && !form.formState.errors.videoUrl && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Previzualizare Video</h4>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowFocusControls(!showFocusControls)}
                  >
                    {showFocusControls ? 'Ascunde controale' : 'Ajustează punctul de focalizare'}
                  </Button>
                </div>
                <div 
                  className="relative rounded-md border overflow-hidden"
                  onClick={handleVideoClick}
                >
                  <div className="aspect-video w-full">
                    <YouTubePlayer 
                      url={form.watch('videoUrl')} 
                      width="100%"
                      height="100%"
                      autoplay={false}
                      controls={true}
                      focusPoint={focusPoint}
                      objectFit="cover"
                      onError={(error) => {
                        if (error) {
                          setVideoError('Nu s-a putut încărca videoclipul. Verifică link-ul.');
                        } else {
                          setVideoError(null);
                        }
                      }}
                    />
                  </div>
                  {showFocusControls && (
                    <div 
                      className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg"
                      style={{
                        left: `${focusPoint.x * 100}%`,
                        top: `${focusPoint.y * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </div>
                {showFocusControls && (
                  <div className="text-xs text-muted-foreground text-center">
                    Click pe video pentru a seta punctul de focalizare
                  </div>
                )}
              </div>
            )}
          </div>

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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descriere (opțional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descriere detaliată a proprietății..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 pt-6">
          <Button 
            type="submit" 
            disabled={isLoading}
            onClick={() => {
              // Trigger validation before submission
              form.trigger().then(isValid => {
                if (isValid) {
                  console.log('Form is valid, submitting...');
                } else {
                  console.log('Form has validation errors');
                }
              });
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Se salvează...
              </>
            ) : initialData ? (
              "Salvează modificările"
            ) : (
              "Adaugă proprietate"
            )}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyForm;
