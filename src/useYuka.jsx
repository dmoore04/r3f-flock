import { useRef, useEffect, useState, useContext } from "react";
import { GameEntity } from "yuka";
import managerContext from "./context/entityManager";

export function useYuka({
    type = GameEntity,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    name = "unnamed",
}) {
    // This hook makes set-up re-usable
    const ref = useRef();
    const mgr = useContext(managerContext);
    const [entity] = useState(() => new type());

    useEffect(() => {
        entity.name = name;
        entity.position.set(...position);
        entity.rotation.fromEuler(...rotation);
        entity.updateNeighborhood = true;
        entity.neighborhoodRadius = 0.7;
        entity.maxTurnRate = Math.PI * 0.5;
        entity.maxSpeed = (Math.random() + 0.5) * 1.2;
        entity.setRenderComponent(ref, (entity) => {
            ref.current.position.copy(entity.position);
            ref.current.quaternion.copy(entity.rotation);
        });

        mgr.add(entity);

        return () => mgr.remove(entity);
    }, [position, rotation]);

    return [ref, entity];
}
