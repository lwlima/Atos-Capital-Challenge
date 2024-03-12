import { useMutation } from "@tanstack/react-query";

import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

async function createUser(user: User): Promise<User> {
  return fetch(`http://localhost:8000/auth/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(user)
  })
    .then(res => res.json());
}

export default function useCreateUser() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: User) => {
      return await createUser(data);
    },
    onSuccess: () => toast({
      description: 'Usuário criado com sucesso'
    }),
    onError: () => toast({
      description: 'Ocorreu um erro ao criar usuário, tente novamente mais tarde'
    })
  })
}