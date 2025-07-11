import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://backend:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@scss': path.resolve(__dirname, './src/assets/scss'),
			'@js': path.resolve(__dirname, './src/assets/js'),
			'@page': path.resolve(__dirname, './src/pages'),
		},
	}
})