import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/main.ts',
          'src/App.vue',
          'src/router/**',
          'src/stores/**',
          'src/types/**',
          'src/utils/**',
          'src/constants/**',
          'src/assets/**',
          '**/*.d.ts',
          '**/*.config.ts',
          '**/*.config.js',
          '**/*.stories.ts',
          '**/*.stories.js',
          '**/*.spec.ts',
          '**/*.test.ts',
        ],
      },
    },
  }),
)
