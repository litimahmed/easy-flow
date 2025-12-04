import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePartners } from "@/hooks/admin/usePartners";
import { 
  Building2,
  Edit,
  Plus,
  Loader2,
  Trash2,
  Mail,
  Phone,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { format } from "date-fns";
import { getMultilingualValue, PartnerResponse } from "@/types/admin/partner";

export default function PartnerList() {
  const navigate = useNavigate();
  const { partners, isLoading: loading, deletePartner: deletePartnerMutation, isDeleting } = usePartners();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);

  const handleDeleteClick = (partnerId: number) => {
    setPartnerToDelete(partnerId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!partnerToDelete) return;

    try {
      await deletePartnerMutation(partnerToDelete);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  };

  const getPartnerName = (partner: PartnerResponse) => {
    return getMultilingualValue(partner.nom_partenaire) || 'Unnamed';
  };

  const getPartnerDescription = (partner: PartnerResponse) => {
    return getMultilingualValue(partner.description) || '';
  };

  const getPartnerCity = (partner: PartnerResponse) => {
    if (!partner.adresse || !partner.adresse[0]) return '';
    return getMultilingualValue(partner.adresse[0].ville);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!partners || partners.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6 px-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/dashboard")}
            className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Partners</h2>
            <p className="text-muted-foreground text-sm">No partners found</p>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No Partners</h3>
              <p className="text-muted-foreground max-w-md">
                Get started by adding your first partner
              </p>
            </div>
            <Button onClick={() => navigate("/admin/partners/create")} size="lg" className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 max-w-7xl mx-auto py-6 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/dashboard")}
              className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Partners</h2>
              <p className="text-muted-foreground text-sm">Manage all partner information</p>
            </div>
          </div>
          <Button onClick={() => navigate("/admin/partners/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Partner Directory
            </CardTitle>
            <CardDescription>All partner entries ({partners.length} total)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[280px] min-w-[200px]">Partner Name</TableHead>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead className="w-[200px]">Contact</TableHead>
                    <TableHead className="w-[160px]">Location / Period</TableHead>
                    <TableHead className="w-[80px]">Status</TableHead>
                    <TableHead className="w-[150px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-start gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="font-medium truncate">{getPartnerName(partner)}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2 max-w-[240px]">
                              {getPartnerDescription(partner)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {partner.type_partenaire && (
                          <Badge variant="outline" className="text-xs whitespace-nowrap">{partner.type_partenaire}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span className="truncate text-xs">{partner.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Phone className="h-3 w-3 shrink-0" />
                            <span className="text-xs">{partner.telephone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="space-y-1">
                          {getPartnerCity(partner) && (
                            <div className="font-medium text-sm">{getPartnerCity(partner)}</div>
                          )}
                          {partner.date_deb && partner.date_fin && (
                            <div className="text-muted-foreground text-xs">
                              {format(new Date(partner.date_deb), "MMM yyyy")} - {format(new Date(partner.date_fin), "MMM yyyy")}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={partner.actif ? "default" : "secondary"} className="text-xs">
                          {partner.actif ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/partners/edit/${partner.id}`)}
                            className="h-8 px-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(partner.id!)}
                            className="h-8 px-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the partner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
