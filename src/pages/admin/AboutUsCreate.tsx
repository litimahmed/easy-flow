import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAboutUs } from "@/hooks/admin/useAboutUs";
import { AboutNousFormData, formDataToPayload } from "@/types/admin/aboutUs";
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
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

type Language = "en" | "fr" | "ar";

const languageConfig = {
  en: { label: "English", flag: "🇬🇧", dir: "ltr" as const, nativeName: "English" },
  fr: { label: "French", flag: "🇫🇷", dir: "ltr" as const, nativeName: "Français" },
  ar: { label: "Arabic", flag: "🇩🇿", dir: "rtl" as const, nativeName: "العربية" },
};

const fieldConfig = [
  { 
    key: "titre", 
    label: { en: "Title", fr: "Titre", ar: "العنوان" },
    icon: Sparkles,
    type: "input",
    required: true,
    placeholder: { en: "About Us", fr: "À propos de nous", ar: "من نحن" }
  },
  { 
    key: "slogan", 
    label: { en: "Slogan", fr: "Slogan", ar: "الشعار" },
    icon: MessageSquare,
    type: "input",
    required: false,
    placeholder: { en: "Shaping the future together", fr: "Innovons l'avenir ensemble", ar: "نبتكر المستقبل معاً" }
  },
  { 
    key: "contenu", 
    label: { en: "Main Content", fr: "Contenu Principal", ar: "المحتوى الرئيسي" },
    icon: FileText,
    type: "textarea",
    required: true,
    rows: 5,
    placeholder: { 
      en: "We are a platform designed to empower individuals and businesses...", 
      fr: "Nous sommes une plateforme visant à permettre aux particuliers...", 
      ar: "نحن منصة تهدف إلى تمكين الأفراد والشركات..." 
    }
  },
  { 
    key: "mission", 
    label: { en: "Mission", fr: "Mission", ar: "المهمة" },
    icon: Target,
    type: "textarea",
    required: false,
    rows: 3,
    placeholder: { 
      en: "Provide simple yet powerful tools...", 
      fr: "Offrir des outils simples et puissants...", 
      ar: "تقديم أدوات بسيطة وقوية..." 
    }
  },
  { 
    key: "vision", 
    label: { en: "Vision", fr: "Vision", ar: "الرؤية" },
    icon: Lightbulb,
    type: "textarea",
    required: false,
    rows: 3,
    placeholder: { 
      en: "To become the leading platform...", 
      fr: "Devenir la plateforme leader...", 
      ar: "أن نصبح المنصة الرائدة..." 
    }
  },
  { 
    key: "valeurs", 
    label: { en: "Values", fr: "Valeurs", ar: "القيم" },
    icon: Heart,
    type: "textarea",
    required: false,
    rows: 2,
    placeholder: { 
      en: "Transparency, innovation, quality, community support", 
      fr: "Transparence, innovation, qualité, soutien communautaire", 
      ar: "الشفافية، الابتكار، الجودة، دعم المجتمع" 
    }
  },
  { 
    key: "pourquoi_choisir_nous", 
    label: { en: "Why Choose Us", fr: "Pourquoi Nous Choisir", ar: "لماذا تختارنا" },
    icon: Award,
    type: "textarea",
    required: false,
    rows: 3,
    placeholder: { 
      en: "Because we offer a smooth experience...", 
      fr: "Parce que nous offrons une expérience fluide...", 
      ar: "لأننا نقدم تجربة مستخدم سلسة..." 
    }
  },
  { 
    key: "qui_nous_servons", 
    label: { en: "Who We Serve", fr: "Qui Nous Servons", ar: "من نخدم" },
    icon: Users,
    type: "textarea",
    required: false,
    rows: 2,
    placeholder: { 
      en: "Developers, startups, and personal project creators", 
      fr: "Les développeurs, les startups et les créateurs...", 
      ar: "المطورون، الشركات الناشئة، ومالكو المشاريع الشخصية" 
    }
  },
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
  active: true,
};

