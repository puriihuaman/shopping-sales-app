<template>
	<span class="icon">
		<svg class="icon-svg" :class="` ${otherClass ?? 'icon-sm'}`">
			<use :href="path + iconID"></use>
		</svg>
	</span>
</template>

<script setup lang="ts">
defineProps<{
	iconID: string;
	otherClass?: string;
}>();

const path = '/assets/icons/svg-icons.svg#';
</script>

<style scoped lang="scss">
.icon {
	@apply flex justify-center items-center;
}
.icon-svg {
	@apply block text-current fill-current;
}
.icon-sm {
	@apply w-6 h-6;
}
.icon-md {
	@apply w-8 h-8;
}
.icon-lg {
	@apply w-12 h-12;
}
</style>
