import PropTypes from "prop-types";
import { EntityManager, WanderBehavior } from "yuka";
import React, { useEffect, useState } from "react";
import managerContext from "./context/entityManager";
import { useFrame } from "@react-three/fiber";

export function Wander({ children }) {
    const [mgr] = useState(() => new EntityManager(), []);

    useEffect(() => {
        const vehicles = mgr.entities.filter((item) => item.name === "vehicle");

        vehicles.forEach((vehicle) => {
            vehicle.steering.add(new WanderBehavior());
        });
    }, [mgr.entities, children]);

    useFrame((_, delta) => mgr.update(delta));

    return (
        <managerContext.Provider value={mgr}>
            {children}
        </managerContext.Provider>
    );
}

Wander.propTypes = {
    children: PropTypes.node,
};
