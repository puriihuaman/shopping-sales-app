export const Shopping = () => {
	return (
		<div className="flex-1 bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
			<header className="py-8">
				<h2 className="text-2xl font-heading text-center md:text-3xl lg:text-4xl">
					Compras
				</h2>
			</header>

			<section>
				<div className="p-4 max-w-[800px] mx-auto">
					<form
						action="#"
						className="p-6 bg-slate-50 rounded-lg mb-2 border border-slate-200 shadow dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300"
					>
						<fieldset className="flex items-center gap-4 px-2 py-4">
							<label
								htmlFor="provider"
								className="basis-24 block text-base font-medium"
							>
								Proveedor
							</label>
							<select
								name="provider"
								id="provider"
								className="flex-1 bg-slate-50 outline-none border border-slate-300 text-current text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-colors duration-300"
							>
								<option value="cliente-frecuente">Cliente Frecuente</option>
								<option value="cliente-frecuente">Cliente Frecuente</option>
							</select>
						</fieldset>

						<fieldset className="flex items-center gap-4 px-2 py-4">
							<label
								htmlFor="product"
								className="basis-24 block text-base font-medium"
							>
								Producto
							</label>
							<select
								name="product"
								id="product"
								className="flex-1 bg-slate-50 outline-none border border-slate-300 text-current text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-colors duration-300"
							>
								<option value="calentador">Calentador</option>
								<option value="calentador">Calentador</option>
							</select>
						</fieldset>

						<fieldset className="flex flex-wrap items-center gap-x-4 px-2 py-4">
							<label
								htmlFor="amount"
								className="basis-24 block text-base font-medium text-rose-500 dark:text-rose-500"
							>
								Cantidad
							</label>
							<input
								type="number"
								name="amount"
								id="amount"
								placeholder="0"
								defaultValue={0.0}
								className="flex-1 text-base outline-none bg-slate-50 border border-rose-500 text-rose-900 placeholder-rose-700 rounded-lg focus:ring-rose-500 dark:bg-slate-700 focus:border-rose-500 block w-full p-2.5 dark:text-rose-500 dark:placeholder-rose-500 dark:border-rose-500 transition-colors duration-300"
							/>

							<p className="w-full text-right mt-2 text-sm text-rose-600 dark:text-rose-500">
								<span className="font-medium">Oops!</span> Username already
								taken!
							</p>
						</fieldset>

						<fieldset className="flex flex-wrap items-center gap-x-4 px-2 py-4">
							<label
								htmlFor="value"
								className="basis-24 block text-base font-medium text-rose-500 dark:text-rose-500"
							>
								Valor
							</label>
							<input
								type="number"
								name="value"
								id="value"
								defaultValue={0.0}
								placeholder="0.00"
								className="flex-1 text-base outline-none bg-slate-50 border border-rose-500 text-rose-900 placeholder-rose-700 rounded-lg focus:ring-rose-500 dark:bg-slate-700 focus:border-rose-500 block w-full p-2.5 dark:text-rose-500 dark:placeholder-rose-500 dark:border-rose-500 transition-colors duration-300"
							/>
							<p className="w-full text-right mt-2 text-sm text-rose-600 dark:text-rose-500">
								<span className="font-medium">Oops!</span> Username already
								taken!
							</p>
						</fieldset>

						<fieldset className="flex items-center gap-4 px-2 py-4">
							<button
								type="submit"
								className="flex justify-center items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 transition-colors duration-300"
							>
								Comprar
							</button>
						</fieldset>
					</form>

					<hr className="border-none bg-rose-500 h-1 rounded-sm" />
				</div>
			</section>
		</div>
	);
};
