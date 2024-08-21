import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

import CanvasLoader from "../Loader";
import { shiftLeft } from "three/examples/jsm/nodes/Nodes.js";

let mixer = null; // Declare mixer variable outside the component's scope

const Earth = ({ isMobile }) => {
  const gltf = useGLTF("./earth_cartoon/scene.gltf");

  useEffect(() => {
    const model = gltf.scene;
    const animations = gltf.animations;

    if (model && animations && mixer === null) {
      mixer = new AnimationMixer(model);

      const action = mixer.clipAction(animations[0]);
      action.play();
    }
  }, [gltf]);

  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.1}
        penumbra={1}
        intensity={1.3}
        castShadow
        shadow-mapSize={1000}
      />
      <pointLight intensity={1} />
      <primitive object={gltf.scene} scale={isMobile ? 2 : 4} />
    </mesh>
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("./earth_cartoon/scene.gltf", (gltf) => {
      const model = gltf.scene;
      const animations = gltf.animations;

      if (model && animations && mixer === null) {
        mixer = new AnimationMixer(model);

        const action = mixer.clipAction(animations[0]);
        action.play();
      }
    });
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [10, 3, 5], fov: 50, near: 0.1 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Earth />
      </Suspense>
      <OrbitControls autoRotate />
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
