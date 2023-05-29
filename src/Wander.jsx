import PropTypes from "prop-types";
import {
    ArriveBehavior,
    EntityManager,
    GameEntity,
    SeparationBehavior,
    WanderBehavior,
} from "yuka";
import React, { useEffect, useState } from "react";
import managerContext from "./context/entityManager";
import { useFrame, useThree } from "@react-three/fiber";

export function Wander({ children }) {
    const [mgr] = useState(() => new EntityManager(), []);
    const { viewport } = useThree();

    useEffect(() => {
        const target = new GameEntity();
        target.name = "target";
        target.position.set(0, 0, 0);
        mgr.add(target);

        const vehicles = mgr.entities.filter((item) => item.name === "vehicle");

        const arrive = new ArriveBehavior(target.position, 3, 0.5);
        const seperate = new SeparationBehavior();
        seperate.weight = 0.4;
        vehicles.forEach((vehicle) => {
            const wander = new WanderBehavior();
            wander.weight = Math.random() * 0.5;

            vehicle.steering.add(arrive);
            vehicle.steering.add(seperate);
            vehicle.steering.add(wander);
        });
    }, [mgr.entities, children]);

    useFrame((state, delta) => {
        const target = mgr.entities.find((item) => item.name === "target");

        if (matchMedia("(hover: none)").matches) {
            // touch device, no mouse to follow
            const x =
                ((state.clock.elapsedTime * 0.5) % viewport.width) /
                    viewport.width -
                0.5;

            target.position.set(
                x * viewport.width,
                Math.random() - 0.5,
                Math.sin(state.clock.elapsedTime) * viewport.height
            );
        } else {
            target.position.set(
                (state.mouse.x * viewport.width) / 2,
                Math.random() - 0.5,
                (-state.mouse.y * viewport.height) / 2
            );
        }

        mgr.update(delta);
    });

    return (
        <managerContext.Provider value={mgr}>
            {children}
        </managerContext.Provider>
    );
}

Wander.propTypes = {
    children: PropTypes.node,
};
