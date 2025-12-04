import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPartners, getPartner, createPartner, updatePartner, deletePartner } from "@/services/admin/partnerService";
import { PartnerPayload } from "@/types/admin/partner";
import { useToast } from "@/hooks/use-toast";

export const usePartners = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: partners, isLoading, error, refetch } = useQuery({
    queryKey: ["partners"],
    queryFn: getAllPartners,
  });

  const createMutation = useMutation({
    mutationFn: createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast({
        title: "Success",
        description: "Partner created successfully",
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
    mutationFn: ({ partnerId, payload }: { partnerId: number; payload: PartnerPayload }) =>
      updatePartner(partnerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast({
        title: "Success",
        description: "Partner updated successfully",
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

  const deleteMutation = useMutation({
    mutationFn: deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast({
        title: "Success",
        description: "Partner deleted successfully",
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
    partners,
    isLoading,
    error,
    refetch,
    getPartner: (partnerId: number) => getPartner(partnerId),
    createPartner: (payload: PartnerPayload) => createMutation.mutateAsync(payload),
    updatePartner: (partnerId: number, payload: PartnerPayload) =>
      updateMutation.mutateAsync({ partnerId, payload }),
    deletePartner: (partnerId: number) => deleteMutation.mutateAsync(partnerId),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
