import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    test: {
        include: ['**/*.{test,}.?(c|m)[jt]s?(x)'],
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./setupTest.ts'],
        reporters: ['default', 'html'],
        outputFile: './test-results/unit-tests/index.html',
        coverage: {
            provider: 'istanbul',
            reporter: ['html'],
            reportsDirectory: './test-results/unit-tests-coverage',
        },
    },
    server: {
        port: 3000,
    },
})
