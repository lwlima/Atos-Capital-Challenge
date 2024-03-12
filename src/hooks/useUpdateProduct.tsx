import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "@/types";
import { PRODUCTS_QUERY_KEY } from "./useGetProducts";

async function updateProduct(data: Product): Promise<Product> {
  return fetch(`http://localhost:8000/products/${data.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
    .then(res => res.json());
}

export default function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Product) => {
      return await updateProduct(data);
    },
    onSuccess: async (createdProduct) => {
      queryClient.setQueryData([PRODUCTS_QUERY_KEY], (data: Product[]) => {
        return [...data, createdProduct];
      })
    }
  })
}