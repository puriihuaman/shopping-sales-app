import { IconSvg } from '@components/IconSvg';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const userInitial = {
	username: 'puriihuaman',
	password: '1998pvri',
};

export const LoginView = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({ username: '', password: '' });
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');

	const getValues = (target: EventTarget & HTMLInputElement): void => {
		setUser({
			...user,
			[target.name]: target.value,
		});
	};

	const handleShowPassword = (): void => setShowPassword(!showPassword);

	const handleLogin = (): void => {
		const { username, password } = user;

		if (!username.trim() || !password.trim()) {
			console.log('Complete los campos');
			setMessage('Complete los campos');
			setError(true);
		} else if (
			username.trim() !== userInitial.username ||
			password.trim() !== userInitial.password
		) {
			console.log('El usuario o contraseña son incorrectas');
			setMessage('El usuario o contraseña son incorrectas');
			setError(true);
		} else {
			console.log('Bienvenido');
			setMessage('Bienvenido');
			setError(false);

			// + Redirigir al dashboard o home
			// router.push({ path: '/' });

			navigate('/home');
		}
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setError(false);
			setMessage('');
		}, 2500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<main className="bg-slate-950 text-slate-50">
			<section className="flex">
				<div className="flex-grow min-h-screen flex justify-center items-center max-lg:hidden bg-gradient-to-t from-slate-950 to-purple-800">
					<img
						src="/assets/images/segment_analysis.svg"
						alt="segment analysis"
						className="w-[400px]"
					/>
				</div>

				<div className="flex-grow min-h-screen relative z-10 overflow-hidden bg-transparent text-slate-50 after:content-[''] after:absolute after:top-0 after:left-0 after:-z-10 after:w-full after:h-full after:bg-gradient-to-r from-slate-950 to-slate-900/50 after:-skew-y-12">
					<div className="h-full w-[80%] mx-auto flex flex-col justify-center">
						<div className="self-center pt-14">
							<img
								src="/assets/images/logo.png"
								alt=""
								className="w-14 invert"
							/>
						</div>

						<div className="text-center">
							<h1 className="text-5xl font-heading font-bold mb-3 md:text-6xl">
								Iniciar Sesión
							</h1>
							<p className="text-xl mb-10 md:text-2xl text-slate-400">
								¡Por favor ingresa tus datos!
							</p>

							<form action="" className="flex flex-col" autoComplete="off">
								<fieldset className="mb-4">
									<label
										htmlFor="username"
										className="hidden text-left ml-4 mb-2 capitalize text-slate-300"
									>
										usuario
									</label>

									<input
										type="text"
										id="username"
										name="username"
										className="w-full p-3.5 text-center border-2 border-slate-800 outline-none rounded-xl bg-slate-900 placeholder:opacity-80 placeholder:text-center focus:border-purple-500 active:border-purple-500"
										autoFocus
										placeholder="Usuario"
										value={user.username}
										onChange={({
											target,
										}: ChangeEvent<HTMLInputElement>): void =>
											getValues(target)
										}
									/>
								</fieldset>

								<fieldset className="mb-4 relative">
									<label
										htmlFor="password"
										className="hidden text-left ml-4 mb-2 capitalize text-slate-300"
									>
										Contraseña
									</label>

									<input
										type={showPassword ? 'text' : 'password'}
										id="password"
										name="password"
										className="w-full p-3.5 text-center border-2 border-slate-800 outline-none rounded-xl bg-slate-900 placeholder:opacity-80 placeholder:text-center focus:border-purple-500 active:border-purple-500"
										placeholder="Contraseña"
										value={user.password}
										onChange={({
											target,
										}: ChangeEvent<HTMLInputElement>): void =>
											getValues(target)
										}
									/>

									<span
										className="absolute top-[50%] right-4 translate-y-[-50%] w-8 h-8 flex justify-center items-center text-slate-400 cursor-pointer select-none hover:text-slate-50 transition-colors duration-300"
										onClick={handleShowPassword}
									>
										<IconSvg iconID="eye" />
									</span>
								</fieldset>

								<fieldset className="mb-4 text-center text-base text-slate-400 py-2">
									<a href="#" className="no-underline hover:underline">
										¿Has olvidado tu contraseña?
									</a>
								</fieldset>

								<fieldset className="mb-4 flex flex-col gap-y-4">
									<button
										type="button"
										className="w-full flex justify-center items-center p-3.5 text-base border-2 cursor-pointer rounded-xl bg-purple-500 text-slate-50 border-purple-500 hover:bg-purple-600 hover:text-purple-50 hover:border-purple-600 transition-colors duration-300"
										onClick={handleLogin}
									>
										Ingresar
									</button>

									<button
										type="button"
										className="w-full flex justify-center items-center p-3.5 text-base border-2 cursor-pointer rounded-xl bg-slate-900 gap-x-2 border-slate-900 hover:bg-slate-800 hover:border-slate-800 transition-colors duration-300"
									>
										Iniciar sesión con Google
									</button>
								</fieldset>
							</form>

							{error && (
								<div
									className={`text-rose-400 bg-rose-500/15 border border-current py-3 rounded-xl transition-transform duration-1000 ${
										!error ? 'scale-0 text-xs' : 'scale-100 text-base'
									}`}
								>
									<p>{message}</p>
								</div>
							)}
						</div>

						<p className="text-center text-base py-10">
							¿No tienes una cuenta?
							<a
								href="#"
								className="text-purple-500 no-underline font-semibold hover:underline"
							>
								Regístrate
							</a>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};