export default function AboutUsCreate() {
  const navigate = useNavigate();
  const { createAboutNous, isCreating, versions, isLoadingVersions } = useAboutUs();
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [formData, setFormData] = useState<AboutNousFormData>(defaultFormData);
  const [version, setVersion] = useState<number>(1);

  // Calculate suggested version number based on existing records
  const suggestedVersion = (versions?.length || 0) + 1;
  
  // Update version when versions load
  useEffect(() => {
    if (versions && !isLoadingVersions) {
      setVersion(suggestedVersion);
    }
  }, [versions, isLoadingVersions, suggestedVersion]);

  const handleFieldChange = (fieldKey: string, lang: Language, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: {
        ...(prev[fieldKey as keyof AboutNousFormData] as { ar: string; fr: string; en: string }),
        [lang]: value,
      },
    }));
  };

  const calculateProgress = (): number => {
    const requiredFields = ["titre", "contenu"];
    const languages: Language[] = ["en", "fr", "ar"];
    let filled = 0;
    let total = requiredFields.length * languages.length;

    requiredFields.forEach(field => {
      languages.forEach(lang => {
        const fieldData = formData[field as keyof AboutNousFormData] as { ar: string; fr: string; en: string };
        if (fieldData[lang]?.trim()) filled++;
      });
    });

    return Math.round((filled / total) * 100);
  };

  const getLanguageCompleteness = (lang: Language): { filled: number; total: number } => {
    let filled = 0;
    const requiredFields = ["titre", "contenu"];
    requiredFields.forEach(field => {
      const fieldData = formData[field as keyof AboutNousFormData] as { ar: string; fr: string; en: string };
      if (fieldData[lang]?.trim()) filled++;
    });
    return { filled, total: requiredFields.length };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formDataToPayload(formData),
      version: version,
    };
    
    try {
      await createAboutNous(payload as any);
      navigate("/admin/dashboard");
    } catch (err) {
      // Error handled in hook
    }
  };

  const progress = calculateProgress();
  const currentLangConfig = languageConfig[activeLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin/dashboard")}
                className="shrink-0 h-10 w-10 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <div className="relative p-3 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg">
                    <FileText className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                    Create About Us
                  </h1>
                  <p className="text-muted-foreground text-sm lg:text-base mt-0.5">
                    Build multilingual content for your company profile
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">
                      Content Completion
                    </span>
                    <span className="text-sm font-bold text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <Separator orientation="vertical" className="hidden lg:block h-12" />

                <div className="flex gap-3 flex-wrap">
                  {(Object.keys(languageConfig) as Language[]).map((lang) => {
                    const { filled, total } = getLanguageCompleteness(lang);
                    const isComplete = filled === total;
                    const config = languageConfig[lang];

                    return (
                      <motion.button
                        key={lang}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveLanguage(lang)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                          activeLanguage === lang
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
                        }`}
                      >
                        <span className="text-2xl">{config.flag}</span>
                        <div className="text-left">
                          <p className="font-medium text-sm text-foreground">{config.nativeName}</p>
                          <p className="text-xs text-muted-foreground">
                            {filled}/{total} required
                          </p>
                        </div>
                        {isComplete ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentLangConfig.flag}</span>
                    <div>
                      <CardTitle className="text-xl">
                        {currentLangConfig.nativeName} Content
                      </CardTitle>
                      <CardDescription>
                        Fill in the details for the {currentLangConfig.label} version
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {currentLangConfig.dir.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6" dir={currentLangConfig.dir}>
                  {/* Version */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Version</Label>
                    <Input
                      type="number"
                      value={version}
                      onChange={(e) => setVersion(parseInt(e.target.value) || 1)}
                      min={1}
                      className="h-11"
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground">
                      Suggested: {suggestedVersion} (based on {versions?.length || 0} existing version{(versions?.length || 0) !== 1 ? 's' : ''})
                    </p>
                  </div>

                  {/* Status */}
                  <div className="space-y-2" dir="ltr">
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
                        <motion.div
                          key={field.key}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-2"
                        >
                          <Label className="flex items-center gap-2 text-sm font-medium">
                            <Icon className="h-4 w-4 text-primary" />
                            {field.label[activeLanguage]}
                            {field.required && <span className="text-destructive">*</span>}
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
                        </motion.div>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/admin/dashboard")}
                      className="flex-1 h-12"
                      disabled={isCreating}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isCreating || progress < 100}
                      className="flex-1 h-12 font-semibold"
                      style={{ background: progress >= 100 ? 'var(--gradient-primary)' : undefined }}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Create Version
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
