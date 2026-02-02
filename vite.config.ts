import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/ilmn25/',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    }
});
