import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const file of ['dist/app.js','dist/notebook.js','dist/second-brain-demo.js','scripts/serve.mjs']){const result=spawnSync(process.execPath,['--check',file],{cwd:root,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
for(const file of ['dist/index.html','dist/second-brain-demo.html','dist/styles.css','dist/fonts.css','dist/vendor/three.module.js','dist/vendor/three.core.js','dist/assets/lumen.png','dist/assets/second-brain-demo.png','dist/assets/github-finder.png','dist/assets/spiderman.png','dist/assets/writings.png']){if(!fs.existsSync(root+file))throw new Error(`Missing asset: ${file}`);}
console.log('JavaScript and required static assets verified.');
