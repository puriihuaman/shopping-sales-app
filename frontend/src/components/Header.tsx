import { useState } from 'react';
import { IconSvg } from './IconSvg';

export const Header = ({ isShowSidebar }: { isShowSidebar: boolean }) => {
	const [showConfig, setShowConfig] = useState(false);

	const handleShowConfig = () => {
		setShowConfig(!showConfig);
	};

	return (
		<header className="row-span-1 col-span-2 relative flex justify-between items-center text-slate-800 bg-slate-50 border-b border-slate-300 shadow dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
			<div
				className={`flex justify-center items-center transition-all duration-300 ${
					isShowSidebar ? 'w-64' : 'w-[50px]'
				}`}
			>
				<img
					src="/assets/images/logo.png"
					alt="Logo"
					className={`dark:invert ${isShowSidebar ? 'w-14 h-14' : 'w-8 h-8'}`}
				/>
			</div>

			<div className="mr-auto text-xs md:text-base">Lista de productos</div>

			<button
				id="dropdownAvatarNameButton"
				data-dropdown-toggle="dropdownAvatarName"
				className="flex justify-between items-center gap-x-2 px-2 text-sm font-medium text-current rounded-full hover:text-purple-600 dark:hover:text-purple-500 dark:text-current md:me-0"
				type="button"
				onClick={handleShowConfig}
			>
				<span className="sr-only">Open user menu</span>
				<div className="w-10 h-10 flex justify-center items-center bg-slate-200 border-2 border-slate-300 rounded-full select-none dark:bg-slate-900 dark:border-slate-800">
					<img
						className="w-7 h-7 dark:invert"
						src="/assets/images/logo.png"
						alt="user photo"
					/>
				</div>
				<span className="text-nowrap text-xs md:text-base">Bonnie Green</span>
				<IconSvg iconID="chevron-down" iconSize="sm" />
			</button>

			<div
				id="dropdownAvatarName"
				className={`absolute right-4 z-10 bg-slate-200 divide-y divide-slate-300 rounded-lg shadow w-44 dark:bg-slate-800 dark:divide-slate-700 origin-center transition-all duration-300 ${
					showConfig
						? 'translate-y-40 scale-100 visible opacity-1'
						: 'scale-0 invisible opacity-0'
				}`}
			>
				<div className="px-4 py-3 text-sm text-current">
					<div className="font-medium ">Pro User</div>
					<div className="truncate">name@flowbite.com</div>
				</div>

				<ul
					className="py-2 text-sm text-current transition-colors duration-300"
					aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
				>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
						>
							Earnings
						</a>
					</li>
				</ul>

				<div className="py-2">
					<a
						href="#"
						className="block px-4 py-2 text-sm text-current hover:bg-slate-100 dark:hover:bg-slate-900"
					>
						Sign out
					</a>
				</div>
			</div>
		</header>
	);
};
