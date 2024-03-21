import { useEffect, useState } from 'react';

interface Shopping {
	idShopping: string;
	date: string;
	provider: string;
	product: string;
	amount: number;
	purchaseValue: number;
}
const shoppingLists: Shopping[] = [
	{
		idShopping: crypto.randomUUID(),
		date: '28/04/2024',
		provider: 'Apple',
		product: 'Apple MacBook Pro 17"',
		amount: 10,
		purchaseValue: 3500,
	},
	{
		idShopping: crypto.randomUUID(),
		date: '18/02/2022',
		provider: 'LG',
		product: 'Magic Mouse 2',
		amount: 20,
		purchaseValue: 1500,
	},
];

export const ShoppingList = () => {
	const [totalToPay, setTotalToPay] = useState(0);
	const [amount, setAmount] = useState(0);

	const getTotalToPay = () => {
		const amou = shoppingLists.reduce(
			(acu: number, current: Shopping): number => acu + current.amount,
			0
		);

		const total = shoppingLists.reduce(
			(acu: number, current: Shopping): number => acu + current.purchaseValue,
			0
		);

		setAmount(amou);
		setTotalToPay(total);
	};

	useEffect(() => {
		getTotalToPay();

		return () => {};
	}, []);

	return (
		<main className="flex-1 min-h-screen text-slate-800 bg-slate-50 overflow-hidden dark:text-slate-50 dark:bg-slate-950 transition-colors duration-300">
			<header className="text-center py-8">
				<h1 className="text-xl md:text-2xl lg:text-3xl font-heading">
					Lista de compras
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
									FECHA
								</th>
								<th scope="col" className="px-6 py-3">
									PROVEEDOR
								</th>
								<th scope="col" className="px-6 py-3">
									PRODUCTO
								</th>

								<th scope="col" className="px-6 py-3">
									CANTIDAD
								</th>

								<th scope="col" className="px-6 py-3">
									VALOR
								</th>
								{/* <th scope="col" className="px-6 py-3">
									<span className="sr-only">Edit</span>
								</th> */}
							</tr>
						</thead>

						<tbody>
							{shoppingLists.map((product: Shopping) => (
								<tr
									key={product.idShopping}
									className="bg-slate-100 border-b border-slate-300 hover:text-purple-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors duration-300"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-current whitespace-nowrap hover:text-current"
									>
										{product.idShopping}
									</th>
									<td className="px-6 py-4 whitespace-nowrap">
										{product.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{product.provider}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{product.product}
									</td>
									<td className="px-6 py-4">{product.amount}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										S/. {product.purchaseValue.toFixed(2)}
									</td>
								</tr>
							))}

							{/* <tr className="bg-white dark:bg-slate-800">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white"
								>
									Magic Mouse 2
								</th>
								<td className="px-6 py-4">Black</td>
								<td className="px-6 py-4">Accessories</td>
								<td className="px-6 py-4">$99</td>
								<td className="px-6 py-4 text-right">
									<a
										href="#"
										className="font-medium text-purple-600 dark:text-purple-500 hover:underline"
									>
										Edit
									</a>
								</td>
							</tr> */}
						</tbody>

						<tfoot>
							<tr className="font-semibold text-slate-600 bg-slate-100 dark:text-current dark:bg-slate-900 transition-colors duration-300">
								<th
									scope="row"
									className="px-6 py-3 text-base text-right"
									colSpan={4}
								>
									Total
								</th>
								<td className="px-6 py-3">{amount}</td>
								<td className="px-6 py-3 whitespace-nowrap">
									S/. {totalToPay.toFixed(2)}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>

				<nav
					className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
					aria-label="Table navigation"
				>
					<span className="text-sm font-normal text-slate-500 dark:text-slate-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
						Showing{' '}
						<span className="font-semibold text-slate-800 dark:text-white transition-colors duration-300">
							1 - 10
						</span>{' '}
						of
						<span className="font-semibold text-slate-800 dark:text-white transition-colors duration-300">
							{' '}
							1000
						</span>
					</span>

					<ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
						<li>
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-s-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-300"
							>
								Previous
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-300"
							>
								1
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-300"
							>
								2
							</a>
						</li>
						<li>
							<a
								href="#"
								aria-current="page"
								className="flex items-center justify-center px-3 h-8 text-purple-600 border border-slate-300 bg-purple-50 hover:bg-purple-100 hover:text-purple-700 dark:border-slate-700 dark:bg-slate-700 dark:text-white transition-colors duration-300"
							>
								3
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-300"
							>
								4
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-300"
							>
								5
							</a>
						</li>
						<li>
							<a
								href="#"
								className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-300 rounded-e-lg hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors duration-300"
							>
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</main>
	);
};
