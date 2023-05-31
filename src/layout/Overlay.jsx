import { TopLeft, Container, RightMiddle, TopRight, Option } from "./styles";
import useFlock from "../stores/useFlock.js";

export default function Overlay() {
    const changeSpeed = useFlock((state) => state.changeSpeed);
    const speed = useFlock((state) => state.speed);
    const behavior = useFlock((state) => state.behavior);
    const nextBehavior = useFlock((state) => state.nextBehavior);
    const geometry = useFlock((state) => state.geometry);
    const nextGeometry = useFlock((state) => state.nextGeometry);

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
            <TopRight>
                <Option onClick={() => nextGeometry()}>{geometry}</Option>
                <br />
                <Option onClick={() => nextBehavior()}>{behavior}</Option>
            </TopRight>
            <RightMiddle>
                <span>{speed}</span>
                <input
                    type="range"
                    min="0.5"
                    max="2.4"
                    value={speed}
                    step="0.1"
                    autoFocus
                    onChange={(e) => changeSpeed(Number(e.target.value))}
                />
            </RightMiddle>
        </Container>
    );
}
