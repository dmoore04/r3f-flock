export default {
    follow: (state, viewport) => {
        return [
            (state.mouse.x * viewport.width) / 2,
            Math.sin(state.clock.elapsedTime) * 0.5,
            (-state.mouse.y * viewport.height) / 2,
        ];
    },
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
};
