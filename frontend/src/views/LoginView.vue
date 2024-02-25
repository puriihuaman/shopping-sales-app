<template>
	<main class="main">
		<section class="login-container">
			<div class="login-container__left">
				<img
					src="/segment_analysis.svg"
					alt="segment analysis"
					class="banner-image"
				/>
			</div>

			<div class="login-container__right">
				<div class="login-right-content">
					<div class="login-logo-container">
						<img src="/logo.png" alt="" class="login-logo" />
						<!-- <img src="{Logo}" alt="" /> -->
					</div>

					<div class="login-center-content">
						<h1 class="login-title">Iniciar Sesión</h1>
						<p class="login-description">¡Por favor ingresa tus datos!</p>
						<!-- <p class="description">Please enter your details</p> -->

						<form action="" class="login-form" autocomplete="off">
							<fieldset class="login-fieldset">
								<label for="user" class="login-label">usuario</label>
								<input
									type="text"
									id="user"
									class="login-input"
									autofocus
									placeholder="Usuario"
									v-model="user.username"
								/>
							</fieldset>

							<fieldset class="login-fieldset login-fieldset-pass">
								<label for="password" class="login-label">Contraseña</label>
								<input
									:type="showPassword ? 'text' : 'password'"
									id="password"
									class="login-input"
									placeholder="Contraseña"
									v-model="user.password"
								/>

								<span class="login-show-password" @click="handleShowPassword">
									<IconSvg icon-i-d="eye" />
								</span>
							</fieldset>

							<fieldset class="login-fieldset login-fieldset-pass-recovery">
								<!-- <div class="remember-div">
									<input type="checkbox" id="remember-checkbox" />
									<label for="remember-checkbox" class="label">
										Remember for 30 days
									</label>
								</div> -->

								<a href="#" class="login-pass-recovery-link">
									¿Has olvidado tu contraseña?
								</a>
								<!-- <a href="#" class="forgot-pass-link"> Forgot password? </a> -->
							</fieldset>

							<fieldset class="login-fieldset login-fieldset-btns">
								<button
									type="button"
									class="login-btn btn-login"
									@click="handleLogin"
								>
									Ingresar
								</button>

								<button type="button" class="login-btn btn-google">
									Iniciar sesión con Google
								</button>
								<!-- <button type="button" class="button button--google">
									Log In with Google
								</button> -->
							</fieldset>
						</form>
					</div>

					<p class="login-register">
						¿No tienes una cuenta?
						<a href="#" class="login-register-link">Regístrate</a>
					</p>
					<!-- 
					<p class="register">
						Don't have an account?
						<a href="#" class="register--link">Sign Up</a>
					</p> -->
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import IconSvg from '@/components/icons/IconSvg.vue';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPassword: Ref<boolean> = ref<boolean>(false);

const userInitial = {
	username: 'puriihuaman',
	password: '1998pvri',
};

const user: Ref<{ username: string; password: string }> = ref<{
	username: string;
	password: string;
}>({
	username: '',
	password: '',
});

const handleShowPassword = (): boolean =>
	(showPassword.value = !showPassword.value);

const handleLogin = () => {
	const { username, password } = user.value;

	if (!username.trim() || !password.trim()) {
		console.log('Complete los campos');
		return;
	}

	if (
		username.trim() !== userInitial.username ||
		password.trim() !== userInitial.password
	) {
		console.log('El usuario o contraseña son incorrectos');
	} else {
		console.log('Bienvenido');
		router.push({ path: '/' });
	}
};
</script>

<style scoped lang="scss">
.main {
	@apply bg-slate-950  text-slate-50;
}
.login-container {
	@apply flex;

	&__left,
	&__right {
		@apply flex-grow min-h-screen;
	}

	&__left {
		@apply flex justify-center items-center max-lg:hidden bg-gradient-to-t from-slate-950 to-purple-800;
	}

	&__right {
		@apply relative z-10 overflow-hidden bg-transparent text-slate-50 after:content-[''] after:absolute after:top-0 after:left-0 after:-z-10 after:w-full after:h-full after:bg-gradient-to-r from-slate-950 to-slate-900 after:-skew-y-12;
	}
}
.banner-image {
	@apply w-[400px];
}
.login-right-content {
	@apply h-full w-[80%] mx-auto flex flex-col justify-center;
}
.login-logo-container {
	@apply self-center pt-14;
}
.login-logo {
	@apply w-14;
	filter: invert(1);
}
.login-center-content {
	@apply text-center;
}
.login-title {
	@apply text-5xl font-heading font-bold mb-3 md:text-6xl;
}
.login-description {
	@apply text-xl mb-10 md:text-2xl text-slate-400;
}
.login-form {
	@apply flex flex-col;
}
.login-fieldset {
	@apply relative mb-4;
}
.login-fieldset-pass {
	@apply relative;
}
.login-fieldset-pass-recovery {
	@apply text-center text-base text-slate-400 py-2;
}
.login-pass-recovery-link {
	@apply no-underline hover:underline;
}
.login-fieldset-btns {
	@apply flex flex-col gap-y-4;
}
.login-label {
	@apply block hidden text-left ml-4 mb-2 capitalize opacity-50;
}
.login-input {
	@apply w-full p-3.5 text-center border-2 border-slate-800 outline-none rounded-xl bg-slate-900 placeholder:opacity-80 placeholder:text-center focus:border-purple-500 active:border-purple-500;
}
.login-btn {
	@apply w-full flex justify-center items-center p-3.5 text-base border-2 cursor-pointer rounded-xl;
}
.btn-login {
	@apply bg-purple-500 text-slate-50 border-purple-500 hover:text-purple-500 hover:bg-transparent hover:border-current transition-colors duration-300;
}
.btn-google {
	@apply bg-slate-900 gap-x-2 border-slate-900 hover:bg-slate-800 hover:border-slate-800 transition-colors duration-300;
}
.login-register {
	@apply text-center text-base py-10;
}
.login-register-link {
	@apply text-purple-500 no-underline font-semibold hover:underline;
}
.login-show-password {
	@apply absolute top-[50%] right-4 translate-y-[-50%] w-8 h-8 flex justify-center items-center text-slate-400 cursor-pointer select-none hover:text-slate-50 transition-colors duration-300;
}
</style>
