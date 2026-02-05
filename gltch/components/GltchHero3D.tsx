import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesCount = 20;
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodesCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
        scale: 0.1 + Math.random() * 0.15,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Sphere key={i} args={[node.scale, 16, 16]} position={node.position}>
          <meshStandardMaterial
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const CentralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const { x, y } = state.mouse;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.3 + time * 0.2, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.3 + time * 0.3, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Outer wireframe cube */}
        <Box args={[3, 3, 3]}>
          <MeshDistortMaterial
            color="#00f3ff"
            wireframe
            transparent
            opacity={0.3}
            distort={0.2}
            speed={2}
          />
        </Box>
        
        {/* Inner rotating torus */}
        <Torus args={[1.2, 0.1, 16, 100]}>
          <meshStandardMaterial
            color="#bc13fe"
            emissive="#bc13fe"
            emissiveIntensity={1}
            metalness={1}
            roughness={0.2}
          />
        </Torus>
        
        {/* Central sphere */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color="#ff6b35"
            emissive="#ff6b35"
            emissiveIntensity={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </group>
    </Float>
  );
};

const DataParticles = () => {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 50;
      const speed = 0.005 + Math.random() / 400;
      const xFactor = -30 + Math.random() * 60;
      const yFactor = -30 + Math.random() * 60;
      const zFactor = -30 + Math.random() * 60;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, state.mouse.x * 0.1, 0.03);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -state.mouse.y * 0.1, 0.03);
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(0.5, Math.cos(t));
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s * 0.3, s * 0.3, s * 0.3);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshPhongMaterial color="#0aff0a" emissive="#0aff0a" emissiveIntensity={0.3} />
    </instancedMesh>
  );
};

const GltchHero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={['#030712', 8, 25]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#bc13fe" />
        <pointLight position={[0, 10, -10]} intensity={1} color="#ff6b35" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <CentralCore />
        <NeuralNetwork />
        <DataParticles />
      </Canvas>
    </div>
  );
};

export default GltchHero3D;
