import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import { useTermsAndConditions } from "@/hooks/admin/useTermsAndConditions";
import { TermsAndConditions } from "@/types/admin/termsAndConditions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditionsList() {
  const navigate = useNavigate();
  const { termsAndConditions, isLoading, updateTermsAndConditions, isUpdating } =
    useTermsAndConditions();
  const [selectedVersion, setSelectedVersion] = useState<TermsAndConditions | null>(null);

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

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVersion && selectedVersion.condition_id) {
      updateTermsAndConditions(selectedVersion.condition_id, {
        titre: selectedVersion.titre,
        contenu: selectedVersion.contenu,
        version: selectedVersion.version,
        active: selectedVersion.active,
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-2 space-y-6">
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
          <h1 className="text-2xl font-semibold tracking-tight">Terms & Conditions</h1>
          <p className="text-muted-foreground text-sm">Manage your terms and conditions versions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Policy Versions</CardTitle>
        </CardHeader>
        <CardContent>
          {!termsAndConditions || termsAndConditions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No terms and conditions found. Create a new version to get started.
            </p>
          ) : (
            <Tabs
              defaultValue={termsAndConditions[0]?.id?.toString()}
              onValueChange={(value) => {
                const version = termsAndConditions.find(
                  (tc) => tc.id?.toString() === value
                );
                setSelectedVersion(version || null);
              }}
            >
              <TabsList className="mb-4">
                {termsAndConditions.map((tc) => (
                  <TabsTrigger key={tc.id} value={tc.id?.toString() || ""}>
                    Version {tc.version}
                    {tc.active && (
                      <Badge variant="default" className="ml-2 bg-green-500">
                        Active
                      </Badge>
                    )}
                    {!tc.active && (
                      <Badge variant="secondary" className="ml-2 bg-red-500">
                        Inactive
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {termsAndConditions.map((tc) => (
                <TabsContent key={tc.id} value={tc.id?.toString() || ""}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (tc.condition_id) {
                        updateTermsAndConditions(tc.condition_id, {
                          titre: tc.titre,
                          contenu: tc.contenu,
                          version: tc.version,
                          active: tc.active,
                        });
                      }
                    }}
                    className="space-y-6"
                  >
                    <MultilingualInput
                      label="Title"
                      value={tc.titre}
                      onChange={(value) => {
                        const updated = termsAndConditions.map((item) =>
                          item.id === tc.id ? { ...item, titre: value } : item
                        );
                        setSelectedVersion(
                          updated.find((item) => item.id === tc.id) || null
                        );
                      }}
                      type="input"
                      required
                      placeholder={{
                        ar: "العنوان",
                        fr: "Titre",
                        en: "Title",
                      }}
                    />

                    <MultilingualInput
                      label="Content"
                      value={tc.contenu}
                      onChange={(value) => {
                        const updated = termsAndConditions.map((item) =>
                          item.id === tc.id ? { ...item, contenu: value } : item
                        );
                        setSelectedVersion(
                          updated.find((item) => item.id === tc.id) || null
                        );
                      }}
                      type="textarea"
                      required
                      placeholder={{
                        ar: "المحتوى",
                        fr: "Contenu",
                        en: "Content",
                      }}
                    />

                    <div className="space-y-2">
                      <Label htmlFor={`version-${tc.id}`}>Version</Label>
                      <Input
                        id={`version-${tc.id}`}
                        type="number"
                        value={tc.version}
                        onChange={(e) => {
                          const updated = termsAndConditions.map((item) =>
                            item.id === tc.id
                              ? { ...item, version: parseInt(e.target.value) || 1 }
                              : item
                          );
                          setSelectedVersion(
                            updated.find((item) => item.id === tc.id) || null
                          );
                        }}
                        required
                        min={1}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-${tc.id}`}
                        checked={tc.active}
                        onCheckedChange={(checked) => {
                          const updated = termsAndConditions.map((item) =>
                            item.id === tc.id ? { ...item, active: checked } : item
                          );
                          setSelectedVersion(
                            updated.find((item) => item.id === tc.id) || null
                          );
                        }}
                      />
                      <Label htmlFor={`active-${tc.id}`}>Active</Label>
                    </div>

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update"}
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
