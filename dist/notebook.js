import * as THREE from './vendor/three.module.js';

export function initNotebook({reduced=false,initialScreen='lumen'}={}){
  const stage=document.querySelector('#device-stage');
  const canvas=document.querySelector('#device-canvas');
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{document.querySelector('#device-hint').textContent='Prévia do projeto';return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0x111111,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.25;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFShadowMap;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(33,1,.1,40);
  camera.position.set(2.5,2.5,6.4);camera.lookAt(0,.62,0);
  scene.add(new THREE.AmbientLight(0xe7eaf2,1.7));
  const key=new THREE.DirectionalLight(0xffffff,4);key.position.set(-3,6,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=5;key.shadow.camera.bottom=-3;key.shadow.bias=-.001;key.shadow.normalBias=.01;key.shadow.radius=4;scene.add(key);
  const fill=new THREE.DirectionalLight(0xe2e9ff,2.5);fill.position.set(4,3,1);scene.add(fill);
  const rim=new THREE.DirectionalLight(0xd86b66,.7);rim.position.set(-3,1,-4);scene.add(rim);
  const laptop=new THREE.Group();scene.add(laptop);
  function roundedShape(w,h,r){const s=new THREE.Shape();const x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
  const bodyMaterial=new THREE.MeshStandardMaterial({color:0x64666c,metalness:.72,roughness:.36});
  const darkMaterial=new THREE.MeshStandardMaterial({color:0x101115,metalness:.28,roughness:.48});
  const trimMaterial=new THREE.MeshStandardMaterial({color:0x2b2d33,metalness:.75,roughness:.3});
  const baseGeometry=new THREE.ExtrudeGeometry(roundedShape(3.65,2.22,.13),{depth:.09,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.018,curveSegments:8});
  const base=new THREE.Mesh(baseGeometry,bodyMaterial);base.rotation.x=-Math.PI/2;base.castShadow=true;base.receiveShadow=true;laptop.add(base);
  const keyboard=new THREE.Mesh(new THREE.BoxGeometry(3.1,.012,1.13),trimMaterial);keyboard.position.set(0,.122,-.35);laptop.add(keyboard);
  const keyMaterial=new THREE.MeshStandardMaterial({color:0x17181c,metalness:.18,roughness:.57});
  const keyGeometry=new THREE.BoxGeometry(.205,.028,.17);
  const keyMeshes=[];
  for(let row=0;row<4;row++)for(let col=0;col<13;col++){const cap=new THREE.Mesh(keyGeometry,keyMaterial);cap.position.set(-1.42+col*.237,.146,-.77+row*.235);laptop.add(cap);keyMeshes.push(cap);}
  const space=new THREE.Mesh(new THREE.BoxGeometry(1.18,.025,.15),keyMaterial);space.position.set(0,.145,.18);laptop.add(space);
  for(const x of [-1.3,-1.04,-.78,.78,1.04,1.3]){const cap=new THREE.Mesh(new THREE.BoxGeometry(.21,.025,.15),keyMaterial);cap.position.set(x,.145,.18);laptop.add(cap);}
  const escapeKey=new THREE.Mesh(new THREE.BoxGeometry(.205,.005,.17),new THREE.MeshStandardMaterial({color:0x993d3d,roughness:.6}));escapeKey.position.set(-1.42,.164,-.77);laptop.add(escapeKey);
  const trackpad=new THREE.Mesh(new THREE.BoxGeometry(1.14,.008,.52),new THREE.MeshStandardMaterial({color:0x686b72,metalness:.6,roughness:.38}));trackpad.position.set(0,.12,.66);laptop.add(trackpad);
  const notch=new THREE.Mesh(new THREE.BoxGeometry(.54,.014,.025),trimMaterial);notch.position.set(0,.09,1.12);laptop.add(notch);
  const display=new THREE.Group();display.position.set(0,.14,-.98);display.rotation.x=-.15;laptop.add(display);
  const lidGeometry=new THREE.ExtrudeGeometry(roundedShape(3.57,2.15,.105),{depth:.055,bevelEnabled:true,bevelSize:.018,bevelThickness:.013,bevelSegments:2,curveSegments:8});
  const lid=new THREE.Mesh(lidGeometry,bodyMaterial);lid.position.y=1.075;lid.castShadow=true;display.add(lid);
  const bezel=new THREE.Mesh(new THREE.ShapeGeometry(roundedShape(3.45,2.035,.075),12),darkMaterial);bezel.position.set(0,1.075,.073);display.add(bezel);
  const screenMaterial=new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false});
  const screen=new THREE.Mesh(new THREE.PlaneGeometry(3.22,1.815),screenMaterial);screen.position.set(0,1.09,.08);display.add(screen);
  const cameraDot=new THREE.Mesh(new THREE.CircleGeometry(.012,12),new THREE.MeshBasicMaterial({color:0x373d43}));cameraDot.position.set(0,2.057,.081);display.add(cameraDot);
  for(const x of [-1.13,1.13]){const hinge=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.5,14),trimMaterial);hinge.rotation.z=Math.PI/2;hinge.position.set(x,.15,-.98);laptop.add(hinge);}
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.24}));ground.rotation.x=-Math.PI/2;ground.position.y=-.045;ground.receiveShadow=true;scene.add(ground);
  const loader=new THREE.TextureLoader();const textureCache=new Map();let textureRequest=0;
  const sources={lumen:'lumen.png',secondbrain:'second-brain-demo.png',finder:'github-finder.png',spider:'spiderman.png',writings:'writings.png'};
  function loadScreen(id){const source=sources[id];if(!source)return;const request=++textureRequest;function apply(texture){if(request!==textureRequest)return;screenMaterial.map=texture;screenMaterial.needsUpdate=true;stage.classList.add('device-ready');render();}
    if(textureCache.has(id)){apply(textureCache.get(id));return;}
    loader.load('assets/'+source,texture=>{texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());const aspect=texture.image.width/texture.image.height;const target=3.22/1.815;if(aspect<target){texture.repeat.y=aspect/target;texture.offset.y=(1-texture.repeat.y)/2;}else{texture.repeat.x=target/aspect;texture.offset.x=(1-texture.repeat.x)/2;}textureCache.set(id,texture);apply(texture);},undefined,()=>{if(request===textureRequest){stage.classList.remove('device-ready');document.querySelector('#device-hint').textContent='Prévia do projeto';}});
  }
  let visible=true,frame=0,last=0,time=0,dragging=false,lastX=0,lastY=0,targetX=0,targetY=-.12,currentX=0,currentY=-.12;
  function render(){renderer.render(scene,camera);}
  function draw(now){frame=0;if(document.hidden||!visible)return;if(now-last<1000/30&&!reduced){frame=requestAnimationFrame(draw);return;}const dt=Math.min((now-last)/1000,.06);last=now;if(!reduced)time+=dt;currentX+=(targetX-currentX)*.1;currentY+=(targetY-currentY)*.1;laptop.rotation.set(currentX+(reduced?0:Math.sin(time*.48)*.018),currentY+(reduced?0:Math.sin(time*.32)*.025),0);laptop.position.y=reduced?0:Math.sin(time*.5)*.025;render();if(!reduced||Math.abs(currentX-targetX)+Math.abs(currentY-targetY)>.002)frame=requestAnimationFrame(draw);}
  function schedule(){if(!frame&&visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(draw);}}
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();render();schedule();}
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible&&frame){cancelAnimationFrame(frame);frame=0;}else schedule();},{rootMargin:'80px'}).observe(stage);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else schedule();});
  window.addEventListener('portfolio-motion',e=>{reduced=e.detail.reduced;if(frame){cancelAnimationFrame(frame);frame=0;}schedule();});
  canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;targetY=THREE.MathUtils.clamp(targetY+(e.clientX-lastX)*.007,-.85,.6);targetX=THREE.MathUtils.clamp(targetX+(e.clientY-lastY)*.004,-.15,.35);lastX=e.clientX;lastY=e.clientY;schedule();});
  canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);
  canvas.tabIndex=0;document.querySelector('#device-hint').textContent=matchMedia('(pointer:coarse)').matches?'Escolha um projeto abaixo':'Arraste ou use as setas do teclado';canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')targetY=Math.max(-.85,targetY-.12);if(e.key==='ArrowRight')targetY=Math.min(.6,targetY+.12);if(e.key==='ArrowUp')targetX=Math.max(-.15,targetX-.08);if(e.key==='ArrowDown')targetX=Math.min(.35,targetX+.08);if(e.key==='Home'){targetX=0;targetY=-.12;}schedule();}});
  document.querySelector('#device-reset').addEventListener('click',()=>{targetX=0;targetY=-.12;schedule();});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();if(frame)cancelAnimationFrame(frame);stage.classList.remove('device-ready');document.querySelector('#device-hint').textContent='Prévia do projeto';});
  loadScreen(initialScreen);resize();schedule();return {setScreen(id){loadScreen(id);schedule();}};
}
