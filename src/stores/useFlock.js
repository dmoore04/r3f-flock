import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
    subscribeWithSelector((set) => {
        return {
            count: 200,
            speed: 1.2,
            changeSpeed: (newSpeed) => set({ speed: newSpeed }),
            behavior: "wave",
            behaviorOptions: ["follow", "wave"],
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
