import { useEffect, useState } from 'react';

enum OrderTerm {
	NAME = 'NAME',
	PRICE = 'PRICE',
	STOCK = 'STOCK',
}
enum Direction {
	'ASC' = 'ASC',
	'DESC' = 'DESC',
	'NORMAL' = 'NORMAL',
}

interface Product {
	id: string;
	name: string;
	stock: number;
	price: number;
}

const productList: Array<Product> = [
	{
		id: crypto.randomUUID(),
		name: 'Apple MacBook Pro 17"',
		stock: 10,
		price: 3500,
	},
	{ id: crypto.randomUUID(), name: 'Teclado Gamer', stock: 50, price: 800 },
	{ id: crypto.randomUUID(), name: 'Magic Mouse 2', stock: 20, price: 1500 },
	{ id: crypto.randomUUID(), name: 'Auriculares', stock: 5, price: 2800 },
];

export const Products = () => {
	const [products, setProducts] = useState<Product[]>(productList);
	const [sortingDirection, setSortingDirection] = useState<string>(
		Direction.NORMAL
	);

	const handleSorting = ({ sortBy }: { sortBy: string }): void => {
		if (sortBy === OrderTerm.STOCK) {
			sortByStock();
		} else if (sortBy === OrderTerm.NAME) {
			sortByName();
		} else if (sortBy === OrderTerm.PRICE) {
			sortByPrice();
		}
	};

	const sortByName = (): void => {
		let orderedProducts: Product[] = [];

		if (sortingDirection === Direction.NORMAL) {
			console.log('ASC');

			orderedProducts = products.sort((a: Product, b: Product): number =>
				a.name.localeCompare(b.name)
			);

			setSortingDirection(Direction.ASC);
		} else if (sortingDirection === Direction.ASC) {
			console.log('DESC');
			orderedProducts = products.sort((a: Product, b: Product): number =>
				b.name.localeCompare(a.name)
			);

			setSortingDirection(Direction.DESC);
		} else {
			console.log('NORMAL');
			orderedProducts = [...productList];
			setSortingDirection(Direction.NORMAL);
		}

		// if (sortingDirection === Direction.NORMAL) {
		// 	orderedProducts = products.sort((a: Product, b: Product): number =>
		// 		a.name.localeCompare(b.name)
		// 	);
		// 	setSortingDirection(Direction.ASC);
		// } else if (sortingDirection === Direction.ASC) {
		// 	orderedProducts = products.sort((a: Product, b: Product): number =>
		// 		b.name.localeCompare(a.name)
		// 	);
		// 	setSortingDirection(Direction.DESC);
		// } else {
		// 	// orderedProducts = products.sort((a: Product, b: Product): number =>
		// 	// 	a.id.localeCompare(b.id)
		// 	// );
		// 	console.log(productList);

		// 	orderedProducts = products;
		// 	setSortingDirection(Direction.NORMAL);
		// }

		setProducts((): Product[] => orderedProducts);
	};

	const sortByStock = (): void => {
		let orderedProducts: Product[] = [];

		if (sortingDirection === Direction.NORMAL) {
			orderedProducts = products.sort(
				(a: Product, b: Product): number => a.stock - b.stock
			);

			setSortingDirection(Direction.ASC);
		} else if (sortingDirection === Direction.ASC) {
			orderedProducts = products.sort(
				(a: Product, b: Product): number => b.stock - a.stock
			);

			setSortingDirection(Direction.DESC);
		}

		// else {
		// 	orderedProducts = products.sort(
		// 		(a: Product, b: Product): number => a.id - b.id
		// 	);

		// 	setSortingDirection(Direction.NORMAL);
		// }

		setProducts((): Product[] => orderedProducts);
	};

	const sortByPrice = (): void => {
		let orderedProducts: Product[] = [];

		if (sortingDirection === Direction.NORMAL) {
			orderedProducts = products.sort(
				(a: Product, b: Product): number => a.price - b.price
			);

			setSortingDirection(Direction.ASC);
		} else if (sortingDirection === Direction.ASC) {
			orderedProducts = products.sort(
				(a: Product, b: Product): number => b.price - a.price
			);
			setSortingDirection(Direction.DESC);
		}

		// else {
		// 	orderedProducts = products.sort(
		// 		(a: Product, b: Product): number => a.id - b.id
		// 	);

		// 	setSortingDirection(Direction.NORMAL);
		// }

		setProducts((): Product[] => orderedProducts);
	};

	useEffect(() => {
		// sortStock();
		// return () => {    }
	}, [products]);

	return (
		<main className="flex-1 min-h-screen text-slate-800 bg-slate-50 overflow-hidden dark:text-slate-50 dark:bg-slate-950 transition-colors duration-300">
			<header className="text-center py-8">
				<h1 className="text-xl md:text-2xl lg:text-3xl font-heading">
					Lista de Productos
				</h1>
			</header>

			<div className="px-4">
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-slate-600 bg-slate-100 dark:text-current dark:bg-slate-900 transition-colors duration-300">
						<thead className="text-xs uppercase text-slate-100 bg-purple-800">
							<tr>
								<th scope="col" className="px-6 py-3">
									CÓDIGO
								</th>
								<th scope="col" className="px-6 py-3">
									<div className="flex items-center">
										NOMBRE
										<button
											onClick={(): void =>
												handleSorting({ sortBy: OrderTerm.NAME })
											}
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
										<button
											onClick={() => handleSorting({ sortBy: OrderTerm.STOCK })}
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
										PRECIO
										<button
											onClick={(): void =>
												handleSorting({ sortBy: OrderTerm.PRICE })
											}
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
									className="bg-whiteS border-b border-slate-300 last:border-none hover:text-purple-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors duration-300"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-current whitespace-nowrap hover:text-current"
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
