<template>
	<main class="main">
		<section class="content">
			<div class="left">
				<img src="/segment_analysis.svg" alt="segment analysis" class="image" />
			</div>

			<div class="right">
				<h1 class="title">Iniciar Sesión</h1>

				<form action="" class="form">
					<fieldset class="fieldset">
						<label for="user" class="label">usuario</label>
						<input type="text" id="user" class="input" autofocus />
					</fieldset>

					<fieldset class="fieldset">
						<label for="password" class="label">Contraseña</label>
						<input type="password" id="password" class="input" />
					</fieldset>

					<fieldset class="fieldset">
						<input type="submit" value="Ingresar" class="button" />
					</fieldset>
				</form>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
	@apply bg-slate-950  text-slate-50;
}

.content {
	// @apply relative w-full min-h-screen max-w-[900px] flex justify-center items-center gap-8 p-4 mx-auto;

	@apply relative w-full min-h-screen mx-auto grid grid-cols-1 md:grid-cols-2;

	// // position: relative;
	// // margin-left: auto;
	// // margin-right: auto;
	// // display: grid;
	// // grid-template-columns: 1fr 1fr;
	// // min-height: 100vh;
	// // width: 100%;
	// /* max-width: 900px; */
	// // align-items: center;
	// // justify-content: center;
	// /* gap: 2rem; */
	// /* padding: 1rem;*/
}
.left {
	// @apply absolute left-0 top-0 w-full h-full flex justify-center items-center md:relative;
	@apply absolute left-0 top-0 w-full h-full flex justify-center items-center px-8 md:relative bg-gradient-to-b from-purple-900/50 to-slate-950;

	// position: absolute;
	// left: 0px;
	// top: 0px;
	// display: flex;
	// height: 100%;
	// width: 100%;
	// align-items: center;
	// justify-content: center;
}
.image {
	@apply min-w-72 max-w-[400px];
}
.right {
	// @apply relative w-full h-full max-w-[400px] py-8 px-4;
	@apply relative w-full h-full min-h-screen py-8 px-4 flex flex-col justify-center items-center bg-gradient-to-b from-slate-900/80 to-slate-950/80;

	// position: relative;
	// height: 100%;
	// width: 100%;
	// /* max-width: 400px; */
	// padding-top: 2rem;
	// padding-bottom: 2rem;
	// padding-left: 1rem;
	// padding-right: 1rem;
	// min-height: 100vh;
	// background: #e91e6342;
	// display: flex;
	// flex-direction: column;
	// justify-content: center;
	// align-items: center;
}
.title {
	@apply mb-8 text-2xl font-bold text-center md:text-3xl;
}
.form {
	@apply p-6 bg-slate-900 shadow-md rounded-md min-w-[300px] max-w-[400px] lg:w-[500px] lg:p-10;
}

.fieldset {
	@apply flex flex-col gap-3 mb-4 last:mb-0;
}

.label {
	@apply block capitalize;
}

.input {
	@apply block py-2.5 px-4 bg-slate-900 outline-none rounded-xl border-2 border-slate-800 active:border-purple-500 focus:border-purple-500;
}

.button {
	@apply flex justify-center items-center py-3 px-4 text-base bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-xl cursor-pointer hover:bg-gradient-to-l hover:from-violet-600 hover:to-fuchsia-500 transition-colors duration-300;
}
</style>
