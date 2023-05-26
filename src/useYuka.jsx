import { useRef, useEffect, useState, useContext } from "react";
import { GameEntity } from "yuka";
import managerContext from "./context/entityManager";

export function useYuka({ type = GameEntity, position = [0, 0, 0] }) {
    // This hook makes set-up re-usable
    const ref = useRef();
    const mgr = useContext(managerContext);
    const [entity] = useState(() => new type());

    useEffect(() => {
        entity.position.set(...position);
        entity.rotation.fromEuler(0, 2 * Math.PI * Math.random(), 0);
        entity.setRenderComponent(ref, (entity) => {
            ref.current.position.copy(entity.position);
            ref.current.quaternion.copy(entity.rotation);
        });

        mgr.add(entity);

        return () => mgr.remove(entity);
    }, []);

    return [ref, entity];
}
