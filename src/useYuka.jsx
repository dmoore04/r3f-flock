import React, {
    useRef,
    useEffect,
    useState,
    useContext,
    createContext,
} from "react";
import { useFrame } from "@react-three/fiber";
import { GameEntity, EntityManager, WanderBehavior, Vehicle } from "yuka";
import PropTypes from "prop-types";

const context = createContext();

export function Wander({ children }) {
    const [mgr] = useState(() => new EntityManager(), []);

    useEffect(() => {
        const vehicles = mgr.entities.filter((item) => item instanceof Vehicle);

        const wanderBehaviour = new WanderBehavior(6, 0.5, 24);
        vehicles.forEach((vehicle) => vehicle.steering.add(wanderBehaviour));
    }, [mgr.entities]);

    useFrame((_, delta) => mgr.update(delta));

    return <context.Provider value={mgr}>{children}</context.Provider>;
}

Wander.propTypes = {
    children: PropTypes.node,
};

export function useYuka({ type = GameEntity, position = [0, 0, 0] }) {
    // This hook makes set-up re-usable
    const ref = useRef();
    const mgr = useContext(context);
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
