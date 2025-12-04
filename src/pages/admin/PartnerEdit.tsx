import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePartners } from "@/hooks/admin/usePartners";
import type { PartnerPayload, MultilingualField } from "@/types/admin/partner";
import { TYPE_PARTENAIRE_OPTIONS } from "@/types/admin/partner";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import { 
  Building2,
  Phone, 
  Mail, 
  Globe, 
  Facebook,
  Instagram,
  Calendar,
  Save,
  Loader2,
  ArrowLeft,
  CalendarDays
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const emptyMultilingual: MultilingualField = { ar: "", fr: "", en: "" };

export default function PartnerEdit() {
  const navigate = useNavigate();
  const { id: partnerId } = useParams();
  const { toast } = useToast();
  const { getPartner, updatePartner: updatePartnerMutation, isUpdating } = usePartners();
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<PartnerPayload>({
    nom_partenaire: { ...emptyMultilingual },
    description: { ...emptyMultilingual },
    adresse: { ...emptyMultilingual },
    email: "",
    telephone: "",
    site_web: "",
    actif: true,
    facebook: "",
    instagram: "",
    tiktok: "",
    type_partenaire: "",
    date_deb: "",
    date_fin: "",
    liens_externes: { ...emptyMultilingual },
    date_creation_entreprise: "",
    priorite_affichage: 0,
  });

  useEffect(() => {
    if (partnerId) {
      fetchPartnerData();
    }
  }, [partnerId]);

  const fetchPartnerData = async () => {
    if (!partnerId) return;
    
    try {
      setFetching(true);
      const data = await getPartner(parseInt(partnerId));
      
      // Convert ISO datetime to datetime-local format and ensure multilingual fields
      const formattedData: PartnerPayload = {
        ...data,
        nom_partenaire: typeof data.nom_partenaire === 'object' 
          ? data.nom_partenaire 
          : { ar: "", fr: "", en: String(data.nom_partenaire || "") },
        description: typeof data.description === 'object' 
          ? data.description 
          : { ar: "", fr: "", en: String(data.description || "") },
        adresse: typeof data.adresse === 'object' 
          ? data.adresse 
          : { ar: "", fr: "", en: String(data.adresse || "") },
        liens_externes: typeof data.liens_externes === 'object' && data.liens_externes
          ? data.liens_externes as MultilingualField
          : { ...emptyMultilingual },
        date_deb: data.date_deb ? data.date_deb.slice(0, 16) : "",
        date_fin: data.date_fin ? data.date_fin.slice(0, 16) : "",
        date_creation_entreprise: data.date_creation_entreprise ? data.date_creation_entreprise.slice(0, 10) : "",
      };
      
      setFormData(formattedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load partner information",
        variant: "destructive",
      });
      navigate("/admin/partners");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId) return;

    try {
      await updatePartnerMutation(parseInt(partnerId), formData);
      navigate("/admin/partners");
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleChange = (field: keyof PartnerPayload, value: string | boolean | number | MultilingualField) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === "" ? null : value
    }));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/partners")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Partner</h2>
          <p className="text-muted-foreground">Update partner information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Multilingual Fields */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Partner Information
            </CardTitle>
            <CardDescription>Partner name and description in multiple languages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <MultilingualInput
              label="Partner Name"
              value={formData.nom_partenaire}
              onChange={(value) => handleChange("nom_partenaire", value)}
              required
              maxLength={255}
            />

            <MultilingualInput
              label="Description"
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              type="textarea"
              required
            />

            <MultilingualInput
              label="Address"
              value={formData.adresse}
              onChange={(value) => handleChange("adresse", value)}
              required
            />

            <MultilingualInput
              label="External Links"
              value={formData.liens_externes || emptyMultilingual}
              onChange={(value) => handleChange("liens_externes", value)}
            />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>How to reach this partner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="partner@example.com"
                  maxLength={254}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone *
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  placeholder="+213 XXX XXX XXX"
                  maxLength={128}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_web" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website *
                </Label>
                <Input
                  id="site_web"
                  type="url"
                  required
                  value={formData.site_web}
                  onChange={(e) => handleChange("site_web", e.target.value)}
                  placeholder="https://example.com"
                  maxLength={200}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Details */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Business Details
              </CardTitle>
              <CardDescription>Partner type and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type_partenaire">Partner Type</Label>
                <Select
                  value={formData.type_partenaire}
                  onValueChange={(value) => handleChange("type_partenaire", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_PARTENAIRE_OPTIONS.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_creation_entreprise" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Company Creation Date *
                </Label>
                <Input
                  id="date_creation_entreprise"
                  type="date"
                  required
                  value={formData.date_creation_entreprise}
                  onChange={(e) => handleChange("date_creation_entreprise", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="actif" className="cursor-pointer">Active Partner</Label>
                <Switch
                  id="actif"
                  checked={formData.actif}
                  onCheckedChange={(checked) => handleChange("actif", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priorite_affichage">Display Priority *</Label>
                <Input
                  id="priorite_affichage"
                  type="number"
                  required
                  value={formData.priorite_affichage}
                  onChange={(e) => handleChange("priorite_affichage", parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Period */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Partnership Period
            </CardTitle>
            <CardDescription>Start and end dates for this partnership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_deb">Start Date *</Label>
                <Input
                  id="date_deb"
                  type="datetime-local"
                  required
                  value={formData.date_deb}
                  onChange={(e) => handleChange("date_deb", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_fin">End Date *</Label>
                <Input
                  id="date_fin"
                  type="datetime-local"
                  required
                  value={formData.date_fin}
                  onChange={(e) => handleChange("date_fin", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Social Media
            </CardTitle>
            <CardDescription>Social media profiles (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook || ""}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram || ""}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok">TikTok</Label>
                <Input
                  id="tiktok"
                  type="url"
                  value={formData.tiktok || ""}
                  onChange={(e) => handleChange("tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@..."
                  maxLength={200}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/partners")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating} size="lg" className="gap-2">
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Update Partner
          </Button>
        </div>
      </form>
    </div>
  );
}
