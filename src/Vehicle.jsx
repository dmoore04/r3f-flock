import { useYuka } from "./useYuka";
import { Vehicle } from "yuka";
import * as THREE from "three";

const coneGeometry = new THREE.ConeGeometry(0.1, 0.5, 8).rotateX(Math.PI / 2);
const normalMaterial = new THREE.MeshNormalMaterial({ flatShading: true });

export default function ConeVehicle(props) {
    const [ref] = useYuka({ type: Vehicle, ...props });

    return <mesh ref={ref} geometry={coneGeometry} material={normalMaterial} />;
}
