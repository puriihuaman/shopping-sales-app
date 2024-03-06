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
		<li className="border-b border-slate-800 cursor-pointer hover:bg-slate-950 transition-colors duration-300">
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
