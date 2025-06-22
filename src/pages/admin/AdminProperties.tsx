import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Eye, Loader2, Search } from "lucide-react";
import PropertyForm from "@/components/admin/PropertyForm";
import { propertyService } from "@/services/api";
import type { Property, ApiResponse, PaginatedData } from "@/types/api";
import type { PropertyType, PropertyCategory, PropertyStatus, PropertyFormData as ModelPropertyFormData } from "@/types/models";

// Use the PropertyFormData from models but make all fields optional for updates
type PropertyFormData = Partial<ModelPropertyFormData>;

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      const response = await propertyService.getAll(1, 100); // Fetch first 100 properties
      
      // The response is of type ApiResponse<PaginatedData<Property>>
      if (response && response.data) {
        // Check if the data is in the expected format
        const propertiesData = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || [];
        
        setProperties(propertiesData);
        setError(null);
      } else {
        throw new Error("Format de răspuns neașteptat de la server");
      }
    } catch (err: any) {
      console.error("Failed to fetch properties:", err);
      setError("Nu am putut încărca proprietățile. Vă rugăm să încercați din nou.");
      toast({ 
        variant: "destructive", 
        title: "Eroare", 
        description: err.response?.data?.message || "Nu am putut încărca proprietățile." 
      });
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

  const handleFormSubmit = async (formData: any) => {
    setFormSubmitting(true);
    try {
      if (editingProperty) {
        // For updates, we need to ensure required fields are present
        const updateData: any = {};
        
        // Only include fields that have changed
        Object.keys(formData).forEach(key => {
          if (JSON.stringify(formData[key]) !== JSON.stringify(editingProperty[key as keyof Property])) {
            updateData[key] = formData[key];
          }
        });
        
        // Ensure required fields are always included in the update
        const requiredFields = ['title', 'price', 'type', 'category', 'status'];
        requiredFields.forEach(field => {
          if (formData[field] !== undefined) {
            updateData[field] = formData[field];
          } else if (editingProperty[field as keyof Property] !== undefined) {
            updateData[field] = editingProperty[field as keyof Property];
          }
        });
        
        // Handle empty arrays properly
        if (formData.amenities && formData.amenities.length === 0) {
          updateData.amenities = [];
        }
        
        // Ensure we're not sending undefined values, but keep empty strings for agentId to clear it
        Object.keys(updateData).forEach(key => {
          if (key === 'agentId') {
            // Keep null values for agentId to allow clearing the agent
            if (updateData[key] === '') {
              updateData[key] = null;
            }
          } else if (updateData[key] === undefined || updateData[key] === '') {
            delete updateData[key];
          }
        });
        
        console.log('Updating property with data:', updateData);
        
        // Ensure agentId is included in the update if it's in the form data
        if (formData.agentId !== undefined) {
          updateData.agentId = formData.agentId;
        }
        
        const response = await propertyService.update(editingProperty.id, updateData);
        console.log('Update response:', response);
        
        toast({ 
          title: "Succes", 
          description: "Detaliile proprietății au fost actualizate cu succes!" 
        });
      } else {
        // For new properties, prepare the data with all required fields
        const createData: any = {
          // Required fields with defaults
          id: crypto.randomUUID(), // Generate a UUID for the new property
          title: formData.title,
          price: formData.price,
          area: formData.area,
          type: formData.type,
          category: formData.category || 'vanzare',
          status: formData.status || 'disponibil',
          
          // Location fields - make sure at least one is provided
          location: formData.address || formData.city || 'Nespecificat',
          address: formData.address || null,
          city: formData.city || null,
          county: formData.county || null,
          
          // Description with default
          description: formData.description || '',
          
          // Conditional fields based on property type
          ...(formData.type !== 'Teren' ? {
            rooms: formData.rooms || 0,
            floor: formData.floor || 0,
            yearBuilt: formData.yearBuilt || new Date().getFullYear()
          } : {
            rooms: 0,
            floor: 0,
            yearBuilt: new Date().getFullYear()
          }),
          
          // Media fields with defaults
          videoUrl: formData.videoUrl || null,
          thumbnailUrl: formData.thumbnailUrl || null,
          
          // Feature flags with defaults
          featured: formData.featured || false,
          currency: formData.currency || 'EUR',
          
          // Arrays with defaults
          amenities: JSON.stringify(Array.isArray(formData.amenities) ? formData.amenities : []),
          badges: JSON.stringify(Array.isArray(formData.badges) ? formData.badges : []),
          
          // System fields with defaults
          viewsCount: 0,
          contactCount: 0,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        
        // Handle undefined and empty values
        Object.keys(createData).forEach(key => {
          if (key === 'agentId') {
            // Keep null values for agentId to allow clearing the agent
            if (createData[key] === '') {
              createData[key] = null;
            }
          } else if (createData[key] === undefined || createData[key] === '') {
            delete createData[key];
          }
        });
        
        // Only include agentId if it's provided and not empty
        if (formData.agentId && formData.agentId.trim() !== '') {
          createData.agentId = formData.agentId;
        }
        
        console.log('Creating property with data:', createData);
        
        const response = await propertyService.create(createData);
        console.log('Create response:', response);
        
        toast({ 
          title: "Succes", 
          description: "O nouă proprietate a fost adăugată cu succes!" 
        });
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

  // Filter properties based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProperties(properties);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = properties.filter(property => 
      property.title.toLowerCase().includes(searchLower) ||
      (property.type && property.type.toLowerCase().includes(searchLower)) ||
      (property.category && property.category.toLowerCase().includes(searchLower))
    );
    
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  // Initialize filtered properties when properties are loaded
  useEffect(() => {
    if (properties.length > 0 && filteredProperties.length === 0) {
      setFilteredProperties(properties);
    }
  }, [properties, filteredProperties]);

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
          {filteredProperties.map((property) => (
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
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <CardTitle>Management Proprietăți</CardTitle>
            <CardDescription>Adaugă, editează sau șterge proprietățile listate.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută după titlu sau categorie..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreate} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Adaugă Proprietate
            </Button>
          </div>
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
