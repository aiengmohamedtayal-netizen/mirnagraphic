import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function PremiumBox({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number], scale?: number }) {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Flap references for animation
  const leftFlapRef = useRef<THREE.Group>(null);
  const rightFlapRef = useRef<THREE.Group>(null);
  const frontFlapRef = useRef<THREE.Group>(null);
  const backFlapRef = useRef<THREE.Group>(null);

  // Realistic Corrugated Box dimensions (wider, standard shipping proportion)
  const width = 2.4;
  const height = 1.4;
  const depth = 1.8;
  const thickness = 0.08; // Thicker corrugated cardboard
  const bevelRadius = 0.015; // Smooth folds/edges

  // Premium Kraft Cardboard Material (Physical for better light response)
  const cardboardMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#b08960", // Rich kraft brown
    roughness: 0.85,
    metalness: 0.1, // Slight sheen for premium feel
    clearcoat: 0.1, // Very subtle clearcoat for glancing light on bevels
    clearcoatRoughness: 0.8,
    side: THREE.DoubleSide,
  }), []);

  // Darker unbleached inside material
  const insideMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#8c6b4a",
    roughness: 0.95,
    metalness: 0.05,
    side: THREE.DoubleSide,
  }), []);

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 to 1 based on scroll

    // Smooth hover effect - subtle floating and rotation
    if (groupRef.current) {
      const targetY = hovered ? 0.15 : 0;
      const targetRotY = hovered ? 0.08 : 0;
      
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
      
      // Add subtle idle floating
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
    }

    // Scroll-driven flap opening animation
    const openProgress = Math.min(Math.max(offset * 2.5, 0), 1); // Opens slightly faster
    
    // Asymmetrical resting angles for organic realism (imperfections)
    // Left/Right flaps open wider than Front/Back
    const leftTarget = THREE.MathUtils.lerp(Math.PI / 2, -0.15, openProgress);
    const rightTarget = THREE.MathUtils.lerp(Math.PI / 2, -0.25, openProgress);
    const frontTarget = THREE.MathUtils.lerp(Math.PI / 2, -0.1, openProgress);
    const backTarget = THREE.MathUtils.lerp(Math.PI / 2, -0.2, openProgress);

    if (leftFlapRef.current) leftFlapRef.current.rotation.z = -leftTarget;
    if (rightFlapRef.current) rightFlapRef.current.rotation.z = rightTarget;
    if (frontFlapRef.current) frontFlapRef.current.rotation.x = frontTarget;
    if (backFlapRef.current) backFlapRef.current.rotation.x = -backTarget;
  });

  // Scale up the box to occupy more of the Hero (1.4x multiplier)
  const displayScale = scale * 1.4;

  return (
    <group 
      position={position} 
      scale={displayScale} 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Slightly rotate the whole box to show 3/4 perspective better */}
      <group rotation={[0.1, -0.2, 0]}>
        
        {/* --- BOX BASE --- */}
        {/* Bottom */}
        <RoundedBox 
          args={[width, thickness, depth]} 
          radius={bevelRadius} 
          smoothness={4}
          position={[0, -height / 2, 0]} 
          castShadow 
          receiveShadow 
        >
          <primitive object={insideMaterial} attach="material" />
        </RoundedBox>

        {/* Left Wall */}
        <RoundedBox 
          args={[thickness, height, depth]} 
          radius={bevelRadius} 
          smoothness={4}
          position={[-width / 2 + thickness / 2, 0, 0]} 
          castShadow 
          receiveShadow 
        >
          <primitive object={cardboardMaterial} attach="material" />
        </RoundedBox>

        {/* Right Wall */}
        <RoundedBox 
          args={[thickness, height, depth]} 
          radius={bevelRadius} 
          smoothness={4}
          position={[width / 2 - thickness / 2, 0, 0]} 
          castShadow 
          receiveShadow 
        >
          <primitive object={cardboardMaterial} attach="material" />
        </RoundedBox>

        {/* Front Wall */}
        <RoundedBox 
          args={[width - thickness * 2, height, thickness]} 
          radius={bevelRadius} 
          smoothness={4}
          position={[0, 0, depth / 2 - thickness / 2]} 
          castShadow 
          receiveShadow 
        >
          <primitive object={cardboardMaterial} attach="material" />
        </RoundedBox>

        {/* Back Wall */}
        <RoundedBox 
          args={[width - thickness * 2, height, thickness]} 
          radius={bevelRadius} 
          smoothness={4}
          position={[0, 0, -depth / 2 + thickness / 2]} 
          castShadow 
          receiveShadow 
        >
          <primitive object={cardboardMaterial} attach="material" />
        </RoundedBox>

        {/* --- FLAPS --- */}
        {/* Flaps are slightly smaller than the opening to prevent Z-fighting and look realistic */}
        
        {/* Left Flap */}
        <group position={[-width / 2 + thickness / 2, height / 2, 0]} ref={leftFlapRef}>
          <RoundedBox 
            args={[width / 2 - 0.02, thickness, depth - 0.02]} 
            radius={bevelRadius} 
            smoothness={4}
            position={[width / 4, 0, 0]} 
            castShadow 
            receiveShadow 
          >
            <primitive object={cardboardMaterial} attach="material" />
          </RoundedBox>
        </group>

        {/* Right Flap */}
        <group position={[width / 2 - thickness / 2, height / 2, 0]} ref={rightFlapRef}>
          <RoundedBox 
            args={[width / 2 - 0.02, thickness, depth - 0.02]} 
            radius={bevelRadius} 
            smoothness={4}
            position={[-width / 4, 0, 0]} 
            castShadow 
            receiveShadow 
          >
            <primitive object={cardboardMaterial} attach="material" />
          </RoundedBox>
        </group>

        {/* Front Flap */}
        <group position={[0, height / 2, depth / 2 - thickness / 2]} ref={frontFlapRef}>
          <RoundedBox 
            args={[width - thickness * 2 - 0.02, thickness, depth / 2 - 0.02]} 
            radius={bevelRadius} 
            smoothness={4}
            position={[0, 0, -depth / 4]} 
            castShadow 
            receiveShadow 
          >
            <primitive object={cardboardMaterial} attach="material" />
          </RoundedBox>
        </group>

        {/* Back Flap */}
        <group position={[0, height / 2, -depth / 2 + thickness / 2]} ref={backFlapRef}>
          <RoundedBox 
            args={[width - thickness * 2 - 0.02, thickness, depth / 2 - 0.02]} 
            radius={bevelRadius} 
            smoothness={4}
            position={[0, 0, depth / 4]} 
            castShadow 
            receiveShadow 
          >
            <primitive object={cardboardMaterial} attach="material" />
          </RoundedBox>
        </group>

      </group>
    </group>
  );
}
