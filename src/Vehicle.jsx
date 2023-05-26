import { useLayoutEffect, useRef } from "react";
import { useYuka } from "./useYuka";
import { Vehicle } from "yuka";

export default function ConeVehicle(props) {
    const [ref] = useYuka({ type: Vehicle, ...props });
    const geoRef = useRef();

    useLayoutEffect(() => {
        geoRef.current.rotateX(Math.PI / 2);
    });

    return (
        <mesh ref={ref}>
            <coneGeometry ref={geoRef} args={[0.1, 0.5, 8]} />
            <meshNormalMaterial flatShading />
        </mesh>
    );
}
