import { useQuery } from '@tanstack/react-query';
import { contactService } from '@/services/contactService';
import { ContactData } from '@/types/contact';

export const useContactInfo = () => {
  return useQuery<ContactData | null>({
    queryKey: ['contactInfo'],
    queryFn: contactService.getContactInfo,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
