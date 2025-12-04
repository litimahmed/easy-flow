import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAboutUs } from "@/hooks/admin/useAboutUs";
import { AboutNousFormData } from "@/types/admin/aboutUs";
import { 
  FileText, 
  Save, 
  Loader2, 
  ArrowLeft,
  Target,
  Lightbulb,
  Heart,
  Users,
  Award,
  MessageSquare,
  Sparkles
} from "lucide-react";

type Language = "en" | "fr" | "ar";

const languageConfig = {
  en: { label: "English", flag: "🇬🇧", dir: "ltr" as const, nativeName: "English" },
  fr: { label: "French", flag: "🇫🇷", dir: "ltr" as const, nativeName: "Français" },
  ar: { label: "Arabic", flag: "🇩🇿", dir: "rtl" as const, nativeName: "العربية" },
};

const fieldConfig = [
  { key: "titre", label: { en: "Title", fr: "Titre", ar: "العنوان" }, icon: Sparkles, type: "input", placeholder: { en: "About Us", fr: "À propos de nous", ar: "من نحن" } },
  { key: "slogan", label: { en: "Slogan", fr: "Slogan", ar: "الشعار" }, icon: MessageSquare, type: "input", placeholder: { en: "Shaping the future together", fr: "Innovons l'avenir ensemble", ar: "نبتكر المستقبل معاً" } },
  { key: "contenu", label: { en: "Main Content", fr: "Contenu Principal", ar: "المحتوى الرئيسي" }, icon: FileText, type: "textarea", rows: 5, placeholder: { en: "We are a platform...", fr: "Nous sommes une plateforme...", ar: "نحن منصة..." } },
  { key: "mission", label: { en: "Mission", fr: "Mission", ar: "المهمة" }, icon: Target, type: "textarea", rows: 3, placeholder: { en: "Provide simple yet powerful tools...", fr: "Offrir des outils simples et puissants...", ar: "تقديم أدوات بسيطة وقوية..." } },
  { key: "vision", label: { en: "Vision", fr: "Vision", ar: "الرؤية" }, icon: Lightbulb, type: "textarea", rows: 3, placeholder: { en: "To become the leading platform...", fr: "Devenir la plateforme leader...", ar: "أن نصبح المنصة الرائدة..." } },
  { key: "valeurs", label: { en: "Values", fr: "Valeurs", ar: "القيم" }, icon: Heart, type: "textarea", rows: 2, placeholder: { en: "Transparency, innovation...", fr: "Transparence, innovation...", ar: "الشفافية، الابتكار..." } },
  { key: "pourquoi_choisir_nous", label: { en: "Why Choose Us", fr: "Pourquoi Nous Choisir", ar: "لماذا تختارنا" }, icon: Award, type: "textarea", rows: 3, placeholder: { en: "Because we offer...", fr: "Parce que nous offrons...", ar: "لأننا نقدم..." } },
  { key: "qui_nous_servons", label: { en: "Who We Serve", fr: "Qui Nous Servons", ar: "من نخدم" }, icon: Users, type: "textarea", rows: 2, placeholder: { en: "Developers, startups...", fr: "Les développeurs, les startups...", ar: "المطورون، الشركات الناشئة..." } },
];

const defaultFormData: AboutNousFormData = {
  titre: { ar: "", fr: "", en: "" },
  contenu: { ar: "", fr: "", en: "" },
  mission: { ar: "", fr: "", en: "" },
  vision: { ar: "", fr: "", en: "" },
  valeurs: { ar: "", fr: "", en: "" },
  pourquoi_choisir_nous: { ar: "", fr: "", en: "" },
  qui_nous_servons: { ar: "", fr: "", en: "" },
  slogan: { ar: "", fr: "", en: "" },
  active: false,
};

