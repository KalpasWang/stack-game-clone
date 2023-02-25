import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
// import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [glsl()],
  assetsInclude: ['**/*.gltf', '**/*.glb'],
});
