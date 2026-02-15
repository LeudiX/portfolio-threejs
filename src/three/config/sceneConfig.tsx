
// ! Assets imports
import typing_code from "/glb/sweater_typing_code.glb";
import break_dance from "/glb/formal_break_dance.glb";
import sitting_idle from "/glb/tshort_sitting_idle.glb";
import phone_talking from "/glb/sweater_phone_talking.glb";
import type { SceneConfig } from "./sceneConfig.d";
/** 
 * * Generic configuration file or all 3d scenes loaded in the project
 **/
export const scenes: Record<string, SceneConfig> = {
    hero: {
        canvas: {
            alpha: true, // 🔧 (alpha: sets background to transparent or not) 
            triggerCanvasOnMouseMovement: false,
        },
        camera: {
            fov: 20,
            near: 0.1,
            far: 1000,
            position: [5, 2, -5],
        },
        light: {
            position: [-1, 3, 4],
        },
        controls: {
            autoRotate: false,
        },
        helpers: {
            grid: false,
        },
        model: {
            path: typing_code,
            yOffset: 0, // 🔧 adjust this value (0.3–1.0) to move the over the plane on y axys
            xOffset: 0, // 🔧 adjust this value (0.3–1.0) to move the over the plane on x axys
        },
        triggerAnimationOnHover: true
    },
    about: {
        canvas: {
            alpha: true,
            triggerCanvasOnMouseMovement: false,
        },
        camera: {
            fov: 30,
            near: 0.1,
            far: 1000,
            position: [2, 2, 6],
        },
        light: {
            position: [2, 4, 3],
        },
        controls: {
            autoRotate: false,
        },
        helpers: {
            grid: false,
        },
        model: {
            path: break_dance,
            yOffset: -0.3,
            xOffset: 2,
        },
        triggerAnimationOnHover: true
    },
    experience: {
        canvas: {
            alpha: true,
            triggerCanvasOnMouseMovement: false,
        },
        camera: {
            fov: 30,
            near: 0.1,
            far: 1000,
            position: [2, 2, 6],
        },
        light: {
            position: [2, 4, 3],
        },
        controls: {
            autoRotate: false,
        },
        helpers: {
            grid: false,
        },
        model: {
            path: sitting_idle,
            yOffset: -0.5,
            xOffset: -2.5,
        },
        triggerAnimationOnHover: true
    },
    projects: {
        canvas: {
            alpha: true,
            triggerCanvasOnMouseMovement: false,
        },
        camera: {
            fov: 35,
            near: 0.1,
            far: 1500,
            position: [5, 4, 8],
        },
        light: {
            position: [-3, 6, 5],
        },
        controls: {
            autoRotate: false,
        },
        helpers: {
            grid: false,
        },
        triggerAnimationOnHover: true
    },
    contact: {
        canvas: {
            alpha: true,
            triggerCanvasOnMouseMovement: false,
        },
        camera: {
            fov: 30,
            near: 0.1,
            far: 1000,
            position: [0, 1, 5],
        },
        light: {
            position: [1, 4, 2],
        },
        controls: {
            autoRotate: false,
        },
        helpers: {
            grid: false,
        },
        model: {
            path: phone_talking,
            yOffset: -0.3,
        },
        triggerAnimationOnHover: true
    },
};

export default scenes;