export default function AboutUsEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { useAboutUsById, updateAboutUs, isUpdating } = useAboutUs();
  const { data: currentVersion, isLoading: isLoadingVersion } = useAboutUsById(id);
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [formData, setFormData] = useState<AboutNousFormData>(defaultFormData);

  // Load version data
  useEffect(() => {
    if (currentVersion) {
      // Convert API format to form format
      const extractValue = (field: any, lang: Language): string => {
        if (!field) return "";
        if (typeof field === "string") return field;
        if (Array.isArray(field)) {
          return field.find((f: any) => f.lang === lang)?.value || "";
        }
        return "";
      };

      setFormData({
        titre: { ar: extractValue(currentVersion.titre, "ar"), fr: extractValue(currentVersion.titre, "fr"), en: extractValue(currentVersion.titre, "en") },
        contenu: { ar: extractValue(currentVersion.contenu, "ar"), fr: extractValue(currentVersion.contenu, "fr"), en: extractValue(currentVersion.contenu, "en") },
        mission: { ar: extractValue(currentVersion.mission, "ar"), fr: extractValue(currentVersion.mission, "fr"), en: extractValue(currentVersion.mission, "en") },
        vision: { ar: extractValue(currentVersion.vision, "ar"), fr: extractValue(currentVersion.vision, "fr"), en: extractValue(currentVersion.vision, "en") },
        valeurs: { ar: extractValue(currentVersion.valeurs, "ar"), fr: extractValue(currentVersion.valeurs, "fr"), en: extractValue(currentVersion.valeurs, "en") },
        pourquoi_choisir_nous: { ar: extractValue(currentVersion.pourquoi_choisir_nous, "ar"), fr: extractValue(currentVersion.pourquoi_choisir_nous, "fr"), en: extractValue(currentVersion.pourquoi_choisir_nous, "en") },
        qui_nous_servons: { ar: extractValue(currentVersion.qui_nous_servons, "ar"), fr: extractValue(currentVersion.qui_nous_servons, "fr"), en: extractValue(currentVersion.qui_nous_servons, "en") },
        slogan: { ar: extractValue(currentVersion.slogan, "ar"), fr: extractValue(currentVersion.slogan, "fr"), en: extractValue(currentVersion.slogan, "en") },
        active: currentVersion.active === true || currentVersion.active === "true" || currentVersion.active === "1",
      });
    }
  }, [currentVersion]);

  const handleFieldChange = (fieldKey: string, lang: Language, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: {
        ...(prev[fieldKey as keyof AboutNousFormData] as { ar: string; fr: string; en: string }),
        [lang]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVersion || !id) return;

    const toTranslationArray = (field: { ar: string; fr: string; en: string }) => [
      { lang: "ar" as const, value: field.ar },
      { lang: "fr" as const, value: field.fr },
      { lang: "en" as const, value: field.en },
    ];

    const payload = {
      titre: toTranslationArray(formData.titre),
      contenu: toTranslationArray(formData.contenu),
      mission: toTranslationArray(formData.mission),
      vision: toTranslationArray(formData.vision),
      valeurs: toTranslationArray(formData.valeurs),
      pourquoi_choisir_nous: toTranslationArray(formData.pourquoi_choisir_nous),
      qui_nous_servons: toTranslationArray(formData.qui_nous_servons),
      slogan: toTranslationArray(formData.slogan),
      active: formData.active,
      version: currentVersion.version,
    };

    try {
      await updateAboutUs(id, payload);
      navigate("/admin/about-us/versions");
    } catch (err) {
      // Error handled in hook
    }
  };

  if (isLoadingVersion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentVersion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground">Version not found</p>
        <Button onClick={() => navigate("/admin/about-us/versions")}>Go Back</Button>
      </div>
    );
  }

  const currentLangConfig = languageConfig[activeLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/about-us/versions")}
              className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                Edit Version {currentVersion.version}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Update multilingual content for this version
              </p>
            </div>
          </div>
        </motion.div>

        {/* Language Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {(Object.keys(languageConfig) as Language[]).map((lang) => {
            const config = languageConfig[lang];
            return (
              <Button
                key={lang}
                variant={activeLanguage === lang ? "default" : "outline"}
                onClick={() => setActiveLanguage(lang)}
                className="gap-2"
              >
                <span>{config.flag}</span>
                <span>{config.nativeName}</span>
              </Button>
            );
          })}
        </div>

        {/* Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentLangConfig.flag}</span>
                <div>
                  <CardTitle className="text-xl">{currentLangConfig.nativeName} Content</CardTitle>
                  <CardDescription>Edit the details for the {currentLangConfig.label} version</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs">{currentLangConfig.dir.toUpperCase()}</Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6" dir={currentLangConfig.dir}>
              {/* Version (readonly) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Version</Label>
                <Input value={`Version ${currentVersion.version}`} disabled className="h-11 bg-muted/30 text-muted-foreground cursor-not-allowed" />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <div className="flex items-center gap-3 h-11 px-4 rounded-lg border border-border/50 bg-muted/20">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active" className="text-sm cursor-pointer">
                    {formData.active ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Inactive
                      </span>
                    )}
                  </Label>
                </div>
              </div>

              <Separator />

              {/* Dynamic Fields */}
              <div className="space-y-5">
                {fieldConfig.map((field) => {
                  const Icon = field.icon;
                  const fieldData = formData[field.key as keyof AboutNousFormData] as { ar: string; fr: string; en: string };
                  const value = fieldData?.[activeLanguage] || "";

                  return (
                    <div key={field.key} className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Icon className="h-4 w-4 text-primary" />
                        {field.label[activeLanguage]}
                      </Label>
                      
                      {field.type === "textarea" ? (
                        <Textarea
                          value={value}
                          onChange={(e) => handleFieldChange(field.key, activeLanguage, e.target.value)}
                          placeholder={field.placeholder[activeLanguage]}
                          rows={field.rows || 3}
                          className="resize-none focus-visible:ring-1 focus-visible:ring-primary/50"
                          dir={currentLangConfig.dir}
                        />
                      ) : (
                        <Input
                          value={value}
                          onChange={(e) => handleFieldChange(field.key, activeLanguage, e.target.value)}
                          placeholder={field.placeholder[activeLanguage]}
                          className="h-11 focus-visible:ring-1 focus-visible:ring-primary/50"
                          dir={currentLangConfig.dir}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/about-us/versions")}
                  className="flex-1 h-12"
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating} className="flex-1 h-12 font-semibold">
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
