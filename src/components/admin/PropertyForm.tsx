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

const propertyFormSchema = z.object({
  title: z.string().min(10, "Titlul trebuie să aibă cel puțin 10 caractere"),
  price: z.number().min(1, "Prețul trebuie să fie mai mare de 0"),
  location: z.string().min(5, "Locația trebuie să aibă cel puțin 5 caractere"),
  area: z.number().min(1, "Suprafața trebuie să fie mai mare de 0"),
  rooms: z.number().min(0, "Numărul de camere nu poate fi negativ").optional(),
  type: z.string().min(1, "Te rugăm să selectezi tipul proprietății"),
  videoUrl: z.string().optional().or(z.literal("")),
  thumbnailUrl: z
    .string()
    .url("Te rugăm să introduci un URL valid")
    .optional()
    .or(z.literal("")),
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
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      price: initialData?.price || 0,
      location: initialData?.location || "",
      area: initialData?.area || 0,
      rooms: initialData?.rooms || 0,
      type: initialData?.type || "",
      videoUrl: initialData?.videoUrl || "",
      thumbnailUrl: initialData?.thumbnailUrl || "",
      description: initialData?.description || "",
    },
  });

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suprafață (mp)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Exemplu: 65"
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
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Număr Camere (opțional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Exemplu: 2"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
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

                    <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Embed Video YouTube</FormLabel>
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
            className="bg-red-600 hover:bg-red-700"
            disabled={isLoading}
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
      </form>
    </Form>
  );
};

export default PropertyForm;
