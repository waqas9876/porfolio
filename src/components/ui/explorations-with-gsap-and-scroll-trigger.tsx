'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function lerp(start: number, end: number, amt: number): number {
  return start * (1 - amt) + end * amt;
}

export interface NebulaSectionData {
  label: string;
  title: string[];
  description: string;
}

interface NebulaCubeProps {
  sections: NebulaSectionData[];
}

export function NebulaCube({ sections }: NebulaCubeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const constellationSystemRef = useRef<THREE.LineSegments | null>(null);
  const animFrameRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const uniformsRef = useRef({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(512, 512) },
    scrollProgress: { value: 0.0 },
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform float scrollProgress;
    varying vec2 vUv;
    varying vec3 vNormal;

    void mainImage(out vec4 O, vec2 I) {
      vec2 r = iResolution.xy;
      vec2 z; vec2 i;
      vec2 f = I*(z+=4.-4.*abs(.7-dot(I=(I+I-r)/r.y, I)));
      float timeOffset = sin(iTime * 0.2) * 0.1;
      f.x += timeOffset; f.y -= timeOffset;
      float iterations = mix(8.0, 12.0, scrollProgress);
      for(O *= 0.; i.y++<iterations;
          O += (sin(f += cos(f.yx*i.y+i+iTime)/i.y+.7)+1.).xyyx
          * abs(f.x-f.y));
      O = tanh(7.*exp(z.x-4.-I.y*vec4(-1,1,2,0))/O);
      float pulse = 1.0 + 0.2 * sin(iTime * 0.5);
      O.rgb *= pulse;
      float nebula = sin(I.x * 0.01 + iTime * 0.3) * sin(I.y * 0.01 - iTime * 0.2);
      nebula = abs(nebula) * 0.5;
      vec3 color1 = mix(vec3(0.1, 0.2, 0.8), vec3(0.8, 0.1, 0.5), scrollProgress);
      vec3 color2 = mix(vec3(0.8, 0.2, 0.7), vec3(0.2, 0.8, 0.7), scrollProgress);
      vec3 colorMix = mix(color1, color2, sin(iTime * 0.2) * 0.5 + 0.5);
      O.rgb = mix(O.rgb, colorMix, nebula * (1.0 - length(O.rgb)));
    }

    void main() {
      vec2 cubeUV = vUv * iResolution;
      vec4 fragColor;
      mainImage(fragColor, cubeUV);
      float depthFactor = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      fragColor.rgb *= 0.7 + 0.3 * depthFactor;
      float edge = 1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) * 2.0;
      edge = pow(edge, 4.0);
      fragColor.rgb += edge * vec3(0.1, 0.2, 0.8) * (0.6 + scrollProgress * 0.4);
      fragColor.rgb *= 2.0;
      gl_FragColor = fragColor;
    }
  `;

  function createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(200,200,255,0.7)');
    g.addColorStop(1, 'rgba(40,40,120,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.Texture(canvas);
    t.needsUpdate = true;
    return t;
  }

  function createParticles(scene: THREE.Scene, starTexture: THREE.Texture | null) {
    const COUNT = 2000;
    const DEPTH = 12;
    const positions = new Float32Array(COUNT * 3);
    const originalPositions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 3;
      const depth = Math.random() * DEPTH - DEPTH / 2;

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) + depth;
      originalPositions.set(positions.slice(i * 3, i * 3 + 3), i * 3);

      velocities[i * 3]     = (Math.random() - 0.5) * 0.0004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0002;

      const nd = (positions[i * 3 + 2] + DEPTH / 2) / DEPTH;
      sizes[i] = 0.008 + 0.03 * (1 - nd);
      const b = 0.5 + 0.5 * (1 - nd);
      colors[i * 3] = 0.4 + 0.3 * b;
      colors[i * 3 + 1] = 0.4 + 0.3 * b;
      colors[i * 3 + 2] = 0.7 + 0.3 * b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.03, map: starTexture, transparent: true,
      vertexColors: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });

    const ps = new THREE.Points(geo, mat);
    scene.add(ps);

    const conGeo = new THREE.BufferGeometry();
    const conMat = new THREE.LineBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending });
    const cs = new THREE.LineSegments(conGeo, conMat);
    scene.add(cs);

    return { ps, cs };
  }

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mount = mountRef.current;
    if (!wrapper || !mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const W = wrapper.clientWidth;
    const H = wrapper.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Cube
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);
    cubeGroupRef.current = cubeGroup;

    const geo = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4);
    const mat = new THREE.ShaderMaterial({
      vertexShader, fragmentShader, uniforms: uniformsRef.current,
      transparent: true, side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geo, mat);
    cubeRef.current = cube;
    cubeGroup.add(cube);
    cubeGroup.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(geo, 10),
      new THREE.LineBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.1 }),
    ));

    // Particles
    const starTex = createStarTexture();
    const { ps, cs } = createParticles(scene, starTex);
    particleSystemRef.current = ps;
    constellationSystemRef.current = cs;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const ptLight = new THREE.PointLight(0x3366ff, 1.5, 20);
    ptLight.position.set(-3, 2, 5);
    scene.add(ptLight);

    // ScrollTrigger — scoped to the wrapper
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          uniformsRef.current.scrollProgress.value = self.progress;

          let zc = self.progress < 0.5
            ? gsap.utils.clamp(0, 1, self.progress * 2)
            : gsap.utils.clamp(0, 1, 2 - self.progress * 2);
          zc = gsap.parseEase('power2.inOut')(zc);

          if (cameraRef.current) {
            cameraRef.current.fov = 60 - 40 * zc;
            cameraRef.current.updateProjectionMatrix();
          }
          if (cubeGroupRef.current) cubeGroupRef.current.scale.setScalar(1 + 0.2 * zc);
        },
      },
    });

    scrollTl
      .to(cubeGroup.rotation, { x: Math.PI * 1.2, y: Math.PI * 2, z: Math.PI * 0.3, ease: 'power2.inOut' })
      .to(camera.position, { z: 0.8, y: 0.2, x: 0, ease: 'power2.inOut' }, 0.5)
      .to(camera.position, { z: 4.0, y: 0, x: 0, ease: 'power2.inOut' }, 1.0);

    // Per-slide text animation — scoped to wrapper
    wrapper.querySelectorAll<HTMLElement>('.nebu-slide').forEach((slide, idx) => {
      const title = slide.querySelector<HTMLElement>('.nebu-title');
      const desc = slide.querySelector<HTMLElement>('.nebu-desc');
      if (!title || !desc) return;

      gsap.set([title, desc], { opacity: 0, y: 40 });

      gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: 'top 75%',
          end: 'top 20%',
          scrub: 1,
        },
      })
        .to(title, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0)
        .to(desc,  { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.2 }, 0);
    });

    // Resize
    const onResize = () => {
      if (!wrapper || !cameraRef.current || !rendererRef.current) return;
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Mouse
    const onMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      if (!ScrollTrigger.isScrolling() && cubeGroupRef.current) {
        gsap.to(cubeGroupRef.current.rotation, {
          x: '+=' + (mouse.current.y * 0.03), y: '+=' + (mouse.current.x * 0.03),
          duration: 1, ease: 'power2.out', overwrite: 'auto',
        });
      }
    };
    window.addEventListener('mousemove', onMouse);

    // Animation loop
    function animate(ts: number) {
      animFrameRef.current = requestAnimationFrame(animate);
      uniformsRef.current.iTime.value = ts * 0.001;

      if (!ScrollTrigger.isScrolling() && cubeGroupRef.current) {
        cubeGroupRef.current.rotation.x += 0.0005;
        cubeGroupRef.current.rotation.y += 0.0008;
      }

      if (particleSystemRef.current && constellationSystemRef.current) {
        const pSys = particleSystemRef.current;
        const positions  = pSys.geometry.attributes.position.array as Float32Array;
        const velocities = pSys.geometry.attributes.velocity.array as Float32Array;
        const colors     = pSys.geometry.attributes.color.array as Float32Array;
        const COUNT = positions.length / 3;
        const connPts: number[] = [];

        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          positions[i3]     += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
          positions[i3]     += (mouse.current.x * 3 - positions[i3]) * 0.0001;
          positions[i3 + 1] += (mouse.current.y * 3 - positions[i3 + 1]) * 0.0001;

          const dist = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2);
          if (dist > 10) {
            const t2 = Math.random() * Math.PI * 2, p2 = Math.acos(2 * Math.random() - 1), r2 = 5 + Math.random() * 2;
            positions[i3]     = r2 * Math.sin(p2) * Math.cos(t2);
            positions[i3 + 1] = r2 * Math.sin(p2) * Math.sin(t2);
            positions[i3 + 2] = r2 * Math.cos(p2);
          }
        }

        pSys.geometry.attributes.position.needsUpdate = true;

        if (connPts.length > 0) {
          constellationSystemRef.current.geometry.setAttribute(
            'position', new THREE.Float32BufferAttribute(connPts, 3)
          );
          constellationSystemRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      rendererRef.current?.render(scene, camera);
    }
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (rendererRef.current) {
        mount.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      scene.traverse((obj: any) => {
        obj.geometry?.dispose();
        if (obj.material) {
          Array.isArray(obj.material) ? obj.material.forEach((m: any) => m.dispose()) : obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', height: `${sections.length * 100}vh`, background: '#0a0a0a' }}
    >
      {/* Sticky Three.js canvas */}
      <div
        ref={mountRef}
        style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Slide text overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {sections.map((s, i) => (
          <div
            key={i}
            className="nebu-slide"
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 6vw',
            }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.2rem' }}>
              {s.label}
            </p>
            <h2
              className="nebu-title"
              style={{ fontSize: 'clamp(3rem,10vw,9rem)', fontWeight: 800, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.03em', color: '#fff', marginBottom: '2rem' }}
            >
              {s.title.map((line, j) => <span key={j} style={{ display: 'block' }}>{line}</span>)}
            </h2>
            <p
              className="nebu-desc"
              style={{ maxWidth: '44ch', fontSize: 'clamp(0.95rem,1.8vw,1.2rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}
            >
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
