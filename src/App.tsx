/**
 * @file App.tsx
 * @description This is the main application component.
 * It sets up the routing configuration, global providers, and defines the overall structure of the application.
 * All major pages are routed from this component.
 */

// Import global UI components and providers.
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// Import page components.
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import PartnerDetail from "./pages/PartnerDetail";
import TermsOfService from "./pages/TermsOfService";

// Import admin components
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPartnerList from "./pages/admin/PartnerList";
import AdminPartnerCreate from "./pages/admin/PartnerCreate";
import AdminPartnerEdit from "./pages/admin/PartnerEdit";
import AdminContactList from "./pages/admin/ContactList";
import AdminContactCreate from "./pages/admin/ContactCreate";
import AdminContactEdit from "./pages/admin/ContactEdit";
import AdminAboutUsCreate from "./pages/admin/AboutUsCreate";
import AdminAboutUsEdit from "./pages/admin/AboutUsEdit";
import AdminAboutUsVersions from "./pages/admin/AboutUsVersions";
import AdminPrivacyPolicyList from "./pages/admin/PrivacyPolicyList";
import AdminPrivacyPolicyCreate from "./pages/admin/PrivacyPolicyCreate";
import AdminTermsAndConditionsList from "./pages/admin/TermsAndConditionsList";
import AdminTermsAndConditionsCreate from "./pages/admin/TermsAndConditionsCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/partner/:partnerId" element={<PartnerDetail />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/partners" element={<ProtectedRoute><AdminPartnerList /></ProtectedRoute>} />
          <Route path="/admin/partners/create" element={<ProtectedRoute><AdminPartnerCreate /></ProtectedRoute>} />
          <Route path="/admin/partners/edit/:id" element={<ProtectedRoute><AdminPartnerEdit /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminContactList /></ProtectedRoute>} />
          <Route path="/admin/contacts/create" element={<ProtectedRoute><AdminContactCreate /></ProtectedRoute>} />
          <Route path="/admin/contacts/edit" element={<ProtectedRoute><AdminContactEdit /></ProtectedRoute>} />
          <Route path="/admin/about-us" element={<ProtectedRoute><AdminAboutUsCreate /></ProtectedRoute>} />
          <Route path="/admin/about-us/create" element={<ProtectedRoute><AdminAboutUsCreate /></ProtectedRoute>} />
          <Route path="/admin/about-us/edit/:id" element={<ProtectedRoute><AdminAboutUsEdit /></ProtectedRoute>} />
          <Route path="/admin/about-us/versions" element={<ProtectedRoute><AdminAboutUsVersions /></ProtectedRoute>} />
          <Route path="/admin/privacy-policy" element={<ProtectedRoute><AdminPrivacyPolicyList /></ProtectedRoute>} />
          <Route path="/admin/privacy-policy/create" element={<ProtectedRoute><AdminPrivacyPolicyCreate /></ProtectedRoute>} />
          <Route path="/admin/terms" element={<ProtectedRoute><AdminTermsAndConditionsList /></ProtectedRoute>} />
          <Route path="/admin/terms/create" element={<ProtectedRoute><AdminTermsAndConditionsCreate /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
