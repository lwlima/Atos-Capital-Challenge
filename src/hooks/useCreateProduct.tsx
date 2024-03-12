import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "@/types";
import { PRODUCTS_QUERY_KEY } from "./useGetProducts";
import { useToast } from "@/components/ui/use-toast";

async function createProduct(product: Product): Promise<Product> {
  const token = localStorage.getItem('token');
  return fetch(`http://localhost:8000/products/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({ ...product, dtCadastro: new Date().toLocaleString() })
  })
    .then(res => res.json());
}

export default function useCreateProduct() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Product) => {
      return await createProduct(data);
    },
    onSuccess: async (createdProduct) => {
      queryClient.setQueryData([PRODUCTS_QUERY_KEY], (data: Product[]) => {
        if (data)
          return [...data, createdProduct];

        return [createdProduct];
      })

      toast({
        description: 'Produto criado com sucesso'
      })
    },
    onError: () => toast({
      description: 'Ocorreu um erro ao criar produto, tente novamente mais tarde'
    })
  })
}