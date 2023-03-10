import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
};

export default config;
