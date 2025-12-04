import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privacyPolicyService } from "@/services/admin/privacyPolicyService";
import { PrivacyPolicyFormData } from "@/types/admin/privacyPolicy";
import { toast } from "@/hooks/use-toast";

export const usePrivacyPolicy = () => {
  const queryClient = useQueryClient();

  const { data: privacyPolicies, isLoading } = useQuery({
    queryKey: ["privacyPolicies"],
    queryFn: privacyPolicyService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: privacyPolicyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privacyPolicies"] });
      toast({
        title: "Success",
        description: "Privacy policy created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create privacy policy",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PrivacyPolicyFormData }) =>
      privacyPolicyService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privacyPolicies"] });
      toast({
        title: "Success",
        description: "Privacy policy updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update privacy policy",
        variant: "destructive",
      });
    },
  });

  return {
    privacyPolicies,
    isLoading,
    createPrivacyPolicy: createMutation.mutate,
    updatePrivacyPolicy: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
