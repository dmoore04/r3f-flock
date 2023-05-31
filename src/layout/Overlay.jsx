import { TopLeft, Container, RightMiddle } from "./styles";
import useFlock from "../stores/useFlock.js";

export default function Overlay() {
    const changeSpeed = useFlock((state) => state.changeSpeed);
    const speed = useFlock((state) => state.speed);

    return (
        <Container>
            <TopLeft>
                <h1>
                    DANNY
                    <br />
                    MOORE
                </h1>
                <p>Software Developer</p>
            </TopLeft>
            <RightMiddle>
                <span>{speed}</span>
                <input
                    type="range"
                    min="0.5"
                    max="2.4"
                    value={speed}
                    step="0.01"
                    onChange={(e) => changeSpeed(Number(e.target.value))}
                />
            </RightMiddle>
        </Container>
    );
}