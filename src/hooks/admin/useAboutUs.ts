import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAboutNous, getAllAboutUs, getActiveAboutUs, updateAboutUs, toggleAboutUsActive, getAboutUsById } from "@/services/admin/aboutUsService";
import { AboutNousPayload } from "@/types/admin/aboutUs";
import { useToast } from "@/hooks/use-toast";

export const useAboutUs = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: versions, isLoading: isLoadingVersions, refetch: refetchVersions } = useQuery({
    queryKey: ["aboutUs", "all"],
    queryFn: getAllAboutUs,
  });

  const { data: activeVersion, isLoading: isLoadingActive } = useQuery({
    queryKey: ["aboutUs", "active"],
    queryFn: getActiveAboutUs,
  });

  const useAboutUsById = (aboutId: string | undefined) => {
    return useQuery({
      queryKey: ["aboutUs", "byId", aboutId],
      queryFn: () => getAboutUsById(aboutId!),
      enabled: !!aboutId,
    });
  };

  const createMutation = useMutation({
    mutationFn: createAboutNous,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
      toast({
        title: "Success",
        description: "About Us content created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ aboutId, payload }: { aboutId: string; payload: AboutNousPayload }) =>
      updateAboutUs(aboutId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
      toast({
        title: "Success",
        description: "About Us updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (aboutId: string) => toggleAboutUsActive(aboutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
      toast({
        title: "Success",
        description: "About Us version activated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    versions,
    activeVersion,
    isLoadingVersions,
    isLoadingActive,
    refetchVersions,
    useAboutUsById,
    createAboutNous: (payload: AboutNousPayload) => createMutation.mutateAsync(payload),
    updateAboutUs: (aboutId: string, payload: AboutNousPayload) =>
      updateMutation.mutateAsync({ aboutId, payload }),
    toggleActive: (aboutId: string) => toggleActiveMutation.mutateAsync(aboutId),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isToggling: toggleActiveMutation.isPending,
  };
};
