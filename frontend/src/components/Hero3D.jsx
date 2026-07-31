import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* A glowing golden cross standing centre-stage */
function GlowCross() {
  const group = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
    }
  });
  const goldMat = (
    <meshStandardMaterial
      color="#D4AF37"
      emissive="#E5B94E"
      emissiveIntensity={0.5}
      metalness={0.9}
      roughness={0.25}
    />
  );
  return (
    <group ref={group} position={[0, isMobile ? 1.1 : 0.4, 0]} scale={isMobile ? 0.7 : 1}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        {/* vertical beam */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.55, 3.4, 0.55]} />
          {goldMat}
        </mesh>
        {/* horizontal beam */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <boxGeometry args={[2.1, 0.55, 0.55]} />
          {goldMat}
        </mesh>
        {/* halo ring */}
        <mesh position={[0, 0.8, -0.4]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.03, 16, 80]} />
          <meshStandardMaterial color="#E5B94E" emissive="#E5B94E" emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

/* Floating dust motes to add atmosphere */
function Dust({ count = 120 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#D4AF37" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Stage() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <circleGeometry args={[9, 64]} />
      <meshStandardMaterial color="#121010" metalness={0.6} roughness={0.4} />
    </mesh>
  );
}

function SceneContent() {
  const spot = useRef();
  const target = useMemo(() => new THREE.Object3D(), []);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, isMobile ? 11.5 : 8]} fov={45} />
      <fog attach="fog" args={["#0A0A0A", isMobile ? 11 : 8, 22]} />
      <ambientLight intensity={0.12} />
      <primitive object={target} position={[0, 0.4, 0]} />
      <spotLight
        ref={spot}
        position={[0, 9, 3]}
        angle={0.42}
        penumbra={0.9}
        intensity={70}
        distance={30}
        color="#FFE9B0"
        castShadow
        target={target}
      />
      <spotLight position={[-6, 5, 4]} angle={0.5} penumbra={1} intensity={22} color="#7E121D" />
      <spotLight position={[6, 5, 4]} angle={0.5} penumbra={1} intensity={22} color="#D4AF37" />
      <GlowCross />
      <Stage />
      <Dust />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
        rotateSpeed={0.5}
      />
    </>
  );
}

export default function Hero3D() {
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      data-testid="hero-3d-canvas"
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
