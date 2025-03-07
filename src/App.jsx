import { Canvas } from "@react-three/fiber";
import Experience from "./components/experience";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
 
 
function App() {
  

  return (
    <>
      
      <section className="fixed h-screen w-full">
        <Canvas >
          <Experience />
        </Canvas>
      </section>

      
 
    </>
  );
}

export default App;
