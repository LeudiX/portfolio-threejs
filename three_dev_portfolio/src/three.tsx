import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'


const canvas = document.querySelector('canvas.webgl')

if (canvas) {
    // Scene
    const scene = new Three.Scene()

    // Camera
    const camera = new Three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(-5, 3, 5)
    camera.lookAt(new Three.Vector3(0, 0, 0))
    scene.add(camera)

    // 

    // Load the glb model
    const loader = new GLTFLoader()
    let mixer: Three.AnimationMixer | undefined //created global variable to store the animation mixer

    loader.load('/glb/silly_dancer01.glb', // .glb model

        function (gltf) { // callback
            const model = gltf.scene
            const animations = gltf.animations

            mixer = new Three.AnimationMixer(model)
            mixer.clipAction(animations[0]).play() //playing the 1st animation

            scene.add(model)
        })

    // Grid Helper
    const gridHelper = new Three.GridHelper(10, 10)
    scene.add(gridHelper)

    // Light
    const light = new Three.DirectionalLight(0xffffff, 1)
    light.position.set(-1, 3, 4)
    scene.add(light)

    // Renderer
    const renderer = new Three.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = Three.SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = false

    // Initializing the clock
    const clock = new Three.Clock()
    let lastElapsedTime = 0 // created a global variable to store the elapsed time

    // Animate Loop
    function animate() {
        //Rendering the scene
        renderer.render(scene, camera)

        //Updating the controls
        controls.update()

        // getting elapsed time and calculating the delta
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - lastElapsedTime
        lastElapsedTime = elapsedTime

        // Mixer update
        if (mixer != undefined) {
            mixer.update(deltaTime)
        }
        
        requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

}