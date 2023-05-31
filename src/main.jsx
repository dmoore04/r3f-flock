import Flock from "./Flock.jsx";
import "./style.css";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Overlay from "./layout/Overlay.jsx";
import useFlock from "./stores/useFlock.js";

function App() {
    const flockCount = useFlock((state) => state.count);

    return (
        <>
            <Suspense fallback={null}>
                <Flock count={flockCount} />
            </Suspense>
            <Overlay />
        </>
    );
}

createRoot(document.getElementById("root")).render(<App />);
