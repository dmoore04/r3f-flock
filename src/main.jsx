import Flock from "./Flock.jsx";
import "./style.css";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Overlay from "./layout/Overlay.jsx";
import useFlock from "./stores/useFlock.js";
import WindowFocusHandler from "./layout/WindowFocusHandler.jsx";

/**
 * Thanks to 0xca0a for the great examples.
 * Flying bananas sandbox (https://codesandbox.io/s/2ycs3?file=/src/index.js:29-35)
 * made the overlay here super easy to implement.
 *
 * Yuka seek example (https://codesandbox.io/s/yuka-seek-demo-with-react-three-fiber-forked-tnv3q)
 * also provided a great base for the flocking behavior.
 *
 * And of course thanks to Bruno Simon for Three.js Journey!
 */
function App() {
  const flockCount = useFlock((state) => state.count);

  return (
    <>
      <Suspense fallback={null}>
        <Flock count={flockCount} />
      </Suspense>
      <Overlay />
      <WindowFocusHandler />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
