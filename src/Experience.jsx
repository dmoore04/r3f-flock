import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import "./style.css";
import { useControls } from "leva";
import ConeVehicle from "./Vehicle";
import { Wander } from "./Wander";
import {
    ASCII,
    EffectComposer,
    Outline,
    Pixelation,
} from "@react-three/postprocessing";

function Experience() {
    const { showPerf } = useControls("debug", {
        showPerf: false,
    });

    const { fontSize, cellSize } = useControls("ascii", {
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

    const VEHICLE_COUNT = 200;

    return (
        <>
            {/* Utilities */}
            {showPerf && <Perf position="top-left" />}
            <OrbitControls />

            {/* Effects */}
            <color attach="background" args={["black"]} />
            <EffectComposer>
                <ASCII fontSize={fontSize} cellSize={cellSize} />
                {pixelationEnabled && <Pixelation granularity={granularity} />}
            </EffectComposer>

            {/* Scene */}
            <Wander>
                {Array.from({ length: VEHICLE_COUNT }, (_, i) => (
                    <ConeVehicle
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 16,
                            0,
                            (Math.random() - 0.5) * 8,
                        ]}
                    />
                ))}
            </Wander>
        </>
    );
}

export default Experience;
