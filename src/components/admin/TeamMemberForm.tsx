import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/form";

const teamMemberFormSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  role: z.string().min(1, "Te rugăm să selectezi rolul"),
  phone: z
    .string()
    .min(10, "Numărul de telefon trebuie să aibă cel puțin 10 caractere"),
  email: z.string().email("Te rugăm să introduci o adresă de email validă"),
  image: z.string().url("Te rugăm să introduci un URL valid pentru imagine"),
});

type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;

interface TeamMemberFormProps {
  initialData?: Partial<TeamMemberFormValues>;
  onSubmit: (data: TeamMemberFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TeamMemberForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: TeamMemberFormProps) => {
  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      image: initialData?.image || "",
    },
  });

  const roles = [
    "Manager",
    "Agent imobiliar",
    "Agent imobiliar senior",
    "Consultant imobiliar",
    "Director vânzări",
    "Coordinator marketing",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nume Complet</FormLabel>
                <FormControl>
                  <Input placeholder="Exemplu: Alexandru Popescu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează rolul" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="Exemplu: +40750840620" {...field} />
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
                    placeholder="Exemplu: alexandru@trambitas.ro"
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
            name="image"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>URL Imagine Profil</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/profile-image.jpg"
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
                : "Adaugă Membrul"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamMemberForm;
