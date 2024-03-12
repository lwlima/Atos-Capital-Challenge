import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreateProduct from "@/hooks/useCreateProduct";
import verifyToken from "@/hooks/useGetProducts";

const FormSchema = z
	.object({
		dsProduto: z.string().min(1, "Descrição do produto é obrigatório"),
		dsCategoria: z.string().min(1, "Categoria do produto é obrigatória"),
		cdProduto: z.string().min(1, "Código do produto é obrigatório"),
		vlProduto: z.string().min(1, "Valor do produto é obrigatório"),
		qtdProduto: z.string().min(1, "Quantidade do produto é obrigatório"),
	})

type FormSchemaType = z.infer<typeof FormSchema> & { serverError: string };

export function CreateProduct() {
	const { mutateAsync: createProductFn } = useCreateProduct();
	verifyToken();
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
		await createProductFn(data)
			.then(() =>
				setTimeout(() => {
					navigate('/products')
				}, 2000)
			)
			.catch(error =>
				setError('serverError', { type: '400', message: error.response.data.message })
			);
	}

	return (
		<section id="createProduct" className="min-h-screen pt-9 px-16">
			<h2 className="text-4xl font-semibold mb-2 text-[#202020]">Olá Usuário!</h2>
			<p className="mb-16 text-sm text-[#898989]">Seja bem-vindo!</p>
			<h3 className="text-2xl font-semibold mb-8">Cadastrar Produto</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="bg-white p-6 rounded-lg w-full md:w-3/4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<label className="block text-sm font-bold text-[#1A202C] mb-4" htmlFor="descricao">
								Descrição
							</label>
							<Input {...register('dsProduto')} id="descricao" placeholder="Descrição do produto" className="text-[#90A3BF] bg-[#F6F7F9] h-14 px-6 border-0 focus-visible:ring-0" />
							{errors.dsProduto && (
								<span className="text-xs text-red-800 block">
									{errors.dsProduto?.message}
								</span>
							)}
						</div>
						<div>
							<label className="block text-sm font-bold text-[#1A202C] mb-4" htmlFor="categoria">
								Categoria
							</label>
							<Input {...register('dsCategoria')} id="categoria" placeholder="Categoria do produto" className="text-[#90A3BF] bg-[#F6F7F9] h-14 px-6 border-0 focus-visible:ring-0" />
							{errors.dsCategoria && (
								<span className="text-xs text-red-800 block">
									{errors.dsCategoria?.message}
								</span>
							)}
						</div>
						<div>
							<label className="block text-sm font-bold text-[#1A202C] mb-4" htmlFor="codigo">
								Código
							</label>
							<Input {...register('cdProduto')} id="codigo" placeholder="Código do produto" className="text-[#90A3BF] bg-[#F6F7F9] h-14 px-6 border-0 focus-visible:ring-0" />
							{errors.cdProduto && (
								<span className="text-xs text-red-800 block">
									{errors.cdProduto?.message}
								</span>
							)}
						</div>
						<div>
							<label className="block text-sm font-bold text-[#1A202C] mb-4" htmlFor="valor">
								Valor
							</label>
							<Input {...register('vlProduto')} id="valor" placeholder="Valor do Produto" className="text-[#90A3BF] bg-[#F6F7F9] h-14 px-6 border-0 focus-visible:ring-0" />
							{errors.vlProduto && (
								<span className="text-xs text-red-800 block">
									{errors.vlProduto?.message}
								</span>
							)}
						</div>
						<div>
							<label className="block text-sm font-bold text-[#1A202C] mb-4" htmlFor="quantidade">
								Quantidade
							</label>
							<Input {...register('qtdProduto')} id="quantidade" placeholder="Quantidade do produto" className="text-[#90A3BF] bg-[#F6F7F9] h-14 px-6 border-0 focus-visible:ring-0" />
							{errors.qtdProduto && (
								<span className="text-xs text-red-800 block">
									{errors.qtdProduto?.message}
								</span>
							)}
						</div>
					</div>
				</div>

				<div className="mt-14 rounded-lg w-full md:w-3/4 bg-white flex p-6 items-center justify-between">
					<div>
						<h4 className="text-lg font-bold text-[#1A202C]">Confirmação</h4>
						<p className="text-[#90A3BF] text-sm">Confira os dados informados antes de cadastrar o produto</p>
					</div>
					<Button type="submit" className="bg-[#89131D] text-white py-6 px-6">
						{isSubmitting
							? <Loader2 className="w-4 h-4 animate-spin" />
							: "Cadastrar"
						}
					</Button>
				</div>
			</form>
		</section >
	)
}