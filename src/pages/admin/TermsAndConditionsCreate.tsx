import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import { useTermsAndConditions } from "@/hooks/admin/useTermsAndConditions";
import { TermsAndConditionsFormData } from "@/types/admin/termsAndConditions";
import { ArrowLeft, FileText, Save, X } from "lucide-react";

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
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/content/terms-and-conditions")}
                className="h-9 w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    Create Terms & Conditions
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Add a new version of your terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Section */}
          <Card className="border-border/60 shadow-sm">
            <CardContent className="pt-6">
              <MultilingualInput
                label="Title"
                value={formData.titre}
                onChange={(value) => setFormData({ ...formData, titre: value })}
                type="input"
                required
                placeholder={{
                  ar: "العنوان",
                  fr: "Titre des conditions",
                  en: "Terms title",
                }}
              />
            </CardContent>
          </Card>

          {/* Content Section */}
          <Card className="border-border/60 shadow-sm">
            <CardContent className="pt-6">
              <MultilingualInput
                label="Content"
                value={formData.contenu}
                onChange={(value) => setFormData({ ...formData, contenu: value })}
                type="textarea"
                required
                placeholder={{
                  ar: "محتوى الشروط والأحكام...",
                  fr: "Contenu des conditions générales...",
                  en: "Terms and conditions content...",
                }}
              />
            </CardContent>
          </Card>

          {/* Settings Section */}
          <Card className="border-border/60 shadow-sm">
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium text-foreground mb-4">
                Document Settings
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="version" className="text-sm font-medium">
                    Version Number
                  </Label>
                  <Input
                    id="version"
                    type="number"
                    value={formData.version}
                    onChange={(e) =>
                      setFormData({ ...formData, version: parseInt(e.target.value) || 1 })
                    }
                    required
                    min={1}
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Increment for each new revision
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3 h-10">
                    <span className="text-sm text-muted-foreground">
                      {formData.active ? "Active" : "Draft"}
                    </span>
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, active: checked })
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active documents are visible to users
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/content/terms-and-conditions")}
              className="h-10 px-5"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating}
              className="h-10 px-5"
            >
              <Save className="h-4 w-4 mr-2" />
              {isCreating ? "Creating..." : "Create Document"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
