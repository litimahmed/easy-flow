import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/services/admin/authService";
import { LoginPayload } from "@/types/admin/auth";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAuthenticated } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginAdmin(payload);
      // Store access and refresh tokens
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      
      // Update auth context
      setAuthenticated(true);
      
      const { dismiss } = toast({ 
        title: "Login Successful", 
        description: "Welcome back! Redirecting to your dashboard...", 
        variant: "success",
        duration: 2000
      });
      
      // Wait for user to see the toast, then dismiss and redirect
      setTimeout(() => {
        dismiss();
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";
      let errorTitle = "Authentication Failed";
      
      if (err instanceof Error) {
        const message = err.message.toLowerCase();
        if (message.includes("deactivated") || message.includes("disabled")) {
          errorTitle = "Account Deactivated";
          errorMessage = "Your account has been deactivated. Please contact the administrator for assistance.";
        } else if (message.includes("invalid") || message.includes("incorrect") || message.includes("wrong")) {
          errorTitle = "Invalid Credentials";
          errorMessage = "The email or password you entered is incorrect. Please try again.";
        } else if (message.includes("not found") || message.includes("no user") || message.includes("doesn't exist")) {
          errorTitle = "Account Not Found";
          errorMessage = "No account exists with this email address. Please verify your email.";
        } else if (message.includes("network") || message.includes("connection")) {
          errorTitle = "Connection Error";
          errorMessage = "Unable to connect to the server. Please check your internet connection.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      toast({ title: errorTitle, description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};