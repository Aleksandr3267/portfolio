import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { stage, faceForProject } from './stage.js';

const BASE_COLORS = ['#5a46ff', '#4d3bf0', '#6b5aff'].map((c) => new THREE.Color(c));
const LIME = new THREE.Color('#d9f04b');
const FRONT = new THREE.Vector3(0.18, 0.12, 1).normalize();
const damp = THREE.MathUtils.damp;


function buildFacets() {
  const ico = new THREE.IcosahedronGeometry(1, 0);
  const pos = ico.getAttribute('position');
  const facets = [];
  for (let i = 0; i < pos.count; i += 3) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, i);
    const b = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
    const geometry = new THREE.BufferGeometry().setFromPoints([a, b, c]);
    geometry.computeVertexNormals();
    facets.push({ geometry, normal: a.clone().add(b).add(c).normalize() });
  }
  ico.dispose();
  return facets;
}

function Shards() {
  const group = useRef();
  const meshes = useRef([]);
  const facets = useMemo(buildFacets, []);

  const materials = useMemo(
    () =>
      facets.map(
        (_, i) =>
          new THREE.MeshStandardMaterial({
            color: BASE_COLORS[i % 3],
            flatShading: true,
            side: THREE.DoubleSide,
            roughness: 0.38,
            metalness: 0.12,
          })
      ),
    [facets]
  );


  const local = useRef({
    idle: 0,
    explode: 0,
    radius: 0,
    x: null,
    y: null,
    pop: new Array(20).fill(0),
    euler: new THREE.Euler(),
    qIdle: new THREE.Quaternion(),
    qFace: new THREE.Quaternion(),
    tint: new THREE.Color(),
  });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const L = local.current;
    const { viewport } = state;
    const dt = Math.min(delta, 0.05); 

  
    const targetX = stage.x * (viewport.width / 2) + stage.px * 0.12;
    const targetY = stage.y * (viewport.height / 2) + stage.py * 0.08;
    const targetR =
      (stage.size * Math.min(viewport.width, viewport.height) * 0.5) * stage.intro;

    if (L.x === null) {
      L.x = targetX;
      L.y = targetY;
    }
    L.x = damp(L.x, targetX, 5, dt);
    L.y = damp(L.y, targetY, 5, dt);
    L.radius = damp(L.radius, targetR, 6, dt);
    g.position.set(L.x, L.y, 0);
    g.scale.setScalar(Math.max(L.radius, 0.0001));

    // --- rotation ---
    L.idle += dt * 0.14;
    const introSpin = (1 - stage.intro) * Math.PI * 1.4;
    L.euler.set(
      0.38 - stage.py * 0.25,
      L.idle + stage.drift + introSpin + stage.px * 0.4,
      0
    );
    L.qIdle.setFromEuler(L.euler);

    let target = L.qIdle;
    if (stage.active >= 0) {
      const facet = facets[faceForProject(stage.active)];
      if (facet) {
        L.qFace.setFromUnitVectors(facet.normal, FRONT);
        target = L.qFace;
      }
    }
    g.quaternion.slerp(target, 1 - Math.exp(-dt * 3.2));


    L.explode = damp(L.explode, stage.explode, 4, dt);
    const activeFacet = stage.active >= 0 ? faceForProject(stage.active) : -1;

    for (let i = 0; i < facets.length; i++) {
      L.pop[i] = damp(L.pop[i], i === activeFacet ? 1 : 0, 7, dt);
      const offset = L.explode * (activeFacet >= 0 ? 0.35 : 1) * 0.38 + L.pop[i] * 0.5;
      const mesh = meshes.current[i];
      if (!mesh) continue;
      mesh.position.copy(facets[i].normal).multiplyScalar(offset);
      L.tint.copy(BASE_COLORS[i % 3]).lerp(LIME, L.pop[i]);
      materials[i].color.copy(L.tint);
    }
  });

  return (
    <group ref={group}>
      {facets.map((facet, i) => (
        <mesh
          key={i}
          ref={(el) => (meshes.current[i] = el)}
          geometry={facet.geometry}
          material={materials[i]}
        />
      ))}
    </group>
  );
}

function Lights() {
  const lime = useRef();
  useFrame(() => {
    if (lime.current) lime.current.intensity = 0.3 + stage.glow * 1.7;
  });
  return (
    <>
      <hemisphereLight args={['#ffffff', '#8b84ff', 1.15]} />
      <directionalLight position={[3, 5, 6]} intensity={2.6} />
      <directionalLight position={[-6, 1, 4]} intensity={1.0} color="#b9b2ff" />
      <directionalLight ref={lime} position={[-5, -4, -1]} intensity={0.3} color="#d9f04b" />
    </>
  );
}

export default function Scene() {

  useEffect(() => {
    const onMove = (e) => {
      stage.px = (e.clientX / window.innerWidth) * 2 - 1;
      stage.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Lights />
      <Shards />
    </Canvas>
  );
}
