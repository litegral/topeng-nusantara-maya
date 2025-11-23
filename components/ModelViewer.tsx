"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Center, Html } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { Loader2 } from "lucide-react";

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Loading 3D model...</p>
            </div>
        </Html>
    );
}

interface ModelProps {
    modelPath: string;
    initialRotation?: [number, number, number];
}

function Model({ modelPath, initialRotation = [0, 0, 0] }: ModelProps) {
    const { scene } = useGLTF(modelPath);

    useEffect(() => {
        // Ensure proper material rendering
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material) {
                    const material = mesh.material as THREE.Material;
                    material.needsUpdate = true;
                }
            }
        });
    }, [scene]);

    return (
        <Center>
            <primitive object={scene} rotation={initialRotation} />
        </Center>
    );
}

interface ModelViewerProps {
    modelPath: string;
    className?: string;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    cameraPosition?: [number, number, number];
    initialRotation?: [number, number, number];
}

export default function ModelViewer({
    modelPath,
    className = "",
    autoRotate = true,
    autoRotateSpeed = 2,
    cameraPosition = [0, 0, 5],
    initialRotation = [0, 0, 0]
}: ModelViewerProps) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas camera={{ position: cameraPosition, fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-5, -5, -5]} intensity={0.3} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
                <Suspense fallback={<Loader />}>
                    <Model modelPath={modelPath} initialRotation={initialRotation} />
                    <Environment preset="studio" />
                </Suspense>
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    autoRotate={autoRotate}
                    autoRotateSpeed={autoRotateSpeed}
                    minDistance={2}
                    maxDistance={10}
                />
            </Canvas>
        </div>
    );
}
