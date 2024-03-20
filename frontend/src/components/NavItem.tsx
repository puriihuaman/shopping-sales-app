import { NavLink } from 'react-router-dom';
import { IconSvg } from './IconSvg';

export const NavItem = ({
	path = '/',
	title,
	iconID,
}: {
	path?: string;
	title: string;
	iconID: string;
}) => {
	return (
		<li className="border-b text-slate-500 border-slate-300 cursor-pointer hover:text-slate-700 hover:bg-slate-300 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 dark:border-slate-800 transition-colors duration-300">
			<NavLink
				to={path}
				className={({ isActive }: { isActive: boolean }): string => {
					return `flex items-center flex-wrap gap-2 p-4 ${
						isActive ? 'text-purple-500' : ''
					}`;
				}}
			>
				<IconSvg iconID={iconID} />
				<span className="block text-sm whitespace-nowrap md:text-base">
					{title}
				</span>
			</NavLink>
		</li>
	);
};
