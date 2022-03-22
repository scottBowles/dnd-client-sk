import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import gQueryCodegen from '@leveluptuts/g-query/codegen';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				gQueryCodegen({
					// Required
					// schema: 'http://localhost:3001/graphql' // this can also be a url to a graphql api
					schema: 'http://127.0.0.1:8000/graphql/schema/', // path to schema, schema is required
					// schema: './src/lib/config/schema.graphql', // path to schema, schema is required
					out: './src/lib/graphql', // Where you want the general schema types to output
					gPath: '$lib/config/g', // Path to g, created in step 1.
					// Optional
					debug: true // boolean, this adds logging for gq files deleted and on codegen
				})
			]
		}
	}
};

export default config;
