import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Mail, Phone, Loader2 } from "lucide-react";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import { teamService } from "@/services/api";
import type { TeamMember } from "@/types/api";

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamService.getAll();
      setTeamMembers(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch team members:", err);
      setError("Nu am putut încărca datele. Vă rugăm să încercați din nou.");
      toast({ variant: "destructive", title: "Eroare", description: "Nu am putut încărca membrii echipei." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleCreate = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = (member: TeamMember) => {
    setDeletingMember(member);
  };

  const confirmDelete = async () => {
    if (!deletingMember) return;
    try {
      await teamService.delete(deletingMember.id);
      toast({ title: "Succes", description: `Membrul ${deletingMember.name} a fost șters.` });
      fetchTeamMembers(); // Refresh list
    } catch (err) {
      console.error("Failed to delete team member:", err);
      toast({ variant: "destructive", title: "Eroare", description: "Nu s-a putut șterge membrul." });
    } finally {
      setDeletingMember(null);
    }
  };

  const handleFormSubmit = async (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    setFormSubmitting(true);
    try {
      if (editingMember) {
        await teamService.update(editingMember.id, data);
        toast({ title: "Succes", description: "Detaliile membrului au fost actualizate." });
      } else {
        await teamService.create(data);
        toast({ title: "Succes", description: "Un nou membru a fost adăugat în echipă." });
      }
      setIsFormOpen(false);
      fetchTeamMembers(); // Refresh list
    } catch (err) {
      console.error("Failed to submit form:", err);
      toast({ variant: "destructive", title: "Eroare", description: "A apărut o problemă. Vă rugăm încercați din nou." });
    } finally {
      setFormSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "agent imobiliar":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-600 h-64 flex items-center justify-center">
          <p>{error}</p>
        </div>
      );
    }

    if (teamMembers.length === 0) {
      return (
        <div className="text-center text-slate-600 h-64 flex flex-col items-center justify-center">
          <p className="font-medium">Nu există membri în echipă.</p>
          <p className="text-sm">Click pe "Adaugă Membru" pentru a începe.</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nume</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Acțiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getRoleColor(member.role)}>
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3 h-3" />
                    {member.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                      {member.email}
                    </a>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(member)} className="text-green-600 hover:text-green-700">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(member)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Management Echipă</CardTitle>
            <CardDescription>Adaugă, editează sau șterge membrii echipei.</CardDescription>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> Adaugă Membru
          </Button>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>

      {/* Team Member Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Editează Membrul Echipei" : "Adaugă Membru Nou"}</DialogTitle>
            <DialogDescription>
              {editingMember ? "Modifică detaliile membrului selectat" : "Completează formularul pentru a adăuga un nou membru în echipă"}
            </DialogDescription>
          </DialogHeader>
          <TeamMemberForm
            initialData={editingMember || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isLoading={formSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingMember} onOpenChange={() => setDeletingMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmare Ștergere</AlertDialogTitle>
            <AlertDialogDescription>
              Ești sigur că vrei să ștergi membrul "{deletingMember?.name}" din echipă? Această acțiune nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminTeam;
