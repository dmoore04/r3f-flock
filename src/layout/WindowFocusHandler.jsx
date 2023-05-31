import React, { useEffect } from "react";
import useFlock from "../stores/useFlock";

const WindowFocusHandler = () => {
    const behavior = useFlock((state) => state.behavior);
    const nextBehavior = useFlock((state) => state.nextBehavior);

    const onBlur = () => {
        behavior === "follow" && nextBehavior();
    };

    useEffect(() => {
        window.addEventListener("blur", onBlur);

        return () => {
            window.removeEventListener("blur", onBlur);
        };
    }, [behavior]);

    return <></>;
};

export default WindowFocusHandler;
