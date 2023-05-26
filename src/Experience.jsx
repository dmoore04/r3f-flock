import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import "./style.css";
import { useControls } from "leva";

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
            <mesh>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </>
    );
}

export default Experience;
