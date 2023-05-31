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
                set((state) => {
                    const currentIndex = state.behaviorOptions.indexOf(
                        state.behavior
                    );
                    const nextIndex =
                        currentIndex === state.behaviorOptions.length - 1
                            ? 0
                            : currentIndex + 1;
                    return { behavior: state.behaviorOptions[nextIndex] };
                }),
        };
    })
);
