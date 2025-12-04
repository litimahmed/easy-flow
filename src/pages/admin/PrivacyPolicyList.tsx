import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import { usePrivacyPolicy } from "@/hooks/admin/usePrivacyPolicy";
import { PrivacyPolicy } from "@/types/admin/privacyPolicy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyList() {
  const navigate = useNavigate();
  const { privacyPolicies, isLoading, updatePrivacyPolicy, isUpdating } =
    usePrivacyPolicy();
  const [editablePolicies, setEditablePolicies] = useState<PrivacyPolicy[]>([]);

  useEffect(() => {
    if (privacyPolicies) {
      setEditablePolicies(privacyPolicies);
    }
  }, [privacyPolicies]);

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

  const handleUpdate = (policy: PrivacyPolicy) => {
    if (policy.id) {
      updatePrivacyPolicy({
        id: policy.id,
        data: {
          titre: policy.titre,
          contenu: policy.contenu,
          version: policy.version,
          active: policy.active,
        },
      });
    }
  };

  const updatePolicy = (id: number | undefined, updates: Partial<PrivacyPolicy>) => {
    setEditablePolicies((prev) =>
      prev.map((policy) => (policy.id === id ? { ...policy, ...updates } : policy))
    );
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
          <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Manage your privacy policy versions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Policy Versions</CardTitle>
        </CardHeader>
        <CardContent>
          {!editablePolicies || editablePolicies.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No privacy policies found. Create a new version to get started.
            </p>
          ) : (
            <Tabs defaultValue={editablePolicies[0]?.id?.toString()}>
              <TabsList className="mb-4">
                {editablePolicies.map((policy) => (
                  <TabsTrigger key={policy.id} value={policy.id?.toString() || ""}>
                    Version {policy.version}
                    {policy.active && (
                      <Badge variant="default" className="ml-2 bg-green-500">
                        Active
                      </Badge>
                    )}
                    {!policy.active && (
                      <Badge variant="secondary" className="ml-2 bg-red-500">
                        Inactive
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {editablePolicies.map((policy) => (
                <TabsContent key={policy.id} value={policy.id?.toString() || ""}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(policy);
                    }}
                    className="space-y-6"
                  >
                    <MultilingualInput
                      label="Title"
                      value={policy.titre}
                      onChange={(value) => updatePolicy(policy.id, { titre: value })}
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
                      value={policy.contenu}
                      onChange={(value) => updatePolicy(policy.id, { contenu: value })}
                      type="textarea"
                      required
                      placeholder={{
                        ar: "المحتوى",
                        fr: "Contenu",
                        en: "Content",
                      }}
                    />

                    <div className="space-y-2">
                      <Label htmlFor={`version-${policy.id}`}>Version</Label>
                      <Input
                        id={`version-${policy.id}`}
                        type="number"
                        value={policy.version}
                        onChange={(e) =>
                          updatePolicy(policy.id, {
                            version: parseInt(e.target.value) || 1,
                          })
                        }
                        required
                        min={1}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-${policy.id}`}
                        checked={policy.active}
                        onCheckedChange={(checked) =>
                          updatePolicy(policy.id, { active: checked })
                        }
                      />
                      <Label htmlFor={`active-${policy.id}`}>Active</Label>
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
