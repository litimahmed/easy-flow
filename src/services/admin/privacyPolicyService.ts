import { PrivacyPolicy, PrivacyPolicyFormData } from "@/types/admin/privacyPolicy";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const privacyPolicyService = {
  async getAll(): Promise<PrivacyPolicy[]> {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/home/politique_confidentialite/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch privacy policies");
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  },

  async create(data: PrivacyPolicyFormData): Promise<PrivacyPolicy> {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/admins/politique_confidentialite/ajouter/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create privacy policy");
    }
    
    return response.json();
  },

  async update(id: number, data: PrivacyPolicyFormData): Promise<PrivacyPolicy> {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/admins/politique_confidentialite/modifier/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update privacy policy");
    }
    
    return response.json();
  },
};
