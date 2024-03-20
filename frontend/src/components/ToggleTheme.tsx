import { useEffect, useState } from 'react';

const KEY_THEME = 'COLOR_THEME';
const THEME_MODE = {
	DARK_MODE: 'dark',
	LIGHT_MODE: 'light',
};

const ToggleTheme = () => {
	const [darkMode, setDarkMode] = useState(THEME_MODE.LIGHT_MODE);

	const changeTheme = () => {
		// if set via local storage previously
		if (localStorage.getItem(KEY_THEME)) {
			if (localStorage.getItem(KEY_THEME) === THEME_MODE.LIGHT_MODE) {
				document.documentElement.classList.add(THEME_MODE.DARK_MODE);
				localStorage.setItem(KEY_THEME, THEME_MODE.DARK_MODE);
				setDarkMode(THEME_MODE.DARK_MODE);
			} else {
				document.documentElement.classList.remove(THEME_MODE.DARK_MODE);
				localStorage.setItem(KEY_THEME, THEME_MODE.LIGHT_MODE);
				setDarkMode(THEME_MODE.LIGHT_MODE);
			}

			// if NOT set via local storage previously
		} else {
			if (document.documentElement.classList.contains(THEME_MODE.DARK_MODE)) {
				document.documentElement.classList.remove(THEME_MODE.DARK_MODE);
				localStorage.setItem(KEY_THEME, THEME_MODE.LIGHT_MODE);
			} else {
				document.documentElement.classList.add(THEME_MODE.DARK_MODE);
				localStorage.setItem(KEY_THEME, THEME_MODE.DARK_MODE);
			}
		}
	};

	const handleChangeTheme = () => {
		if (darkMode === THEME_MODE.LIGHT_MODE) {
			setDarkMode(THEME_MODE.DARK_MODE);
		} else {
			setDarkMode(THEME_MODE.LIGHT_MODE);
		}

		changeTheme();
	};

	useEffect(() => {
		changeTheme();

		return () => {};
	}, []);

	return (
		<label
			className="inline-flex items-center cursor-pointer select-none"
			onClick={handleChangeTheme}
		>
			<input
				type="checkbox"
				value={darkMode === THEME_MODE.LIGHT_MODE ? 'false' : 'true'}
				className="sr-only pointer-events-none"
				defaultChecked={darkMode === THEME_MODE.LIGHT_MODE ? false : true}
				onChange={handleChangeTheme}
			/>
			<div
				className={`relative w-11 h-6 bg-slate-200 rounded-full active:ring-4 ring-current dark:ring-purple-500 after:content-[''] after:absolute after:h-5 after:w-5 after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:transition-all dark:bg-purple-700 dark:border-purple-600 dark:after:bg-purple-50 dark:after:border-purple-100 select-none transition-all duration-300 ${
					darkMode === THEME_MODE.LIGHT_MODE
						? 'after:-translate-x-0'
						: 'after:translate-x-full'
				}`}
			></div>

			<span className="ms-3 text-sm font-medium text-slate-500 dark:text-slate-500 select-none">
				{darkMode === THEME_MODE.LIGHT_MODE ? 'Modo oscuro' : 'Modo claro'}
			</span>
		</label>
	);
};

export default ToggleTheme;
