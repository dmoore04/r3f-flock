import { useRef, useEffect, useState, useContext } from "react";
import { GameEntity } from "yuka";
import useFlock from "../stores/useFlock";

export function useYuka({
  type = GameEntity,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  name = "unnamed",
  speed = 1.2,
}) {
  // This hook makes set-up re-usable
  const ref = useRef();
  const managerContext = useFlock((state) => state.managerContext);
  const mgr = useContext(managerContext);
  const [entity] = useState(() => new type());

  useEffect(() => {
    entity.name = name;
    entity.position.set(...position);
    entity.rotation.fromEuler(...rotation);

    entity.updateNeighborhood = true;
    entity.neighborhoodRadius = 0.7; // lower value == tighter pack
    entity.maxTurnRate = Math.PI * 0.5 * speed;
    entity.maxSpeed = (Math.random() + 0.5) * speed;

    entity.setRenderComponent(ref, (entity) => {
      ref.current.position.copy(entity.position);
      ref.current.quaternion.copy(entity.rotation);
    });

    mgr.add(entity);

    return () => mgr.remove(entity);
  }, []);

  useEffect(() => {
    entity.maxSpeed *= speed; // speed control is a multiplier applied to maxSpeed

    return () => (entity.maxSpeed /= speed);
  }, [speed]);

  return [ref, entity];
}
