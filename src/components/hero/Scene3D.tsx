"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  ScrollControls, 
  ContactShadows,
  Float,
  Lightformer
} from "@react-three/drei";
import { PremiumBox } from "./PremiumBox";

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [5, 4, 6], fov: 45 }}
      shadows
      dpr={[1, 2]} // Support high-dpi displays but cap at 2 for performance
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      {/* Lighting setup for realistic premium look */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        castShadow 
        position={[10, 10, 5]} 
        intensity={1.5} 
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />
      
      {/* Procedural Environment avoids GitHub raw 429 rate limits */}
      <Environment background={false} resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer form="rect" intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={1} position={[-10, 5, 10]} scale={[5, 5, 1]} />
          <Lightformer form="rect" intensity={1} position={[10, 5, 10]} scale={[5, 5, 1]} />
          {/* Key light reflection */}
          <Lightformer form="ring" color="#ffffff" intensity={3} scale={2} position={[5, 5, 2]} target={[0, 0, 0]} />
        </group>
      </Environment>

      <Suspense fallback={null}>
        <ScrollControls pages={2} damping={0.2}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* The box itself, positioned nicely */}
            <PremiumBox position={[0, -0.5, 0]} scale={1.2} />
          </Float>
        </ScrollControls>
      </Suspense>

      {/* Realistic soft shadow underneath the box */}
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#000000"
      />
    </Canvas>
  );
}
