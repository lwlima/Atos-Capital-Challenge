import { useMutation } from "@tanstack/react-query";

import { Credentials } from "@/types";

async function login(credentials: Credentials): Promise<{ access_token: string }> {
  return fetch(`http://localhost:8000/auth/login`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
}

export default function useLogin() {
  return useMutation({
    mutationFn: async (data: Credentials) => {
      return await login(data);
    }
  })
}