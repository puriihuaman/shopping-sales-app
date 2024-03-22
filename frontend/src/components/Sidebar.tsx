import { IconSvg } from './IconSvg';
import { NavItem } from './NavItem';
import ToggleTheme from './ToggleTheme';

export const Sidebar = ({
	isShowSidebar,
	handleShowSidebar,
}: {
	isShowSidebar: boolean;
	handleShowSidebar: () => void;
}) => {
	return (
		<aside className="flex flex-col w-full h-full max-w-64 text-slate-800 bg-slate-100 dark:bg-slate-900 dark:text-slate-300 transition-colors duration-300">
			<nav className="py-8">
				<ul className="flex flex-col gap-2">
					<NavItem path="/perfiles" title="Perfiles" iconID="users-round" />
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

			<div className="flex justify-center mt-auto ">
				<button
					onClick={handleShowSidebar}
					className="p-2 rounded-md shadow mb-2 text-slate-600 bg-slate-200 hover:text-purple-500 dark:text-slate-400 dark:bg-slate-800 dark:hover:text-purple-500 transition-colors duration-300"
				>
					<IconSvg
						iconID={`${isShowSidebar ? 'panel-right-open' : 'panel-left-open'}`}
					/>
				</button>
			</div>

			<div
				className={`flex justify-center mb-10 ${
					isShowSidebar ? 'visible' : 'invisible'
				}`}
			>
				<ToggleTheme />
			</div>
		</aside>
	);
};
