
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

// EARTH + ORBITING MOON
function EarthAndMoon() {
  const earthRef = useRef();
  const moonOrbitRef = useRef();

  const [earthTexture, moonTexture] = useTexture([
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    "https://threejs.org/examples/textures/planets/moon_1024.jpg",
  ]);

  useFrame((state, delta) => {
    // Earth rotates around its own axis
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
    }

    // Moon revolves around Earth
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += delta * 0.25;
    }
  });

  // Create the orbital path
  const orbitPoints = [];

  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;

    orbitPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * 3.15,
        0,
        Math.sin(angle) * 3.15
      )
    );
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
    orbitPoints
  );

  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={2.5}
        color="#ffffff"
      />

      <pointLight
        position={[-4, -2, -3]}
        intensity={1}
        color="#159FE8"
      />

      {/* EARTH */}
      <mesh ref={earthRef} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[2.3, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.9}
        />
      </mesh>

      {/* ORBIT PATH */}
      <lineLoop geometry={orbitGeometry}>
        <lineBasicMaterial
          color="#9BB9FF"
          transparent
          opacity={0.45}
        />
      </lineLoop>

      {/* MOON ORBIT GROUP */}
      <group ref={moonOrbitRef}>

        {/* MOON */}
        <mesh position={[3.15, 0, 0]}>
          <sphereGeometry args={[0.48, 48, 48]} />
          <meshStandardMaterial
            map={moonTexture}
            roughness={1}
          />
        </mesh>

      </group>

      {/* USER CAN DRAG THE PLANET */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.7}
      />
    </>
  );
}

// LOADING FALLBACK
function LoadingEarth() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-sm tracking-widest text-cyan-300">
      LOADING EARTH & MOON...
    </div>
  );
}

// MAIN EARTH COMPONENT
export default function Earth() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="relative h-full w-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      {!ready && <LoadingEarth />}

      <Canvas
        camera={{
          position: [0, 2.5, 8],
          fov: 45,
        }}
        dpr={[1, 1.8]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        onCreated={() => setReady(true)}
      >
        <Suspense fallback={null}>
          <EarthAndMoon />
        </Suspense>
      </Canvas>
    </div>
  );
}
