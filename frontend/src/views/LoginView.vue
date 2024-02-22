<template>
	<main class="main">
		<section class="content">
			<div>
				<h1 class="title">Ingresar</h1>

				<form action="" class="form">
					<fieldset class="fieldset">
						<label for="user" class="label">usuario</label>
						<input type="text" id="user" class="input" />
					</fieldset>

					<fieldset class="fieldset">
						<label for="password" class="label">Contraseña</label>
						<input type="password" id="password" class="input" />
					</fieldset>
				</form>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
	@apply bg-slate-50 text-slate-800;
}

.content {
	@apply w-full min-h-screen flex justify-center items-center p-4;
}
.title {
	@apply mb-8 text-2xl font-bold text-center md:text-3xl;
}
.form {
	@apply p-4 bg-slate-100 shadow-md;
}

.fieldset {
	@apply flex flex-col gap-2 mb-2 last:mb-0;
}

.label {
	@apply block capitalize;
}

.input {
	@apply block py-2 px-4 bg-slate-200 outline-none rounded-md border active:border-purple-500 focus:border-purple-500;
}

.button {
}
</style>
