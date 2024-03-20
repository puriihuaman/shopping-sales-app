import { NavItem } from './NavItem';
import ToggleTheme from './ToggleTheme';

export const Sidebar = () => {
	return (
		<aside className="flex flex-col w-full max-w-64 min-h-screen text-slate-800 bg-slate-100 dark:bg-slate-900 dark:text-slate-300 transition-colors duration-300">
			<div className="py-4 flex justify-center items-center border-b border-slate-300 dark:border-slate-800 transition-colors duration-300">
				<img
					src="/assets/images/logo.png"
					alt="Logo"
					className="w-14 h-14 dark:invert"
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

			<div className="flex justify-center mt-auto mb-10">
				<ToggleTheme />
			</div>
		</aside>
	);
};
