import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreateUser from "@/hooks/useCreateUser";

const FormSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve possuir pelo menos 8 letras"),
    passwordConfirmation: z
      .string()
      .min(1, "A confirmação da senha é obrigatório"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "As senhas estão diferentes",
  });

type FormSchemaType = z.infer<typeof FormSchema> & { serverError: string };

export function SignUp() {
  const { mutateAsync: createUserFn } = useCreateUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await createUserFn({
      email: data.email,
      password: data.password,
      name: data.name
    })
      .then(() =>
        setTimeout(() => {
          navigate('/')
        }, 2000)
      )
      .catch(error =>
        setError('serverError', { type: '400', message: error.response.data.message })
      );
  }

  return (
    <section id="signUp" className="h-screen w-full flex items-center justify-center bg-white p-8 gap-8">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-[388px]">
          <h2 className="text-2xl font-bold mb-2">Cadastre-se</h2>
          <p className="mb-6 text-sm text-gray-700">Preencha os campos para concluir seu cadastro</p>
          {errors.serverError && (
            <span className="text-xs text-red-800 block">
              {errors.serverError.message}
            </span>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Nome
              </label>
              <Input {...register("name")} id="name" placeholder="Informe seu nome..." />
              {errors.name && (
                <span className="text-xs text-red-800 block">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <Input {...register("email")} id="email" placeholder="seuemail@email.com" type="email" />
              {errors.email && (
                <span className="text-xs text-red-800 block">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Senha
              </label>
              <Input {...register("password")} id="password" placeholder="Digite sua senha..." type="password" />
              {errors.password && (
                <span className="text-xs text-red-800 block">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="passwordConfirmation">
                Confirme sua senha
              </label>
              <Input {...register("passwordConfirmation")} id="confirm-password" placeholder="Confirme a senha..." type="password" />
              {errors.passwordConfirmation && (
                <span className="text-xs text-red-800 block">
                  {errors.passwordConfirmation?.message}
                </span>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#bd1e59] text-white">
              {isSubmitting
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : "Cadastrar"
              }
            </Button>
          </form>
          <div className="mt-6 flex justify-center">
            <img
              alt="ATOS CAPITAL"
              height="53"
              src="/src/assets/img/logo.png"
              width="188"
            />
          </div>
        </div>
      </div>
      <img
        alt=""
        className="h-full flex-1 rounded-3xl"
        src="https://s3-alpha-sig.figma.com/img/ad49/2342/a84c720559816b3621fbb0d10e66bd1b?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CYT7fWS0CHzS6MBzRfB-Ni7Ifq3RRynnuMTrMaWt4fy0BsNrz~OHSbSYSY1x0IgNXRMMNVnqq1qvpiNhmiy--LVYDv9nSxakCkuEk1xWJxh5d5XHzC-Or9XPrRPpgtT35-PcwcbK0V5LoVFanoTnEGK~ppR8Uf~Fdj2XBkv4VJOuEZWc9pq4n4MsEsydKFLO1zHcFXOL6wzsukupjciV9hqhqfUSTcQAXMntI58cnkgpPJLrqXcuyCpOXl25qWnLLIkgfMYIGx7~zpANIQGuuh742vedB1UhacxDxgqv9MhH8lTmc1d4dsyfeDfx00PI8r8dllfhsGsXTNpDB3eTfw__"
      />
    </section>
  )
}