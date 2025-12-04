/**
 * @file PrivacyPolicy.tsx
 * @description Full Privacy Policy page with detailed privacy information.
 */

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/contexts/TranslationContext";
import { Shield, ArrowLeft } from "lucide-react";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const { t, language } = useTranslation();
  const { data: privacyData } = usePrivacyPolicy();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  type TranslatableField = { fr?: string; ar?: string; en?: string; } | undefined | {};
  type Language = 'en' | 'fr' | 'ar';

  const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
    if (!field || typeof field !== 'object') return fallback;
    const translated = field[language as Language] || field['en'] || field['fr'] || field['ar'];
    return translated || fallback;
  };

  const getTitleFromData = (titleData: any, fallback: string = ''): string => {
    if (!titleData) return fallback;
    // Handle array format: [{ lang: "en", value: "..." }]
    if (Array.isArray(titleData)) {
      const titleObj = titleData.find(t => t.lang === language) || titleData.find(t => t.lang === 'en') || titleData[0];
      return titleObj?.value || fallback;
    }
    // Handle object format: { en: "...", fr: "...", ar: "..." }
    if (typeof titleData === 'object') {
      return getTranslated(titleData, fallback);
    }
    return fallback;
  };

  const getContentSections = () => {
    if (!privacyData?.contenu) return [];
    // Handle array format with sections
    if (Array.isArray(privacyData.contenu)) {
      return privacyData.contenu.filter(section => section.type === 'section');
    }
    return [];
  };

  const getIntroText = () => {
    if (!privacyData?.contenu) return '';
    // Handle array format with intro
    if (Array.isArray(privacyData.contenu)) {
      const intro = privacyData.contenu.find(section => section.type === 'intro');
      return intro?.text ? getTranslated(intro.text) : '';
    }
    // Handle simple object format
    if (typeof privacyData.contenu === 'object' && !Array.isArray(privacyData.contenu)) {
      return getTranslated(privacyData.contenu);
    }
    return '';
  };

  const hasApiContent = privacyData && (getIntroText() || getContentSections().length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {t('aboutPage.backToHome')}
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTitleFromData(privacyData?.titre, t("privacy.title"))}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {t("privacy.subtitle")}
            </p>
            {privacyData?.version && (
              <p className="text-sm text-muted-foreground">
                {t("terms.lastUpdated")} - Version {privacyData.version}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          {hasApiContent && getIntroText() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 p-8 bg-card border border-border rounded-2xl"
            >
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {getIntroText()}
              </div>
            </motion.div>
          )}

          {/* Main Sections from API */}
          {hasApiContent && getContentSections().length > 0 && (
            <div className="space-y-8">
              {getContentSections().map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors scroll-mt-24"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{getTranslated(section.titre)}</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {getTranslated(section.paragraphe)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
