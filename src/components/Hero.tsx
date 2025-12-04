/**
 * @file Hero.tsx
 * @description This component renders the main hero section of the homepage.
 * It features a prominent title, subtitle, a call-to-action button, and key statistics,
 * all animated with Framer Motion for a dynamic user experience.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Clock } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import heroImage from "@/assets/toorrii_heroo.png";

/**
 * @component Hero
 * @description The main hero section component.
 */
const Hero = () => {
  // Hook to get the translation function.
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-24 overflow-hidden">
      {/* Main content container. */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            {/* Animation container for the hero content. */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >

            {/* Animated main heading. */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }} 
              className="text-4xl lg:text-6xl font-bold leading-tight text-foreground"
            >
              {t("hero.title")}
            </motion.h1>

            {/* Animated subtitle. */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.5 }} 
              className="text-xl text-muted-foreground leading-relaxed mx-auto"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Animated call-to-action button. */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.7 }} 
              className="flex justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" className="group shadow-elegant">
                {t("hero.cta")}
                {/* Animated arrow icon for visual engagement. */}
                <motion.div 
                  className={`${t("hero.cta").length > 20 ? 'mr-2 rtl:ml-2 rtl:mr-0' : 'ml-2 rtl:mr-2 rtl:ml-0'}`} 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Animated statistics section. */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.9 }} 
              className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto lg:mx-0"
            >
              {/* Individual stat: Active Users */}
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">25K+</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("hero.stat1")}
                </span>
              </div>
              {/* Individual stat: Daily Appointments */}
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-foreground">500+</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("hero.stat2")}
                </span>
              </div>
              {/* Individual stat: Average Time Saved */}
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">45min</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("hero.stat3")}
                </span>
              </div>
            </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={heroImage}
              alt="Toorrii App in action"
              className="max-w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
