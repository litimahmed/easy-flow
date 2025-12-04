import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { termsAndConditionsService } from "@/services/admin/termsAndConditionsService";
import { TermsAndConditionsFormData } from "@/types/admin/termsAndConditions";
import { toast } from "@/hooks/use-toast";

export const useTermsAndConditions = () => {
  const queryClient = useQueryClient();

  const { data: termsAndConditions, isLoading } = useQuery({
    queryKey: ["termsAndConditions"],
    queryFn: termsAndConditionsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: termsAndConditionsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termsAndConditions"] });
      toast({
        title: "Success",
        description: "Terms and conditions created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create terms and conditions",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ conditionId, data }: { conditionId: string; data: TermsAndConditionsFormData }) =>
      termsAndConditionsService.update(conditionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termsAndConditions"] });
      toast({
        title: "Success",
        description: "Terms and conditions updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update terms and conditions",
        variant: "destructive",
      });
    },
  });

  return {
    termsAndConditions,
    isLoading,
    createTermsAndConditions: createMutation.mutate,
    updateTermsAndConditions: (conditionId: string, data: TermsAndConditionsFormData) =>
      updateMutation.mutate({ conditionId, data }),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
