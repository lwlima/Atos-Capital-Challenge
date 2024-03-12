import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "@/types";
import { PRODUCTS_QUERY_KEY } from "./useGetProducts";
import { useToast } from "@/components/ui/use-toast";

async function deleteProduct(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:8000/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'DELETE'
  });
}

export default function useDeleteProduct() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      return await deleteProduct(productId);
    },
    onSuccess: async (_, productId) => {
      queryClient.setQueryData([PRODUCTS_QUERY_KEY], (data: Product[]) => {
        return data.filter(product => product.id != productId);
      });
      toast({
        description: 'Produto excluído com sucesso'
      })
    },
    onError: () => toast({
      description: 'Ocorreu um erro ao excluir produto, tente novamente mais tarde'
    })
  })
}