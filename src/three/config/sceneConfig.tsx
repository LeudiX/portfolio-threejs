
// ! Assets imports
import silly_dancer01 from "/glb/silly_dancer01.glb";
import type { SceneConfig } from "./sceneConfig.d";
/** 
 * * Generic configuration file or all 3d scenes loaded in the project
 **/
export const scenes: Record<string, SceneConfig> = {
    hero: {
        canvas: {
            alpha: false, // 🔧 (alpha: sets background to transparent or not) 
            triggerCanvasOnMouseMovement: true,
        },
        camera: {
            fov: 35,
            near: 0.1,
            far: 1000,
            position: [1, 2, 5],
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
            path: silly_dancer01,
            yOffset: -0.5, // 🔧 adjust this value (0.3–1.0) to move the over the plane on y axys
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
            path: silly_dancer01,
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
            path: silly_dancer01,
            yOffset: -0.5,
            xOffset: -2.5,
        },
        triggerAnimationOnHover: true
    },
    projects: {
        canvas: {
            alpha: false,
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
        model: {
            path: silly_dancer01,
            yOffset: -0.5,
        },
        triggerAnimationOnHover: true
    },
    contact: {
        canvas: {
            alpha: true,
            triggerCanvasOnMouseMovement: true,
        },
        camera: {
            fov: 28,
            near: 0.1,
            far: 1200,
            position: [0, 3, 5],
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
            path: silly_dancer01,
            yOffset: -0.5,
        },
        triggerAnimationOnHover: true
    },
};

export default scenes;
