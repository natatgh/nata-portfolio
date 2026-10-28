import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const filename=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!filename.startsWith(root)){res.writeHead(403);res.end('Forbidden');return;}const data=await fs.readFile(filename);res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
