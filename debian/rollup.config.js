import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { builtinModules } from 'module';
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync(process.env.PWD+'/package.json'));
if(!pkg.dependencies) pkg.dependencies={};
const file = process.env.DEST_FILE ? process.env.DEST_FILE : pkg.exports && pkg.exports.require ? pkg.exports.require : 'index.cjs';

const config = {
	input: process.env.START_FILE,
	output: [{
		format: 'cjs',
		file: file,
		preferConst: true,
		interop: 'auto',
		freeze: false,
		strict: false
	}],
	external: builtinModules,
	plugins: [
        commonjs(),
        nodeResolve({
            modulePaths: ['node_modules', ...process.config.variables.node_relative_path.split(':').map((str) => process.config.variables.node_prefix + '/' + str)],
        }),
	]
}

export default config;
