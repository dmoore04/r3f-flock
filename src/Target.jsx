import { useYuka } from "./useYuka";
import { Vehicle } from "yuka";
import * as THREE from "three";

const sphereGeometry = new THREE.SphereGeometry(0.5);
const basicMaterial = new THREE.MeshBasicMaterial();

export default function TargetVehicle(props) {
    const [ref] = useYuka({ type: Vehicle, name: "target", ...props });

    return (
        <mesh
            ref={ref}
            geometry={sphereGeometry}
            material={basicMaterial}
            visible={false}
        />
    );
}
