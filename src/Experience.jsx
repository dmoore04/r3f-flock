import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import "./style.css";
import { useControls } from "leva";
import ConeVehicle from "./Vehicle";
import { Wander } from "./useYuka";

function Experience() {
    const { showPerf } = useControls("debug", {
        showPerf: false,
    });

    return (
        <>
            {/* Utilities */}
            {showPerf && <Perf position="top-left" />}
            <OrbitControls />

            {/* Scene */}
            <Wander>
                <ConeVehicle />
                <ConeVehicle position={[-3, 0, -3]} />
            </Wander>
        </>
    );
}

export default Experience;
