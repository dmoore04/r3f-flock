import PropTypes from "prop-types";
import {
    ArriveBehavior,
    EntityManager,
    Vehicle,
    SeparationBehavior,
    WanderBehavior,
} from "yuka";
import React, { useEffect, useState } from "react";
import managerContext from "../context/entityManager";
import { useFrame, useThree } from "@react-three/fiber";

export default function MovementAI({ children }) {
    const [mgr] = useState(() => new EntityManager(), []);
    const [target] = useState(() => new Vehicle(), []);

    const { viewport } = useThree();

    useEffect(() => {
        target.name = "target";
        target.position.set(0, 0, 0);
        target.steering.add(new WanderBehavior());
        mgr.add(target);

        const vehicles = mgr.entities.filter((item) => item.name === "vehicle");

        const arrive = new ArriveBehavior(target.position, 3, 0.5);

        const seperate = new SeparationBehavior();
        seperate.weight = 0.4;

        vehicles.forEach((vehicle) => {
            const wander = new WanderBehavior();
            wander.weight = (Math.random() + 0.1) * 0.6;

            vehicle.steering.add(arrive);
            vehicle.steering.add(seperate);
            vehicle.steering.add(wander);
        });
    }, [mgr.entities]);

    useFrame((state, delta) => {
        console.log("running update loop");
        const target = mgr.entities.find((item) => item.name === "target");

        const hasMouse = !matchMedia("(hover: none)").matches;
        if (hasMouse) {
            target.position.set(
                (state.mouse.x * viewport.width) / 2,
                Math.sin(state.clock.elapsedTime) * 0.5,
                (-state.mouse.y * viewport.height) / 2
            );
        } else {
            // fallback wave movement for touch devices
            const x =
                ((state.clock.elapsedTime * 0.5) % viewport.width) /
                    viewport.width -
                0.5;

            target.position.set(
                x * viewport.width,
                Math.sin(state.clock.elapsedTime) * 0.5,
                Math.sin(state.clock.elapsedTime) * viewport.height
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

MovementAI.propTypes = {
    children: PropTypes.node,
};
