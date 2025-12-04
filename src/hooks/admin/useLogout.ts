import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { logoutAdmin } from "@/services/admin/authService";

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      
      // Try to call backend logout (may fail if token blacklist not configured)
      try {
        await logoutAdmin(accessToken || undefined, refreshToken || undefined);
      } catch (apiError) {
        // Backend logout failed - continue with local logout anyway
        console.warn("Backend logout failed, proceeding with local logout");
      }
      
      // Always clear stored tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      
      toast({ 
        title: "Logged Out", 
        description: "You have been signed out successfully.", 
        variant: "default" 
      });
      navigate("/admin/login");
    } catch (err) {
      // Fallback: clear tokens and redirect even on unexpected errors
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast({ 
        title: "Logged Out", 
        description: "Session ended.", 
        variant: "default" 
      });
      navigate("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
