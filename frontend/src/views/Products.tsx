import { useEffect, useState } from 'react';

interface Product {
	id: number;
	name: string;
	stock: number;
	price: number;
}

const productList: Array<Product> = [
	{ id: 1, name: 'Apple MacBook Pro 17"', stock: 10, price: 3500 },
	{ id: 2, name: 'Teclado Gamer', stock: 50, price: 800 },
	{ id: 3, name: 'Magic Mouse 2', stock: 20, price: 1500 },
	{ id: 4, name: 'Auriculares', stock: 5, price: 2800 },
];

export const Products = () => {
	const [products, setProducts] = useState<Product[]>(productList);
	const [sortingDirection, setSortingDirection] = useState<string>('ASC');

	const handleSortStock = ({ sortBy }: { sortBy: string }): void => {
		if (sortBy.toLowerCase() === 'price') {
			sortStock();
		} else if (sortBy.toLowerCase() === 'name') {
			sortName();
		}
	};

	const sortStock = (): void => {
		let orderedProducts: Product[] = [];

		if (sortingDirection.toUpperCase() === 'ASC') {
			orderedProducts = products.sort(
				(a: Product, b: Product): number => a.price - b.price
			);
		} else {
			orderedProducts = products.sort(
				(a: Product, b: Product): number => b.price - a.price
			);
			setSortingDirection('ASC');
		}

		setProducts((): Product[] => orderedProducts);
	};

	const sortName = () => {
		let orderedProducts: Product[] = [];

		if (sortingDirection.toUpperCase() === 'ASC') {
			orderedProducts = products.sort((a: Product, b: Product): number =>
				a.name.localeCompare(b.name)
			);
			setSortingDirection('DESC');
		} else if (sortingDirection.toUpperCase() === 'DESC') {
			orderedProducts = products.sort((a: Product, b: Product): number =>
				b.name.localeCompare(a.name)
			);
			setSortingDirection('');
		} else {
			orderedProducts = products.sort((a: Product, b: Product) => a.id - b.id);
			setSortingDirection('ASC');
		}

		setProducts((): Product[] => orderedProducts);
	};

	useEffect(() => {
		// sortStock();
		// return () => {    }
	}, [products]);

	return (
		<main className="flex-1 min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
			<header className="text-center py-8">
				<h1 className="text-xl md:text-2xl lg:text-3xl font-heading">
					Lista de Productos
				</h1>
			</header>

			<div className="px-4">
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-slate-50 bg-slate-800">
						<thead className="text-xs uppercase text-slate-100 bg-purple-800">
							<tr>
								<th scope="col" className="px-6 py-3">
									CÓDIGO
								</th>
								<th scope="col" className="px-6 py-3">
									<div className="flex items-center">
										NOMBRE
										<button
											onClick={(): void => handleSortStock({ sortBy: 'name' })}
										>
											<svg
												className="w-3 h-3 ms-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</button>
									</div>
								</th>
								<th scope="col" className="px-6 py-3">
									<div className="flex items-center">
										STOCK
										<a href="#">
											<svg
												className="w-3 h-3 ms-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</a>
									</div>
								</th>
								<th scope="col" className="px-6 py-3">
									<div className="flex items-center">
										PRECIO
										<button
											onClick={(): void => handleSortStock({ sortBy: 'price' })}
										>
											<svg
												className="w-3 h-3 ms-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</button>
										{/* <a href="#" onClick={handleSortStock}>
											<svg
												className="w-3 h-3 ms-1.5"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
											</svg>
										</a> */}
									</div>
								</th>
								{/* <th scope="col" className="px-6 py-3">
									<span className="sr-only">Edit</span>
								</th> */}
							</tr>
						</thead>

						<tbody>
							{products.map((product: Product) => (
								<tr
									key={product.id}
									className="bg-whiteS border-b border-slate-700 last:border-none hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-9000 whitespace-nowrap dark:text-white"
									>
										{product.id}
									</th>
									<td className="px-6 py-4 whitespace-nowrap">
										{product.name}
									</td>
									<td className="px-6 py-4">{product.stock}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										S/. {product.price.toFixed(2)}
									</td>
								</tr>
							))}

							{/* <tr className="bg-white dark:bg-gray-800">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Magic Mouse 2
								</th>
								<td className="px-6 py-4">Black</td>
								<td className="px-6 py-4">Accessories</td>
								<td className="px-6 py-4">$99</td>
								<td className="px-6 py-4 text-right">
									<a
										href="#"
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									>
										Edit
									</a>
								</td>
							</tr> */}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
};
