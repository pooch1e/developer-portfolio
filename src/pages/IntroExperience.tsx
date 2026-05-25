import { useGLTF } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { PresentationControls, ContactShadows } from "@react-three/drei";
import { useVideoTexture } from "@react-three/drei";
import { useEffect } from "react";
import { RepeatWrapping, Mesh, MeshStandardMaterial } from "three";

export default function Experience() {
  const { scene, nodes } = useGLTF("/models/computer/computer_nodeNamed.glb");
  console.log(nodes);
  // replace 'screen' node with video texture
  const videoTexture = useVideoTexture("/videos/dev_compressed.mp4");

  useEffect(() => {
    videoTexture.wrapS = RepeatWrapping;
    videoTexture.wrapT = RepeatWrapping;
    videoTexture.offset.set(-0.08, 0.01);

    videoTexture.flipY = true;
    videoTexture.rotation = Math.PI / 2;
    scene.traverse((child) => {
      if (child instanceof Mesh && child.parent?.name === "screen") {
        const material = child.material as MeshStandardMaterial;
        material.map = videoTexture;
        material.needsUpdate = true;
      }
    });
  }, [scene, videoTexture]);
  return (
    <>
      <color args={["#241a1a"]} attach="background" />
      <Environment preset="city" />

      <PresentationControls
        global
        rotation={[0.2, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.8, 0.3]}
      >
        <primitive
          object={scene}
          scale={0.5}
          position={[2.0, -1.5, -2.5]}
          rotation-y={1}
        ></primitive>
      </PresentationControls>

      <ContactShadows position-y={-1.3} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

useGLTF.preload("/models/computer/computer_nodeNamed.glb");
