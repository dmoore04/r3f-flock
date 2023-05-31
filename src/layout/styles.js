import styled, { keyframes } from "styled-components";

export const fade = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const RightMiddle = styled.div`
    position: absolute;
    bottom: 50%;
    right: 5vw;
    font-family: "Inter";
    font-weight: 400;
    line-height: 1em;
    letter-spacing: -0.01em;
    font-size: 12px;
    transform: rotate(-90deg) translate3d(50%, 0, 0);
    transform-origin: 100% 50%;
`;

export const FadeIn = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: black;
    animation: ${fade} 4s normal forwards ease-in-out;
`;
