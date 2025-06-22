import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Settings, Image, Type, Palette, MapPin } from "lucide-react";
import { toast } from "sonner";

const settingsFormSchema = z.object({
  // Company Info
  companyName: z
    .string()
    .min(2, "Numele companiei trebuie să aibă cel puțin 2 caractere"),
  tagline: z
    .string()
    .min(5, "Tagline-ul trebuie să aibă cel puțin 5 caractere"),
  logoText: z.string().max(4, "Logo text max 4 caractere"),
  logoImage: z.string().url("URL logo invalid").optional().or(z.literal("")),

  // Contact Info
  phone: z
    .string()
    .min(10, "Numărul de telefon trebuie să aibă cel puțin 10 caractere"),
  email: z.string().email("Email invalid"),
  whatsapp: z
    .string()
    .min(10, "Numărul WhatsApp trebuie să aibă cel puțin 10 caractere"),

  // Address
  street: z.string().min(5, "Strada trebuie să aibă cel puțin 5 caractere"),
  city: z.string().min(2, "Orașul trebuie să aibă cel puțin 2 caractere"),
  county: z.string().min(2, "Județul trebuie să aibă cel puțin 2 caractere"),
  postalCode: z
    .string()
    .min(4, "Codul poștal trebuie să aibă cel puțin 4 caractere"),
  coordinates: z.string().min(10, "Coordonatele trebuie să fie valide"),

  // Banner Settings
  bannerEnabled: z.boolean(),
  bannerTitle: z
    .string()
    .min(5, "Titlul banner-ului trebuie să aibă cel puțin 5 caractere"),
  bannerSubtitle: z
    .string()
    .min(10, "Subtitlul trebuie să aibă cel puțin 10 caractere"),
  bannerButtonText: z
    .string()
    .min(3, "Textul butonului trebuie să aibă cel puțin 3 caractere"),
  bannerButtonLink: z.string().min(1, "Link-ul butonului este necesar"),
  bannerBackgroundImage: z
    .string()
    .url("URL imagine invalid")
    .optional()
    .or(z.literal("")),
  bannerBackgroundColor: z.string().min(4, "Culoarea de fundal este necesară"),

  // Design Settings
  primaryColor: z.string().min(4, "Culoarea primară este necesară"),
  primaryDarkColor: z.string().min(4, "Culoarea primară închisă este necesară"),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      // Load current config values
      companyName: "Casa Vis",
      tagline: "Experți în tranzacții imobiliare",
      logoText: "CV",
      logoImage: "",
      phone: "+40 768 111 564",
      email: "office@casavis.ro",
      whatsapp: "+40 768 111 564",
      street: "Str. Bulevardul Republicii 17",
      city: "Onești",
      county: "Bacău",
      postalCode: "601018",
      coordinates: "46.248576915439685, 26.766675025241923",
      bannerEnabled: true,
      bannerTitle: "Găsește-ți casa visurilor tale!",
      bannerSubtitle: "Consultanță gratuită pentru toate proprietățile noastre",
      bannerButtonText: "Contactează-ne acum",
      bannerButtonLink: "/contact",
      bannerBackgroundImage: "",
      bannerBackgroundColor: "#dc2626",
      primaryColor: "#dc2626",
      primaryDarkColor: "#b91c1c",
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true);

    try {
      // Simulate API call to update settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would update the config file or database
      console.log("Settings updated:", data);

      toast.success("Setările au fost actualizate cu succes!");
    } catch (error) {
      toast.error("Eroare la actualizarea setărilor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Setări Site</h1>
          <p className="text-gray-600 mt-2">
            Gestionează toate setările site-ului din această pagină
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Settings className="h-5 w-5" />
          <span className="text-sm">Configurare Globală</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Informații Companie
              </CardTitle>
              <CardDescription>
                Setările generale ale companiei care apar pe tot site-ul
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numele Companiei</FormLabel>
                      <FormControl>
                        <Input placeholder="Casa Vis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline/Slogan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Experți în tranzacții imobiliare"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logoText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo Text (max 4 caractere)</FormLabel>
                      <FormControl>
                        <Input placeholder="CV" maxLength={4} {...field} />
                      </FormControl>
                      <FormDescription>
                        Se afișează dacă nu ai logo imagine
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logoImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo Imagine</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Input
                            placeholder="https://example.com/logo.png sau încarcă mai jos"
                            {...field}
                          />
                          <div className="flex items-center gap-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // În aplicația reală, aici ai uploada fișierul
                                  const url = URL.createObjectURL(file);
                                  field.onChange(url);
                                }
                              }}
                              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                            />
                            {field.value && (
                              <img
                                src={field.value}
                                alt="Logo preview"
                                className="w-12 h-12 rounded-lg object-cover border"
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Înlocuiește logo text dacă este setat. Dimensiune
                        recomandată: 40x40px
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informații de Contact</CardTitle>
              <CardDescription>
                Detaliile de contact care apar în footer și pe site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="+40 768 111 564" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="office@casavis.ro"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="+40 768 111 564" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Adresă și Locație
              </CardTitle>
              <CardDescription>
                Adresa companiei și coordonatele pentru Google Maps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strada</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Str. Bulevardul Republicii 17"
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
                      <FormLabel>Orașul</FormLabel>
                      <FormControl>
                        <Input placeholder="Onești" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Județul</FormLabel>
                      <FormControl>
                        <Input placeholder="Bacău" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cod Poștal</FormLabel>
                      <FormControl>
                        <Input placeholder="601018" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordonate Google Maps</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="46.248576915439685, 26.766675025241923"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Latitudine, Longitudine pentru butonul "Vezi pe Google
                      Maps"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Banner Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Setări Banner Homepage
              </CardTitle>
              <CardDescription>
                Banner-ul care apare deasupra footer-ului pe pagina principală
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bannerEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Activează Banner
                      </FormLabel>
                      <FormDescription>
                        Afișează banner-ul pe pagina principală
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bannerTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titlu Banner</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Găsește-ți casa visurilor tale!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bannerButtonText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text Buton</FormLabel>
                      <FormControl>
                        <Input placeholder="Contactează-ne acum" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bannerSubtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitlu Banner</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Consultanță gratuită pentru toate proprietățile noastre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bannerButtonLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Buton</FormLabel>
                      <FormControl>
                        <Input placeholder="/contact" {...field} />
                      </FormControl>
                      <FormDescription>
                        Poate fi o pagină (/contact) sau URL extern
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bannerBackgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Culoare Fundal</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input placeholder="#dc2626" {...field} />
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 h-10 rounded border"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bannerBackgroundImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagine Fundal Banner</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Input
                          placeholder="https://example.com/banner.jpg sau încarcă mai jos"
                          {...field}
                        />
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // În aplicația reală, aici ai uploada fișierul
                                const url = URL.createObjectURL(file);
                                field.onChange(url);
                              }
                            }}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                          />
                          {field.value && (
                            <img
                              src={field.value}
                              alt="Banner preview"
                              className="w-24 h-16 rounded-lg object-cover border"
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Imagine pentru secțiunea banner de pe homepage. Dimensiune
                      recomandată: 1200x400px
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Design Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Setări Design
              </CardTitle>
              <CardDescription>
                Culorile principale ale site-ului
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Culoare Primară</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input placeholder="#dc2626" {...field} />
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 h-10 rounded border"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Culoarea butoanelor, link-urilor, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primaryDarkColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Culoare Primară Închisă</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input placeholder="#b91c1c" {...field} />
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-12 h-10 rounded border"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Pentru hover effects și accenturi
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 px-8"
            >
              {isLoading ? "Se salvează..." : "Salvează Setările"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminSettings;
