import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';


const outputDir = 'dist';

const moduleConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: `${outputDir}/index.js`,
      format: 'cjs',
    },
    {
      file: `${outputDir}/index.esm.js`,
      format: 'es',
    },
    {
      file: `${outputDir}/bugpilot.js`,
      format: 'iife',
      name: 'BugPilot',
      plugins: [terser()],
    },
    {
      file: `${outputDir}/bugpilot.min.js`,
      format: 'iife',
      name: 'BugPilot',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
  ],
};

export default [moduleConfig];
