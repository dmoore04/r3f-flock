import PropTypes from "prop-types";
import {
  ArriveBehavior,
  EntityManager,
  Vehicle,
  SeparationBehavior,
  WanderBehavior,
} from "yuka";
import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import useFlock from "../stores/useFlock";
import behaviors from "./behaviors";

export default function MovementAI({ children }) {
  const [mgr] = useState(() => new EntityManager(), []);
  const managerContext = useFlock((state) => state.managerContext);

  const [target] = useState(() => new Vehicle(), []);
  const behavior = useFlock((state) => state.behavior);
  const nextBehavior = useFlock((state) => state.nextBehavior);

  const { viewport } = useThree();

  useEffect(() => {
    target.name = "target";
    target.position.set(0, 0, 0);
    target.steering.add(new WanderBehavior());
    mgr.add(target);

    const vehicles = mgr.entities.filter((item) => item.name === "vehicle");

    const arrive = new ArriveBehavior(target.position, 3, 0.5);

    const seperate = new SeparationBehavior();
    seperate.weight = 0.4; // helps to reduce covergence on one point

    vehicles.forEach((vehicle) => {
      const wander = new WanderBehavior(); // add some randomness to pathing
      wander.weight = (Math.random() + 0.1) * 0.6;

      vehicle.steering.add(arrive);
      vehicle.steering.add(seperate);
      vehicle.steering.add(wander);
    });

    // should probably do some clean up here
  }, [mgr.entities]);

  useFrame((state, delta) => {
    const hasMouse = !matchMedia("(hover: none)").matches;

    if (behavior === "follow" && !hasMouse) {
      nextBehavior();
    }

    target.position.set(...behaviors[behavior](state, viewport));

    mgr.update(delta);
  });

  return (
    <managerContext.Provider value={mgr}>{children}</managerContext.Provider>
  );
}

MovementAI.propTypes = {
  children: PropTypes.node,
};
