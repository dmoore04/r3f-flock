import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import behaviors from "../ai/behaviors";

const behaviorOptions = Object.keys(behaviors);

export default create(
    subscribeWithSelector((set) => {
        return {
            count: 200,
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
