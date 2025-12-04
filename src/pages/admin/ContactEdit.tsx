import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useContacts } from "@/hooks/admin/useContacts";
import { MultilingualInput } from "@/components/admin/MultilingualInput";
import type { ContactPayload } from "@/types/admin/contact";
import { 
  MapPin, 
  Mail, 
  Clock, 
  Globe, 
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Save,
  Loader2,
  ArrowLeft,
  Smartphone,
  PhoneCall,
  Share2
} from "lucide-react";

export default function ContactEdit() {
  const navigate = useNavigate();
  const { updateContact: updateContactMutation, isUpdating } = useContacts();
  const [formData, setFormData] = useState<ContactPayload>({
    titre: { fr: "", ar: "", en: "" },
    email: "",
    telephone_1: "",
    telephone_2: "",
    telephone_fixe: "",
    adresse: { fr: "", ar: "", en: "" },
    ville: { fr: "", ar: "", en: "" },
    wilaya: { fr: "", ar: "", en: "" },
    horaires: "",
    site_web: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    x: "",
    message_acceuil: { fr: "", ar: "", en: "" },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContactMutation(formData);
      navigate("/admin/contacts");
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/admin/contacts")}
          className="h-10 w-10 rounded-xl border-border/50 hover:bg-muted/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Update Contact Information
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Modify your organization's contact details and online presence
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Company Information</CardTitle>
                <CardDescription className="text-sm">Basic contact details for your organization</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <MultilingualInput
              label="Company Title"
              value={formData.titre || { fr: "", ar: "", en: "" }}
              onChange={(value) => setFormData(prev => ({ ...prev, titre: value }))}
              maxLength={255}
              placeholder={{ 
                fr: "Titre en français", 
                ar: "العنوان بالعربية", 
                en: "Title in English" 
              }}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@company.com"
                  maxLength={100}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaires" className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Working Hours
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="horaires"
                  required
                  value={formData.horaires}
                  onChange={(e) => setFormData(prev => ({ ...prev, horaires: e.target.value }))}
                  placeholder="Mon-Fri: 9:00 AM - 5:00 PM"
                  maxLength={255}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="telephone_1" className="text-sm font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  Mobile Phone 1
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="telephone_1"
                  type="tel"
                  required
                  value={formData.telephone_1}
                  onChange={(e) => setFormData(prev => ({ ...prev, telephone_1: e.target.value }))}
                  placeholder="+213 XXX XXX XXX"
                  maxLength={128}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone_2" className="text-sm font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  Mobile Phone 2
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="telephone_2"
                  type="tel"
                  required
                  value={formData.telephone_2}
                  onChange={(e) => setFormData(prev => ({ ...prev, telephone_2: e.target.value }))}
                  placeholder="+213 XXX XXX XXX"
                  maxLength={128}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone_fixe" className="text-sm font-medium flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-muted-foreground" />
                  Landline
                  <span className="text-destructive">*</span>
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 h-11 text-sm font-medium text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                    +213
                  </span>
                  <Input
                    id="telephone_fixe"
                    type="tel"
                    required
                    value={formData.telephone_fixe}
                    onChange={(e) => setFormData(prev => ({ ...prev, telephone_fixe: e.target.value }))}
                    placeholder="XX XX XX XX"
                    maxLength={20}
                    className="h-11 rounded-l-none"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Location Details</CardTitle>
                <CardDescription className="text-sm">Physical address and location information (multilingual)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <MultilingualInput
              label="Street Address"
              value={formData.adresse}
              onChange={(value) => setFormData(prev => ({ ...prev, adresse: value }))}
              required
              maxLength={255}
              placeholder={{ 
                fr: "Adresse en français", 
                ar: "العنوان بالعربية", 
                en: "Address in English" 
              }}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <MultilingualInput
                label="City"
                value={formData.ville}
                onChange={(value) => setFormData(prev => ({ ...prev, ville: value }))}
                required
                maxLength={100}
                placeholder={{ 
                  fr: "Ville en français", 
                  ar: "المدينة بالعربية", 
                  en: "City in English" 
                }}
              />

              <MultilingualInput
                label="Wilaya / Province"
                value={formData.wilaya}
                onChange={(value) => setFormData(prev => ({ ...prev, wilaya: value }))}
                required
                maxLength={100}
                placeholder={{ 
                  fr: "Wilaya en français", 
                  ar: "الولاية بالعربية", 
                  en: "Wilaya in English" 
                }}
              />
            </div>

            <MultilingualInput
              label="Welcome Message"
              value={formData.message_acceuil || { fr: "", ar: "", en: "" }}
              onChange={(value) => setFormData(prev => ({ ...prev, message_acceuil: value }))}
              type="textarea"
              placeholder={{ 
                fr: "Message d'accueil en français", 
                ar: "رسالة الترحيب بالعربية", 
                en: "Welcome message in English" 
              }}
            />
          </CardContent>
        </Card>

        {/* Online Presence Section */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-medium">Online Presence</CardTitle>
                <CardDescription className="text-sm">Website and social media profiles</CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="site_web" className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  Website
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="site_web"
                  type="url"
                  required
                  value={formData.site_web}
                  onChange={(e) => setFormData(prev => ({ ...prev, site_web: e.target.value }))}
                  placeholder="https://www.company.com"
                  maxLength={200}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-sm font-medium flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-muted-foreground" />
                  Facebook
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  required
                  value={formData.facebook}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://facebook.com/company"
                  maxLength={200}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="https://instagram.com/..."
                  maxLength={200}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok" className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  TikTok
                </Label>
                <Input
                  id="tiktok"
                  type="url"
                  value={formData.tiktok || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, tiktok: e.target.value }))}
                  placeholder="https://tiktok.com/@..."
                  maxLength={200}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/company/..."
                  maxLength={200}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="x" className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  X (Twitter)
                </Label>
                <Input
                  id="x"
                  type="url"
                  value={formData.x || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, x: e.target.value }))}
                  placeholder="https://x.com/..."
                  maxLength={200}
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/admin/contacts")}
            className="h-11 px-6"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isUpdating} 
            className="h-11 px-8 gap-2"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Update Contact
          </Button>
        </div>
      </form>
    </div>
  );
}
