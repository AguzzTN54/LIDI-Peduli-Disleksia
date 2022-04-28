import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: {
			plugins: [tailwindcss, autoprefixer]
		}
	}),
	kit: {
		prerender: {
			default: true
		},
		adapter: adapter({ pages: 'build', assets: 'build', fallback: null, precompress: false }),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
