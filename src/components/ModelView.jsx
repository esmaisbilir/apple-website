import { Canvas } from '@react-three/fiber'; // Canvas @react-three/fiber'den gelir
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from 'three';
import Lights from "./Lights";
import IPhone from "./IPhone";
import { Suspense } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
    <div className={`w-full h-full ${index === 2 ? 'right-[-100%]' : ''}`}>
      <Canvas>
        {/* Ambient Light */}
        <ambientLight intensity={0.3} />

        <PerspectiveCamera makeDefault position={[0, 0, 4]} />

        <Lights />

        <OrbitControls 
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />
        
        <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
          <Suspense fallback={<Html><div>Loading...</div></Html>}>
            <IPhone 
              scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
};

export default ModelView;
