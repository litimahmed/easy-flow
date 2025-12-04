import { apiClient } from './api';
import { PrivacyPolicyData } from '@/types/privacyPolicy';

interface PrivacyApiResponse {
  message: string;
  data: PrivacyPolicyData; // Single object, not array
}

export const privacyPolicyService = {
  async getPrivacyPolicy(): Promise<PrivacyPolicyData | null> {
    const response = await apiClient.get<PrivacyApiResponse>('/home/politique_confidentialite/');
    return response.data || null;
  },
};
