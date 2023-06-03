import {
  TopLeft,
  Container,
  RightMiddle,
  TopRight,
  Option,
  BottomLeft,
  BottomRight,
} from "./styles";
import useFlock from "../stores/useFlock.js";
import {
  AiOutlineFullscreen as OpenFullscreen,
  AiOutlineFullscreenExit as ExitFullscreen,
} from "react-icons/ai";
import { useState } from "react";

export default function Overlay() {
  const [fullscreen, setFullscreen] = useState(false);
  const changeSpeed = useFlock((state) => state.changeSpeed);
  const speed = useFlock((state) => state.speed);
  const behavior = useFlock((state) => state.behavior);
  const nextBehavior = useFlock((state) => state.nextBehavior);
  const geometry = useFlock((state) => state.geometry);
  const nextGeometry = useFlock((state) => state.nextGeometry);

  return (
    <Container>
      <TopLeft>
        <h1>FLOCK</h1>
        <p>R3F & Yuka</p>
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
      <BottomLeft>
        <a href="https://github.com/dmoore04/r3f-flock">GitHub</a>
      </BottomLeft>
      <BottomRight>
        <Option
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
              setFullscreen(false);
            } else {
              document.getElementById("root").requestFullscreen();
              setFullscreen(true);
            }
          }}
        >
          {fullscreen ? <ExitFullscreen /> : <OpenFullscreen />}
        </Option>
      </BottomRight>
    </Container>
  );
}
