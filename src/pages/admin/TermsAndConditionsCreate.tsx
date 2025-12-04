import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import { useTermsAndConditions } from "@/hooks/admin/useTermsAndConditions";
import { TermsAndConditionsFormData } from "@/types/admin/termsAndConditions";

export default function TermsAndConditionsCreate() {
  const navigate = useNavigate();
  const { createTermsAndConditions, isCreating } = useTermsAndConditions();

  const [formData, setFormData] = useState<TermsAndConditionsFormData>({
    titre: { ar: "", fr: "", en: "" },
    contenu: { ar: "", fr: "", en: "" },
    version: 1,
    active: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTermsAndConditions(formData, {
      onSuccess: () => {
        navigate("/content/terms-and-conditions");
      },
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <MultilingualInput
              label="Title"
              value={formData.titre}
              onChange={(value) => setFormData({ ...formData, titre: value })}
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
              value={formData.contenu}
              onChange={(value) => setFormData({ ...formData, contenu: value })}
              type="textarea"
              required
              placeholder={{
                ar: "المحتوى",
                fr: "Contenu",
                en: "Content",
              }}
            />

            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                type="number"
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: parseInt(e.target.value) || 1 })
                }
                required
                min={1}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, active: checked })
                }
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/content/terms-and-conditions")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
