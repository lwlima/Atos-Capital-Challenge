import { Loader2, Search } from 'lucide-react';
import _debounce from "lodash/debounce";
import { Link } from 'react-router-dom';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetProducts from "@/hooks/useGetProducts";
import useDeleteProduct from '@/hooks/useDeleteProduct';
import { ChangeEvent, useState } from 'react';
import { Product } from '@/types';

function formatDate(date: Date) {
	const newDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);

	return newDate.toLocaleDateString('pt-br', {
		timeZone: 'America/Sao_Paulo',
	});
}

export function Products() {
	const { isPending, error, data: products } = useGetProducts();
	const { mutateAsync: deleteProductFn } = useDeleteProduct();
	const debouncedSearch = _debounce(handleSearchChange, 500);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([] as Product[]);

	function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.value == '') {
			setFilteredProducts([]);
			return;
		}
		const filtered = products.filter(product => product.dsCategoria.includes(event.target.value));
		setFilteredProducts(filtered);
	}

	return (
		<section id="products" className="min-h-screen w-full pt-9 px-16">
			<div className="flex justify-between items-center mb-16">
				<div>
					<h2 className="text-4xl font-semibold mb-2 text-[#202020]">Olá Usuário!</h2>
					<p className="text-sm text-[#898989]">Seja bem-vindo!</p>
				</div>
				<Link to="/new-product">
					<Button className="bg-[#89131D] p-6 text-white">+ Novo Produto</Button>
				</Link>
			</div>

			<section className="">
				<h3 className="text-2xl font-semibold mb-8">Cadastrar Produto</h3>
				<div className="flex justify-between items-center mt-2">
					<div className="relative h-10 w-64">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-5 w-5" />
						<Input
							type="text"
							id="search"
							name="search"
							placeholder="Procurar..."
							className="pl-14 pr-3 py-2 text-md bg-[#F9F9F9] rounded-lg border-0 focus-visible:ring-0"
							onChange={(event) => debouncedSearch(event)}
						/>
					</div>
					<div className="flex items-center space-x-2">
						<span className="font-semibold text-gray-700">{products.length}</span>
						<span className="text-gray-600">Total de cadastros</span>
					</div>
				</div>
				<div className="mt-4 bg-white p-6 rounded-lg shadow">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-left">Descrição</TableHead>
								<TableHead className="text-left">Categoria</TableHead>
								<TableHead className="text-left">Data Cadastro</TableHead>
								<TableHead className="text-left">Cód. Produto</TableHead>
								<TableHead className="text-left">Preço</TableHead>
								<TableHead className="text-center">Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{error ? (
								<TableRow>
									<TableCell colSpan={6}>
										<div className='flex justify-center items-center py-4'>
											<span>Ocorreu um erro, tente novamente mais tarde.</span>
											<span>{error.message}</span>
										</div>
									</TableCell>
								</TableRow>
							) : isPending ? (
								<TableRow>
									<TableCell colSpan={6}>
										<div className="flex justify-center items-center py-8">
											<Loader2 className="h-6 w-6 animate-spin text-[#89131D]" />
										</div>
									</TableCell>
								</TableRow>
							) : products.length == 0 ? (
								<TableRow>
									<TableCell colSpan={6}>
										<div className='flex justify-center items-center py-8'>
											<span>Nenhum dado disponível</span>
										</div>
									</TableCell>
								</TableRow>
							) : filteredProducts.length > 0 ? (
								filteredProducts.map(product =>
									<TableRow key={product.id}>
										<TableCell className="text-left">{product.dsProduto}</TableCell>
										<TableCell className="text-left">{product.dsCategoria}</TableCell>
										<TableCell className="text-left">{formatDate(new Date(product.dtCadastro!))}</TableCell>
										<TableCell className="text-left">{product.cdProduto}</TableCell>
										<TableCell className="text-left">{product.vlProduto}</TableCell>
										<TableCell className="flex gap-2 justify-center">
											<Badge
												onClick={() => {
												}}
												className="bg-[#492DE7] rounded-full hover:bg-[#492DE7]/80 cursor-pointer"
											>
												Editar
											</Badge>
											<Badge
												onClick={() => deleteProductFn(product.id!)}
												className="bg-[#E72D2D] rounded-full cursor-pointer"
												variant={'destructive'}
											>
												Excluir
											</Badge>
										</TableCell>
									</TableRow>
								)
							) : (
								products.map(product =>
									<TableRow key={product.id}>
										<TableCell className="text-left">{product.dsProduto}</TableCell>
										<TableCell className="text-left">{product.dsCategoria}</TableCell>
										<TableCell className="text-left">{formatDate(new Date(product.dtCadastro!))}</TableCell>
										<TableCell className="text-left">{product.cdProduto}</TableCell>
										<TableCell className="text-left">{product.vlProduto}</TableCell>
										<TableCell className="flex gap-2 justify-center">
											<Badge
												onClick={() => {
												}}
												className="bg-[#492DE7] rounded-full hover:bg-[#492DE7]/80 cursor-pointer"
											>
												Editar
											</Badge>
											<Badge
												onClick={() => deleteProductFn(product.id!)}
												className="bg-[#E72D2D] rounded-full cursor-pointer"
												variant={'destructive'}
											>
												Excluir
											</Badge>
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</div>
				<p className="text-right text-gray-500 text-sm mt-2">Última atualização: 26 Fev 2024 10:45 AM</p>
			</section>
		</section>
	)
}