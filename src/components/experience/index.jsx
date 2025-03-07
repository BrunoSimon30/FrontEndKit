import React, { useRef, useState } from "react";
import { CameraControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls, button } from "leva";
import * as THREE from "three";
import OurModel from "../ourmodel";

export default function Experience() {
  const cameraRef = useRef(); // ✅ Camera Ref
  const cameraControlsRef = useRef();
  const prevCameraPosition = useRef(new THREE.Vector3());

  const [modelPosition, setModelPosition] = useState([0, -3, 0]);
  const [modelRotation, setModelRotation] = useState([0, 0, 0]);
  const [camera, setCamera] = useState([0, -0.011041348673133243, 0.8])

 
 

  // ✅ Leva UI for Camera Movement
  useControls("Camera Actions", {
    "Move Camera": button(() => {
      if (cameraControlsRef.current) {
        // ✅ Move camera smoothly (Duration: 1 second)
        cameraControlsRef.current.setLookAt(
          0.00720047823010156, 0.4715727785420382, 0.3526471101015994,  // New camera position
          0, 0, 0,   // Look at target
          true       // Enable smooth transition
        );
      }
  
      // ✅ Smooth transition for Model & Camera Position using Lerp
      let start = { model: [...modelPosition], camera: [...camera] };
      let end = { model: [0, -2, 0], camera: [0, 0, 5] };
      let duration = 1.5; // seconds
      let startTime = performance.now();
  
      function animate(time) {
        let elapsed = (time - startTime) / (duration * 1000);
        let t = Math.min(elapsed, 1); // Clamp value between 0 and 1
  
        // Interpolate values
        let newModelPos = start.model.map((s, i) => THREE.MathUtils.lerp(s, end.model[i], t));
        let newCameraPos = start.camera.map((s, i) => THREE.MathUtils.lerp(s, end.camera[i], t));
  
        setModelPosition(newModelPos);
        setCamera(newCameraPos);
  
        if (t < 1) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);
    }),
  });

  // ✅ Track Camera Position (Rotation Tracking Removed)
  useFrame(() => {
    if (cameraRef.current) {
      const { position } = cameraRef.current;

      // Check if the camera has moved
      if (!prevCameraPosition.current.equals(position)) {
        console.log("📸 Camera Position:", position.toArray());

        // Update previous value
        prevCameraPosition.current.copy(position);
      }
    }
  });

  return (
    <>
      {/* ✅ Custom Perspective Camera */}
      <PerspectiveCamera ref={cameraRef} makeDefault fov={75} near={0.1} far={1000} position={camera} />
     
      {/* ✅ Controls */}
      <CameraControls ref={cameraControlsRef} />
      <Environment preset="city" />

      {/* ✅ Model with Dynamic Position & Rotation */}
      <OurModel 
        scale={2.5}  
        position={modelPosition}  
        rotation={modelRotation}  
       
      />
    </>
  );
}
