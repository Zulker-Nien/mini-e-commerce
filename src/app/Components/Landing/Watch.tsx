import { Html, useGLTF } from "@react-three/drei";
import React from "react";
type WatchProps = {
  rotation: [number, number, number];
  position: [number, number, number];
  scale: number;
};
type GLTF = {
  nodes: { [key: string]: THREE.Mesh };
  materials: { [key: string]: THREE.Material };
};
const Watch: React.FC<WatchProps> = (props) => {
  const { nodes, materials } = useGLTF("/watch-v1.glb") as unknown as GLTF;

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.Object005_glass_0.geometry}
          material={materials.glass}
        >
          <Html
            scale={100}
            rotation={[Math.PI / 2, 0, 0]}
            position={[180, -350, 50]}
            transform
            occlude
          >
            <div className="annotation bg-black text-violet-400"> $ 6,550</div>
          </Html>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object006_watch_0.geometry}
          material={materials.watch}
        />
      </group>
    </>
  );
};

export default Watch;
