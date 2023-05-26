import ReactDOM from "react-dom/client";
import App from "./Experience.jsx";
import "./style.css";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Canvas
        shadows
        camera={{
            fov: 60,
            near: 0.1,
            far: 200,
            position: [0, 8, 0],
        }}
    >
        <App />
    </Canvas>
);
