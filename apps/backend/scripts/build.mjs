import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import nodemon from 'nodemon';
import esbuild from 'esbuild';

const PKG = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
const IS_DEV = process.argv.includes('--dev');
const WORK_FILE = path.join(process.cwd(), IS_DEV ? '/build/dev.js' : '/build/prod.js');

/** @type {import('esbuild').BuildOptions} */
const ESBUILD_CFG = {
  format: 'cjs',
  bundle: true,
  minify: !IS_DEV,
  target: 'node16',
  outfile: WORK_FILE,
  platform: 'node',
  external: [...Object.keys(PKG.dependencies || {})],
  sourcemap: true,
  entryPoints: ['./bootstrap.ts'],
};

/** @type {import('nodemon').Settings} */
const NODEMON_CFG = {
  ext: 'json,js',
  env: { NODE_ENV: 'development' },
  exec: 'node --enable-source-maps build/dev.js',
  watch: ['build/'],
  restartable: 'rs',
};

(async () => {
  if (IS_DEV) {
    const ctx = await esbuild.context(ESBUILD_CFG);
    ctx.watch().then(devRunner);
  } else {
    await esbuild.build(ESBUILD_CFG);
  }
})();

/** @type {() => Promise<typeof nodemon>} */
const devRunner = () =>
  new Promise((r) => {
    const retry = setInterval(async () => {
      fs.access(WORK_FILE, (err) => {
        if (err) return;
        clearInterval(retry);
        r(nodemon(NODEMON_CFG));
      });
    }, 1000);
  });
