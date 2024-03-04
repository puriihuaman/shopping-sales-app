import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@views': '/src/views/',
			'@components': '/src/components/',
			'@shared': '/src/shared/',
		},
	},
});
