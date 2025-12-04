import { TermsAndConditions, TermsAndConditionsFormData } from "@/types/admin/termsAndConditions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const termsAndConditionsService = {
  async getAll(): Promise<TermsAndConditions[]> {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/home/condition_dutilisation/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch terms and conditions");
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  },

  async create(data: TermsAndConditionsFormData): Promise<TermsAndConditions> {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/admins/condition_dutilisation/ajouter/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create terms and conditions");
    }
    
    return response.json();
  },

  async update(conditionId: string, data: TermsAndConditionsFormData): Promise<TermsAndConditions> {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/admins/condition_dutilisation/modifier/?condition_id=${conditionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update terms and conditions");
    }
    
    return response.json();
  },
};
