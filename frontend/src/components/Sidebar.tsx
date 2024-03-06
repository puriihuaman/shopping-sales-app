import { NavItem } from './NavItem';

export const Sidebar = () => {
	return (
		<aside className="w-full max-w-64 min-h-screen bg-slate-900 text-slate-300">
			<div className="bg-slate-900 py-4 flex justify-center items-center border-b border-slate-900">
				<img
					src="/assets/images/logo.png"
					alt="Logo"
					className="w-14 h-14 invert"
				/>
			</div>

			<nav className="py-8">
				<ul className="flex flex-col gap-2">
					<NavItem path="/compras" title="Compras" iconID="shopping-basket" />
					<NavItem path="/ventas" title="Ventas" iconID="tag" />
					<NavItem
						path="/lista-compras"
						title="Lista de compras"
						iconID="bar-chart"
					/>
					<NavItem
						path="/lista-ventas"
						title="Lista de ventas"
						iconID="pie-chart"
					/>
					<NavItem path="/productos" title="Productos" iconID="package" />
				</ul>
			</nav>
		</aside>
	);
};
