import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/localforage-node-localstorage-driver.ts',
      name: 'NodeLocalForageDriver',
      fileName: 'localforage-node-localstorage-driver',
      formats: ['es'], // ESM only!
    },
    rollupOptions: {
      external: ['svelte', 'malinajs'],
      output: {
        globals: {
          svelte: 'Svelte',
          malinajs: 'Malina'
        }
      }
    }
  },
  test: {
    environment: 'node'
  }
})