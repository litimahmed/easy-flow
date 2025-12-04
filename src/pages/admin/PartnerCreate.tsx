import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPartner } from "@/services/admin/partnerService";
import type { PartnerPayload, MultilingualField, AddressField, ExternalLink } from "@/types/admin/partner";
import { TYPE_PARTENAIRE_OPTIONS } from "@/types/admin/partner";
import { MultilingualArrayInput, createEmptyMultilingual } from "@/components/admin/MultilingualArrayInput";
import { useToast } from "@/hooks/use-toast";
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
  MapPin,
  Link2,
  Sparkles,
  Shield,
  Clock,
  Plus,
  Trash2,
  Upload,
  Image,
  X
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const createEmptyAddress = (): AddressField => ({
  rue: createEmptyMultilingual(),
  ville: createEmptyMultilingual(),
  pays: createEmptyMultilingual(),
});

export default function PartnerCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState<PartnerPayload>({
    nom_partenaire: createEmptyMultilingual(),
    description: createEmptyMultilingual(),
    adresse: [createEmptyAddress()],
    email: "",
    telephone: "+213",
    site_web: "",
    actif: true,
    facebook: "",
    instagram: "",
    tiktok: "",
    type_partenaire: "",
    date_deb: "",
    date_fin: "",
    liens_externes: [],
    date_creation_entreprise: "",
    priorite_affichage: 1,
  });

  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);
  
  // File upload states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearFile = (
    setFile: (file: File | null) => void,
    setPreview: (preview: string | null) => void,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!logoFile || !bannerFile) {
      toast({
        title: "Missing Images",
        description: "Please upload both logo and banner images.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    try {
      await createPartner(
        {
          ...formData,
          liens_externes: externalLinks.filter(link => link.url && link.titre),
        },
        logoFile,
        bannerFile
      );
      toast({
        title: "Success",
        description: "Partner created successfully",
      });
      navigate("/admin/partners");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create partner",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = <K extends keyof PartnerPayload>(field: K, value: PartnerPayload[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === "" ? null : value
    }));
  };

  const handleAddressChange = (field: keyof AddressField, value: MultilingualField) => {
    setFormData(prev => ({
      ...prev,
      adresse: [{
        ...prev.adresse[0],
        [field]: value
      }]
    }));
  };

  const addExternalLink = () => {
    setExternalLinks(prev => [...prev, { url: "", titre: "" }]);
  };

  const updateExternalLink = (index: number, field: keyof ExternalLink, value: string) => {
    setExternalLinks(prev => prev.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ));
  };

  const removeExternalLink = (index: number) => {
    setExternalLinks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -top-2 right-20 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
          
          <div className="relative flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/partners")}
              className="shrink-0 h-12 w-12 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Add New Partner
                </h1>
                <Badge variant="outline" className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-primary/5 border-primary/20">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium">New Entry</span>
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                Create a comprehensive partner profile with multilingual support
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Partner Identity Section */}
          <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Partner Identity</CardTitle>
                  <CardDescription className="mt-0.5">Core information in multiple languages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <MultilingualArrayInput
                label="Partner Name"
                value={formData.nom_partenaire}
                onChange={(value) => handleChange("nom_partenaire", value)}
                required
                maxLength={255}
                placeholder="Enter partner organization name"
              />

              <MultilingualArrayInput
                label="Description"
                value={formData.description}
                onChange={(value) => handleChange("description", value)}
                type="textarea"
                required
                placeholder="Describe the partner's mission, services, and collaboration details..."
              />
            </CardContent>
          </Card>

          {/* Media Upload Section */}
          <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-transparent border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <Image className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Media Assets</CardTitle>
                  <CardDescription className="mt-0.5">Logo and banner images (required)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Logo Upload */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    Partner Logo
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <div 
                    onClick={() => logoInputRef.current?.click()}
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer",
                      "hover:border-primary/50 hover:bg-primary/5",
                      logoPreview ? "border-primary/30 bg-primary/5" : "border-border/60"
                    )}
                  >
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setLogoFile, setLogoPreview)}
                      className="hidden"
                    />
                    {logoPreview ? (
                      <div className="relative">
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="w-full h-32 object-contain rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile(setLogoFile, setLogoPreview, logoInputRef);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload logo</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Banner Upload */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    Banner Image
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <div 
                    onClick={() => bannerInputRef.current?.click()}
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer",
                      "hover:border-primary/50 hover:bg-primary/5",
                      bannerPreview ? "border-primary/30 bg-primary/5" : "border-border/60"
                    )}
                  >
                    <input
                      ref={bannerInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setBannerFile, setBannerPreview)}
                      className="hidden"
                    />
                    {bannerPreview ? (
                      <div className="relative">
                        <img 
                          src={bannerPreview} 
                          alt="Banner preview" 
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile(setBannerFile, setBannerPreview, bannerInputRef);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload banner</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Section */}
          <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent/20 border border-accent/30">
                  <MapPin className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Address Information</CardTitle>
                  <CardDescription className="mt-0.5">Physical location in multiple languages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <MultilingualArrayInput
                  label="Street Address"
                  value={formData.adresse[0]?.rue || createEmptyMultilingual()}
                  onChange={(value) => handleAddressChange("rue", value)}
                  required
                  placeholder="Street name and number"
                />
                <MultilingualArrayInput
                  label="City"
                  value={formData.adresse[0]?.ville || createEmptyMultilingual()}
                  onChange={(value) => handleAddressChange("ville", value)}
                  required
                  placeholder="City name"
                />
                <MultilingualArrayInput
                  label="Country"
                  value={formData.adresse[0]?.pays || createEmptyMultilingual()}
                  onChange={(value) => handleAddressChange("pays", value)}
                  required
                  placeholder="Country name"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-b border-border/40 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Contact Details</CardTitle>
                    <CardDescription className="mt-0.5">How to reach this partner</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="contact@partner.com"
                    maxLength={254}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    required
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                    placeholder="+213 XXX XXX XXX"
                    maxLength={128}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site_web" className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Website
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <Input
                    id="site_web"
                    type="url"
                    required
                    value={formData.site_web}
                    onChange={(e) => handleChange("site_web", e.target.value)}
                    placeholder="https://partner-website.com"
                    maxLength={200}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-transparent border-b border-border/40 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <Shield className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Business Details</CardTitle>
                    <CardDescription className="mt-0.5">Partner type and configuration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="type_partenaire" className="text-sm font-medium">Partner Type</Label>
                  <Select
                    value={formData.type_partenaire}
                    onValueChange={(value) => handleChange("type_partenaire", value)}
                  >
                    <SelectTrigger className="h-11 border-border/40 focus:border-primary/60">
                      <SelectValue placeholder="Select partner type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPE_PARTENAIRE_OPTIONS.map((type) => (
                        <SelectItem key={type} value={type} className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{type}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_creation_entreprise" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Company Founded
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <Input
                    id="date_creation_entreprise"
                    type="date"
                    required
                    value={formData.date_creation_entreprise}
                    onChange={(e) => handleChange("date_creation_entreprise", e.target.value)}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priorite_affichage" className="text-sm font-medium">
                    Display Priority
                    <span className="text-muted-foreground text-xs ml-2">(Lower = Higher priority)</span>
                  </Label>
                  <Input
                    id="priorite_affichage"
                    type="number"
                    min={1}
                    required
                    value={formData.priorite_affichage}
                    onChange={(e) => handleChange("priorite_affichage", parseInt(e.target.value) || 1)}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 border border-emerald-500/20">
                  <div className="space-y-0.5">
                    <Label htmlFor="actif" className="cursor-pointer font-medium">Active Status</Label>
                    <p className="text-xs text-muted-foreground">Partner will be visible on public pages</p>
                  </div>
                  <Switch
                    id="actif"
                    checked={formData.actif}
                    onCheckedChange={(checked) => handleChange("actif", checked)}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Period */}
          <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-border/40 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Partnership Period</CardTitle>
                  <CardDescription className="mt-0.5">Contract duration and validity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date_deb" className="flex items-center gap-2 text-sm font-medium">
                    Start Date
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <Input
                    id="date_deb"
                    type="datetime-local"
                    required
                    value={formData.date_deb}
                    onChange={(e) => handleChange("date_deb", e.target.value)}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_fin" className="flex items-center gap-2 text-sm font-medium">
                    End Date
                    <span className="text-destructive text-xs">Required</span>
                  </Label>
                  <Input
                    id="date_fin"
                    type="datetime-local"
                    required
                    value={formData.date_fin}
                    onChange={(e) => handleChange("date_fin", e.target.value)}
                    className="h-11 border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media & External Links */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Social Media */}
            <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-transparent border-b border-border/40 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Social Media</CardTitle>
                    <CardDescription className="mt-0.5">Optional social profiles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2 text-sm font-medium">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={formData.facebook || ""}
                    onChange={(e) => handleChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/partner"
                    maxLength={200}
                    className="h-11 border-border/40 focus:border-primary/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2 text-sm font-medium">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={formData.instagram || ""}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/partner"
                    maxLength={200}
                    className="h-11 border-border/40 focus:border-primary/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok" className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-base">🎵</span>
                    TikTok
                  </Label>
                  <Input
                    id="tiktok"
                    type="url"
                    value={formData.tiktok || ""}
                    onChange={(e) => handleChange("tiktok", e.target.value)}
                    placeholder="https://tiktok.com/@partner"
                    maxLength={200}
                    className="h-11 border-border/40 focus:border-primary/60"
                  />
                </div>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className="border-border/40 shadow-lg shadow-primary/5 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border-b border-border/40 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Link2 className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">External Links</CardTitle>
                      <CardDescription className="mt-0.5">Additional resources</CardDescription>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExternalLink}
                    className="gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Add Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {externalLinks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Link2 className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No external links added</p>
                    <p className="text-xs mt-1">Click "Add Link" to add resources</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {externalLinks.map((link, index) => (
                      <div key={index} className="flex gap-3 items-start p-3 rounded-lg bg-muted/30 border border-border/40">
                        <div className="flex-1 space-y-3">
                          <Input
                            type="text"
                            value={link.titre}
                            onChange={(e) => updateExternalLink(index, "titre", e.target.value)}
                            placeholder="Link title"
                            className="h-10 border-border/40"
                          />
                          <Input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateExternalLink(index, "url", e.target.value)}
                            placeholder="https://..."
                            className="h-10 border-border/40"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExternalLink(index)}
                          className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/partners")}
              className="sm:order-1 h-12 px-6 border-border/40"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              size="lg"
              className={cn(
                "sm:order-2 h-12 px-8 gap-2 font-semibold",
                "bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90",
                "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              )}
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Create Partner
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
