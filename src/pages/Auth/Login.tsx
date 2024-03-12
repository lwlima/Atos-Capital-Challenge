import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/useLogin";

const FormSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve possuir pelo menos 8 letras"),
  });

type FormSchemaType = z.infer<typeof FormSchema> & { serverError: string };

export function Login() {
  const { mutateAsync: loginFn } = useLogin();
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
    await loginFn({
      email: data.email,
      password: data.password
    })
      .then((res) => {
        localStorage.setItem('token', res.access_token);
        navigate('/products')
      })
      .catch(error =>
        setError('serverError', { type: '400', message: error.response.data.message })
      );
  }

  return (
    <section id="login" className="h-screen w-full flex items-center justify-center bg-white p-8 gap-8">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-[388px]">
          <h1 className="text-4xl font-bold mb-2">Olá! 👋</h1>
          <p className="mb-8">Faça login para começar a gerenciar seus produtos.</p>
          {errors.serverError && (
            <span className="text-xs text-red-800 block">
              {errors.serverError.message}
            </span>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <div className="mt-1">
                <Input {...register('email')} id="email" placeholder="seuemail@email.com" type="email" />
                {errors.email && (
                  <span className="text-xs text-red-800 block">
                    {errors.email?.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="mt-1">
                <Input {...register('password')} id="password" placeholder="Digite sua senha..." type="password" />
                {errors.password && (
                  <span className="text-xs text-red-800 block">
                    {errors.password?.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Button disabled={isSubmitting} className="w-full bg-[#bd1e59] text-white">
                {isSubmitting
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : "Login"
                }
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b border-gray-300" />
            <p className="text-xs text-center text-gray-500 uppercase">ou</p>
            <span className="w-1/5 border-b border-gray-300" />
          </div>
          <div className="text-center mt-6">
            <Link className="text-sm text-[#bd1e59]" to="/sign-up">
              Não possui conta? Cadastre-se!
            </Link>
          </div>
          <div className="mt-12 flex justify-center">
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
        className="flex-1 rounded-3xl h-full"
        src="https://s3-alpha-sig.figma.com/img/ad49/2342/a84c720559816b3621fbb0d10e66bd1b?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CYT7fWS0CHzS6MBzRfB-Ni7Ifq3RRynnuMTrMaWt4fy0BsNrz~OHSbSYSY1x0IgNXRMMNVnqq1qvpiNhmiy--LVYDv9nSxakCkuEk1xWJxh5d5XHzC-Or9XPrRPpgtT35-PcwcbK0V5LoVFanoTnEGK~ppR8Uf~Fdj2XBkv4VJOuEZWc9pq4n4MsEsydKFLO1zHcFXOL6wzsukupjciV9hqhqfUSTcQAXMntI58cnkgpPJLrqXcuyCpOXl25qWnLLIkgfMYIGx7~zpANIQGuuh742vedB1UhacxDxgqv9MhH8lTmc1d4dsyfeDfx00PI8r8dllfhsGsXTNpDB3eTfw__"
      />
    </section>
  )
}