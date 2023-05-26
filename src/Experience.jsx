import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import "./style.css";
import { useControls } from "leva";
import ConeVehicle from "./Vehicle";
import { Wander } from "./Wander";

function Experience() {
    const { showPerf } = useControls("debug", {
        showPerf: false,
    });

    const VEHICLE_COUNT = 200;

    return (
        <>
            {/* Utilities */}
            {showPerf && <Perf position="top-left" />}
            <OrbitControls />

            {/* Scene */}
            <Wander>
                {/* <ConeVehicle />
                <ConeVehicle position={[-3, 0, -3]} /> */}
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
