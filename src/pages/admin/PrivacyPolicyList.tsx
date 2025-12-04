import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePrivacyPolicy } from "@/hooks/admin/usePrivacyPolicy";
import { ArrowLeft, Plus, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PrivacyPolicyList() {
  const navigate = useNavigate();
  const { privacyPolicies, isLoading } = usePrivacyPolicy();

  // Helper to get title from different formats
  const getTitle = (titleData: any): string => {
    if (!titleData) return "Untitled";
    // Handle array format: [{ lang: "en", value: "..." }]
    if (Array.isArray(titleData)) {
      const titleObj = titleData.find((t: any) => t.lang === "en") || 
                       titleData.find((t: any) => t.lang === "fr") || 
                       titleData[0];
      return titleObj?.value || "Untitled";
    }
    // Handle object format: { en: "...", fr: "...", ar: "..." }
    if (typeof titleData === "object") {
      return titleData.en || titleData.fr || titleData.ar || "Untitled";
    }
    return "Untitled";
  };

  // Helper to format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-2 space-y-6">
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
            <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">Manage your privacy policy versions</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/privacy-policy/create")} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Policy Versions</CardTitle>
        </CardHeader>
        <CardContent>
          {!privacyPolicies || privacyPolicies.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No privacy policies found. Create a new version to get started.
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-[100px]">Version</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[150px]">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {privacyPolicies.map((policy: any, index: number) => (
                    <TableRow key={policy.politique_id || policy.id || index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{getTitle(policy.titre)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">v{policy.version || 1}</Badge>
                      </TableCell>
                      <TableCell>
                        {policy.active ? (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            <X className="h-3 w-3 mr-1" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(policy.date_creation)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
