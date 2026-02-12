import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@admin': path.resolve(__dirname, './src/modules/admin'),
            '@menu': path.resolve(__dirname, './src/modules/menu'),
            '@kitchen': path.resolve(__dirname, './src/modules/kitchen'),
            '@home': path.resolve(__dirname, './src/modules/home'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@store': path.resolve(__dirname, './src/store'),
        },
    },
})
