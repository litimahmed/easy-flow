import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getContact, createContact, updateContact } from "@/services/admin/contactService";
import { ContactPayload } from "@/types/admin/contact";
import { useToast } from "@/hooks/use-toast";

export const useContacts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contact, isLoading, error, refetch } = useQuery({
    queryKey: ["contact"],
    queryFn: getContact,
  });

  const createMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      toast({
        title: "Success",
        description: "Contact created successfully",
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
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      toast({
        title: "Success",
        description: "Contact updated successfully",
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
    contact,
    isLoading,
    error,
    refetch,
    createContact: (payload: ContactPayload) => createMutation.mutateAsync(payload),
    updateContact: (payload: ContactPayload) => updateMutation.mutateAsync(payload),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
