import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import PropertyForm from "@/components/admin/PropertyForm";
import { propertyService } from "@/services/api";
import type { Property, CreatePropertyData } from "@/types/api";

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyService.getAll();
      setProperties(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setError("Nu am putut încărca proprietățile. Vă rugăm să încercați din nou.");
      toast({ variant: "destructive", title: "Eroare", description: "Nu am putut încărca proprietățile." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreate = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleDelete = (property: Property) => {
    setDeletingProperty(property);
  };

  const confirmDelete = async () => {
    if (!deletingProperty) return;
    try {
      await propertyService.delete(deletingProperty.id);
      toast({ title: "Succes", description: `Proprietatea "${deletingProperty.title}" a fost ștearsă.` });
      fetchProperties(); // Refresh list
    } catch (err) {
      console.error("Failed to delete property:", err);
      toast({ variant: "destructive", title: "Eroare", description: "Nu s-a putut șterge proprietatea." });
    } finally {
      setDeletingProperty(null);
    }
  };

  const handleFormSubmit = async (data: CreatePropertyData) => {
    setFormSubmitting(true);
    try {
      if (editingProperty) {
        await propertyService.update(editingProperty.id, data);
        toast({ title: "Succes", description: "Detaliile proprietății au fost actualizate." });
      } else {
        await propertyService.create(data);
        toast({ title: "Succes", description: "O nouă proprietate a fost adăugată." });
      }
      setIsFormOpen(false);
      fetchProperties(); // Refresh list
    } catch (err) {
      console.error("Failed to submit form:", err);
      toast({ variant: "destructive", title: "Eroare", description: "A apărut o problemă. Vă rugăm încercați din nou." });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleViewProperty = (property: Property) => {
    navigate(`/proprietate/${property.id}`);
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

    if (properties.length === 0) {
      return (
        <div className="text-center text-slate-600 h-64 flex flex-col items-center justify-center">
          <p className="font-medium">Nu există proprietăți listate.</p>
          <p className="text-sm">Click pe "Adaugă Proprietate" pentru a începe.</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Titlu</TableHead>
            <TableHead>Tip</TableHead>
            <TableHead>Preț</TableHead>
            <TableHead>Detalii</TableHead>
            <TableHead>Locație</TableHead>
            <TableHead className="text-right">Acțiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                <div className="truncate w-[280px]" title={property.title}>
                  {property.title}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {property.type.replace("de vânzare", "").replace("de închiriat", "").trim()}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">€{property.price.toLocaleString()}</TableCell>
              <TableCell>
                {property.area} mp
                {property.rooms && ` • ${property.rooms} cam`}
              </TableCell>
              <TableCell className="max-w-xs">
                <div className="truncate text-sm text-gray-600" title={property.location}>
                  {property.location}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleViewProperty(property)} className="text-blue-600 hover:text-blue-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(property)} className="text-green-600 hover:text-green-700">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(property)} className="text-red-600 hover:text-red-700">
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
            <CardTitle>Management Proprietăți</CardTitle>
            <CardDescription>Adaugă, editează sau șterge proprietățile listate.</CardDescription>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> Adaugă Proprietate
          </Button>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>

      {/* Property Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProperty ? "Editează Proprietatea" : "Adaugă Proprietate Nouă"}</DialogTitle>
            <DialogDescription>
              {editingProperty ? "Modifică detaliile proprietății selectate" : "Completează formularul pentru a adăuga o nouă proprietate"}
            </DialogDescription>
          </DialogHeader>
          <PropertyForm
            initialData={editingProperty || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isLoading={formSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingProperty} onOpenChange={() => setDeletingProperty(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmare Ștergere</AlertDialogTitle>
            <AlertDialogDescription>
              Ești sigur că vrei să ștergi proprietatea "{deletingProperty?.title}"? Această acțiune nu poate fi anulată.
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

export default AdminProperties;
