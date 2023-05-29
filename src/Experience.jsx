import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import "./style.css";
import { useControls } from "leva";
import ConeVehicle from "./Vehicle";
import { Wander } from "./Wander";
import { ASCII, EffectComposer, Pixelation } from "@react-three/postprocessing";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Experience() {
    const vehicles = useRef();
    /* Controls */
    const { showPerf } = useControls("debug", {
        showPerf: false,
    });

    const {
        fontSize,
        cellSize,
        enabled: asciiEnabled,
    } = useControls("ascii", {
        enabled: true,
        fontSize: { value: 64, min: 8, max: 256, step: 2 },
        cellSize: { value: 8, min: 2, max: 256, step: 2 },
    });

    const { granularity, enabled: pixelationEnabled } = useControls(
        "pixelation",
        {
            enabled: false,
            granularity: { value: 8, min: 2, max: 32, step: 1 },
        }
    );

    const { count: vehicleCount } = useControls("vehicles", {
        count: { value: 200, min: 1, max: 1000, step: 1 },
    });

    const { follow } = useControls(
        "camera",
        {
            follow: { value: -1, min: -1, max: vehicleCount - 1, step: 1 },
        },
        [vehicleCount]
    );

    const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

    useFrame((state, delta) => {
        if (follow !== -1) {
            const vehiclePosition = vehicles.current?.children[follow].position;
            const cameraPosition = new THREE.Vector3();
            cameraPosition.copy(vehiclePosition);
            cameraPosition.y -= 6;

            smoothedCameraPosition.lerp(cameraPosition, 2 * delta);
            smoothedCameraTarget.lerp(vehiclePosition, 2 * delta);

            state.camera.position.copy(smoothedCameraPosition);
            state.camera.lookAt(smoothedCameraTarget);
        }
    });

    return (
        <>
            {/* Utilities */}
            {showPerf && <Perf position="top-left" />}
            <OrbitControls />

            {/* Effects */}
            <color attach="background" args={["black"]} />
            <EffectComposer>
                {asciiEnabled && (
                    <ASCII fontSize={fontSize} cellSize={cellSize} />
                )}
                {pixelationEnabled && <Pixelation granularity={granularity} />}
            </EffectComposer>

            {/* Scene */}
            <Wander>
                <group ref={vehicles}>
                    {Array.from({ length: vehicleCount }, (_, i) => (
                        <ConeVehicle
                            key={i}
                            position={[
                                (Math.random() - 0.5) * 16,
                                0,
                                (Math.random() - 0.5) * 8,
                            ]}
                            rotation={[0, Math.random() * Math.PI * 2, 0]}
                        />
                    ))}
                </group>
            </Wander>
        </>
    );
}

export default Experience;
