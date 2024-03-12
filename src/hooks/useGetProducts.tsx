import { useQuery } from "@tanstack/react-query";

import { Product } from "@/types";
import { useNavigate } from "react-router-dom";

export const PRODUCTS_QUERY_KEY = 'products';

async function getProducts(): Promise<Product[]> {
  const token = localStorage.getItem('token');
  return fetch('http://localhost:8000/products', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(async (res) => {
      if (res.status == 401) throw new Error();
      return await res.json()
    })
}

export default function useGetProducts() {
  const navigate = useNavigate();
  const response = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: async () => {
      return await getProducts()
        .catch(() => navigate('/'));
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const products = response.data ?? [];

  return { ...response, data: products }
}