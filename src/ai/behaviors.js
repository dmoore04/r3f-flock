export default {
    // These generate new positions for the invisible target
    // which the Vehicles are following.
    wave: (state, viewport) => {
        const x =
            ((state.clock.elapsedTime * 0.5) % viewport.width) /
                viewport.width -
            0.5;
        return [
            x * viewport.width,
            Math.sin(state.clock.elapsedTime) * 0.5,
            Math.sin(state.clock.elapsedTime) * viewport.height,
        ];
    },
    follow: (state, viewport) => {
        return [
            (state.mouse.x * viewport.width) / 2,
            Math.sin(state.clock.elapsedTime) * 0.5,
            (-state.mouse.y * viewport.height) / 2,
        ];
    },
    circle: (state, viewport) => {
        return [
            Math.sin(state.clock.elapsedTime) * viewport.width,
            Math.sin(state.clock.elapsedTime) * 0.5,
            Math.cos(state.clock.elapsedTime) * viewport.height,
        ];
    },
    cross: (state, viewport) => {
        const x =
            (state.clock.elapsedTime % viewport.width) / viewport.width - 0.5;
        return [x * viewport.width, Math.sin(state.clock.elapsedTime) * 0.5, 0];
    },
};
