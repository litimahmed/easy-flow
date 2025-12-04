import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContacts } from "@/hooks/admin/useContacts";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowLeft,
  Globe, 
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Edit,
  Plus,
  ExternalLink,
  Smartphone,
  PhoneCall,
  Share2,
  Copy,
  Check,
  Languages,
  CircleDot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Language = "fr" | "ar" | "en";

const LANGUAGES: { key: Language; label: string; flag: string }[] = [
  { key: "fr", label: "Français", flag: "🇫🇷" },
  { key: "ar", label: "العربية", flag: "🇩🇿" },
  { key: "en", label: "English", flag: "🇬🇧" },
];

export default function ContactList() {
  const navigate = useNavigate();
  const { contact, isLoading } = useContacts();
  const [selectedLang, setSelectedLang] = useState<Language>("fr");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getMultilingualValue = (field: any): string => {
    if (typeof field === "object" && field !== null) {
      return field[selectedLang] || field.fr || "";
    }
    return field || "";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-muted" />
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm">Loading contact data...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="max-w-lg mx-auto py-20">
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Contact Information</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Add your company's contact details to display on your website.
            </p>
            <Button onClick={() => navigate("/admin/contacts/create")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Contact Info
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const socialLinks = [
    { key: "site_web", icon: Globe, label: "Website", value: contact.site_web },
    { key: "facebook", icon: Facebook, label: "Facebook", value: contact.facebook },
    { key: "instagram", icon: Instagram, label: "Instagram", value: contact.instagram },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", value: contact.linkedin },
    { key: "tiktok", icon: Share2, label: "TikTok", value: contact.tiktok },
    { key: "x", icon: Share2, label: "X", value: contact.x },
  ].filter((link) => link.value);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-2">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
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
            <h1 className="text-2xl font-semibold tracking-tight">Contact Management</h1>
            <p className="text-muted-foreground text-sm mt-1">
              View and manage your organization's contact information
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/contacts/edit")} variant="default" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Details
        </Button>
      </header>

      <Separator />

      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-2">Display Language:</span>
        <div className="flex gap-1">
          {LANGUAGES.map((lang) => (
            <Button
              key={lang.key}
              variant={selectedLang === lang.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLang(lang.key)}
              className="h-8 px-3 text-xs"
            >
              <span className="mr-1.5">{lang.flag}</span>
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Welcome Message */}
      {contact.message_acceuil && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CircleDot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                  {contact.titre ? getMultilingualValue(contact.titre) : "Welcome Message"}
                </p>
                <p 
                  className="text-foreground leading-relaxed"
                  dir={selectedLang === "ar" ? "rtl" : "ltr"}
                >
                  {typeof contact.message_acceuil === "object"
                    ? contact.message_acceuil[selectedLang] || ""
                    : contact.message_acceuil}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Details */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <ContactField
                icon={Mail}
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
                onCopy={() => copyToClipboard(contact.email, "email")}
                copied={copiedField === "email"}
              />
              <ContactField
                icon={Smartphone}
                label="Mobile 1"
                value={contact.telephone_1}
                href={`tel:${contact.telephone_1}`}
                onCopy={() => copyToClipboard(contact.telephone_1, "tel1")}
                copied={copiedField === "tel1"}
              />
              {contact.telephone_2 && (
                <ContactField
                  icon={Smartphone}
                  label="Mobile 2"
                  value={contact.telephone_2}
                  href={`tel:${contact.telephone_2}`}
                  onCopy={() => copyToClipboard(contact.telephone_2, "tel2")}
                  copied={copiedField === "tel2"}
                />
              )}
              {contact.telephone_fixe && (
                <ContactField
                  icon={PhoneCall}
                  label="Landline"
                  value={contact.telephone_fixe}
                  href={`tel:${contact.telephone_fixe}`}
                  onCopy={() => copyToClipboard(contact.telephone_fixe, "fixe")}
                  copied={copiedField === "fixe"}
                />
              )}
            </div>

            {contact.horaires && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Working Hours</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-sm">
                    {contact.horaires}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {contact.wilaya && (
                <Badge variant="secondary">{getMultilingualValue(contact.wilaya)}</Badge>
              )}
              {contact.ville && (
                <Badge variant="outline">{getMultilingualValue(contact.ville)}</Badge>
              )}
            </div>

            {contact.adresse && (
              <div 
                className="p-3 rounded-lg bg-muted/50 text-sm leading-relaxed"
                dir={selectedLang === "ar" ? "rtl" : "ltr"}
              >
                {getMultilingualValue(contact.adresse)}
              </div>
            )}

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(getMultilingualValue(contact.adresse))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg border border-border text-sm hover:bg-muted/50 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Open in Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Online Presence
              <Badge variant="secondary" className="ml-2 font-normal">
                {socialLinks.length} {socialLinks.length === 1 ? "link" : "links"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-all group"
                >
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{link.label}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {link.value.replace(/^https?:\/\//, "").slice(0, 30)}...
                    </p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      {contact.date_creation && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>
            Last updated: {new Date(contact.date_creation).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <Badge variant="outline" className="text-xs font-normal">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
            Active
          </Badge>
        </div>
      )}
    </div>
  );
}

// Sub-component for contact fields
function ContactField({
  icon: Icon,
  label,
  value,
  href,
  onCopy,
  copied,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-medium hover:text-primary transition-colors truncate block">
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium truncate">{value}</p>
        )}
      </div>
      {onCopy && (
        <button
          onClick={onCopy}
          className="p-1.5 rounded hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}
