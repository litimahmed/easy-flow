import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTermsAndConditions } from "@/hooks/admin/useTermsAndConditions";
import { 
  Plus, 
  Loader2, 
  FileText,
  Calendar,
  Check,
  Power,
  Pencil,
  ArrowLeft
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TermsAndConditionsList() {
  const navigate = useNavigate();
  const { termsAndConditions, isLoading } = useTermsAndConditions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Helper to extract title from multilingual object or array
  const getTitle = (titre: any): string => {
    if (!titre) return "Untitled";
    if (typeof titre === "string") return titre;
    // Handle array format: [{lang: "en", value: "..."}, ...]
    if (Array.isArray(titre)) {
      const enTitle = titre.find((t: any) => t.lang === "en")?.value;
      const frTitle = titre.find((t: any) => t.lang === "fr")?.value;
      return enTitle || frTitle || titre[0]?.value || "Untitled";
    }
    // Handle object format: {ar: "...", fr: "...", en: "..."}
    if (typeof titre === "object") {
      return titre.en || titre.fr || titre.ar || "Untitled";
    }
    return "Untitled";
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-2">
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
            <h2 className="text-3xl font-bold tracking-tight">Terms & Conditions</h2>
            <p className="text-muted-foreground">Manage your terms and conditions versions</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/terms-and-conditions/create")} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Version
        </Button>
      </div>

      {!termsAndConditions || termsAndConditions.length === 0 ? (
        <Card className="shadow-elegant">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No Versions Found</h3>
              <p className="text-muted-foreground max-w-md">
                Get started by creating your first Terms & Conditions version
              </p>
            </div>
            <Button onClick={() => navigate("/admin/terms-and-conditions/create")} size="lg" className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Create First Version
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              All Versions
            </CardTitle>
            <CardDescription>
              {termsAndConditions.length} version{termsAndConditions.length !== 1 ? 's' : ''} available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {termsAndConditions.map((tc, index) => {
                  const isActive = tc.active === true || (tc.active as any) === "true" || (tc.active as any) === "1";
                  const tcId = tc.condition_id || tc.id?.toString();
                  
                  return (
                    <TableRow key={tcId || index} className={isActive ? "bg-primary/5" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">v{tc.version}</span>
                          {isActive && (
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white gap-1">
                              <Check className="h-3 w-3" />
                              Active
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{getTitle(tc.titre)}</span>
                      </TableCell>
                      <TableCell>
                        {isActive ? (
                          <Badge className="bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {tc.date_creation 
                            ? new Date(tc.date_creation).toLocaleDateString() 
                            : "—"
                          }
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {tcId && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/admin/terms-and-conditions/edit/${tcId}`)}
                              className="gap-1.5"
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isActive}
                            className={isActive 
                              ? "gap-1.5 text-muted-foreground border-muted cursor-not-allowed opacity-50" 
                              : "gap-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                            }
                          >
                            <Power className="h-4 w-4" />
                            {isActive ? "Active" : "Make Active"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
