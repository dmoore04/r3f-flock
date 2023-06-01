import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import behaviors from "../ai/behaviors";
import * as THREE from "three";
import { createContext } from "react";

const behaviorOptions = Object.keys(behaviors);

export const geometries = {
    cone: new THREE.ConeGeometry(0.1, 0.5, 8).rotateX(Math.PI / 2),
    sphere: new THREE.SphereGeometry(0.1, 8, 8),
    box: new THREE.BoxGeometry(0.2, 0.2, 0.2),
    capsule: new THREE.CapsuleGeometry(0.1, 0.2, 4, 4).rotateX(Math.PI / 2),
    torus: new THREE.TorusGeometry(0.2, 0.1, 8, 8).rotateZ(Math.PI / 2),
    tetrahedon: new THREE.TetrahedronGeometry(0.2).rotateX(Math.PI / 2),
};

const geometryOptions = Object.keys(geometries);

export default create(
    subscribeWithSelector((set) => {
        return {
            count: 200,
            geometryOptions: geometryOptions,
            geometry: geometryOptions[0],
            nextGeometry: () =>
                set(({ geometryOptions, geometry }) => {
                    const currentIndex = geometryOptions.indexOf(geometry);
                    const nextIndex =
                        currentIndex === geometryOptions.length - 1
                            ? 0
                            : currentIndex + 1;

                    return { geometry: geometryOptions[nextIndex] };
                }),
            managerContext: createContext(),
            speed: 1.2,
            changeSpeed: (newSpeed) => set({ speed: newSpeed }),
            behaviorOptions: behaviorOptions,
            behavior: behaviorOptions[0],
            nextBehavior: () =>
                set(({ behaviorOptions, behavior }) => {
                    const currentIndex = behaviorOptions.indexOf(behavior);
                    const nextIndex =
                        currentIndex === behaviorOptions.length - 1
                            ? 0
                            : currentIndex + 1;

                    return { behavior: behaviorOptions[nextIndex] };
                }),
        };
    })
);
