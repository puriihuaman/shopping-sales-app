import { IconSvg } from '@components/IconSvg';
import { useState, type ChangeEvent } from 'react';
import style from './Login.module.scss';

const userInitial = {
	username: 'puriihuaman',
	password: '1998pvri',
};

export const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

	const handleShowPassword = (): void => setShowPassword(!showPassword);

	const handleGetData = (target: EventTarget & HTMLInputElement): void => {
		setUser({
			...user,
			[target.name]: target.value,
		});
	};

	const handleLogin = (): void => {
		const { username, password } = user;

		if (!username.trim() || !password.trim()) {
			console.log('Complete los campos');
			return;
		}

		if (
			username.trim() !== userInitial.username ||
			password.trim() !== userInitial.password
		) {
			console.log('El usuario o contraseña son incorrectas');
		} else {
			console.log('Bienvenido');
			// + Retornar al home
		}
	};

	return (
		<main className={style.main}>
			<section className={style['login-container']}>
				<div className={style['login-container--left']}>
					<img
						src="/segment_analysis.svg"
						alt="Segment analysis"
						className={style['banner-image']}
					/>
				</div>

				<div className={style['login-container--right']}>
					<div className={style['login-right-content']}>
						<div className={style['login-logo-container']}>
							<img src="/logo.png" alt="" className={style['login-logo']} />
						</div>

						<div className={style['login-center-content']}>
							<h1 className={style['login-title']}>Iniciar Sesión</h1>

							<p className={style['login-description']}>
								¡Por favor ingresa tus datos!
							</p>

							<form
								action=""
								className={style['login-form']}
								autoComplete="off"
							>
								<fieldset className={style['login-fieldset']}>
									<label htmlFor="username" className={style['login-label']}>
										usuario
									</label>
									<input
										type="text"
										id="username"
										name="username"
										className={style['login-input']}
										autoFocus
										placeholder="Usuario"
										value={user.username}
										onChange={({
											target,
										}: ChangeEvent<HTMLInputElement>): void =>
											handleGetData(target)
										}
									/>
								</fieldset>

								<fieldset
									className={`${style['login-fieldset']} ${style['login-fieldset-pass']}`}
								>
									<label htmlFor="password" className={style['login-label']}>
										Contraseña
									</label>
									<input
										type={showPassword ? 'text' : 'password'}
										id="password"
										name="password"
										className={style['login-input']}
										placeholder="Contraseña"
										value={user.password}
										onChange={({
											target,
										}: ChangeEvent<HTMLInputElement>): void =>
											handleGetData(target)
										}
									/>

									<span
										className={style['login-show-password']}
										onClick={handleShowPassword}
									>
										<IconSvg iconID="eye" />
									</span>
								</fieldset>

								<fieldset
									className={`${style['login-fieldset']} ${style['login-fieldset-pass-recovery']}`}
								>
									<a href="#" className={style['login-pass-recovery-link']}>
										¿Has olvidado tu contraseña?
									</a>
								</fieldset>

								<fieldset
									className={`${style['login-fieldset']} ${style['login-fieldset-btns']}`}
								>
									<button
										type="button"
										className={`${style.loginBtn} ${style.btnLogin}`}
										onClick={handleLogin}
									>
										Ingresar
									</button>

									<button
										type="button"
										className={`${style.loginBtn} ${style.btnGoogle}`}
									>
										Iniciar sesión con Google
									</button>
								</fieldset>
							</form>
						</div>

						<p className={style['login-register']}>
							¿No tienes una cuenta? &nbsp;
							<a href="#" className={style['login-register-link']}>
								Regístrate
							</a>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};
