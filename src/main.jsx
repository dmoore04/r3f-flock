import Flock from "./Flock.jsx";
import "./style.css";
import { FadeIn, LeftMiddle } from "./layout/styles.js";
import { Suspense, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
    const [speed, setSpeed] = useState(1.2);

    return (
        <>
            <Suspense fallback={null}>
                <Flock speed={speed} />
                {/* <FadeIn /> */}
            </Suspense>
            <LeftMiddle>
                <input
                    type="range"
                    min="0.5"
                    max="2.4"
                    value={speed}
                    step="0.01"
                    onChange={(e) => setSpeed(Number(e.target.value))}
                />
            </LeftMiddle>
        </>
    );
}

createRoot(document.getElementById("root")).render(<App />);
