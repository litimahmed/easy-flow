import { useQuery } from '@tanstack/react-query';
import { aboutUsService } from '@/services/aboutUsService';
import { AboutUsData } from '@/types/aboutUs';

export const useAboutUs = () => {
  return useQuery<AboutUsData>({
    queryKey: ['aboutUs'],
    queryFn: aboutUsService.getAboutUs,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
