import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  moduleName: 'Air',
  entry: './src/air-store.js',
  dest: './dist/air-store.js',
  format: 'umd',
  sourceMap: true,
  plugins: [
    nodeResolve(),
    commonjs({
      include: '/**'
    })
  ]
}