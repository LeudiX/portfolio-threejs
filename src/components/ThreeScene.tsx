import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { SceneManager } from '../three/sceneManager';
import { scenes } from '../three/config/sceneConfig';

interface ThreeSceneProps {
    sceneKey: keyof typeof scenes;
}

const ThreeScene = ({ sceneKey }: ThreeSceneProps) => {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const managerRef = useRef<SceneManager | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        const config = scenes[sceneKey]; // Getting scene config
        // Initialize SceneManager
        const manager = new SceneManager(canvasRef.current, config);
        managerRef.current = manager;

        let animationFrameId: number;
        const containerEl = canvasContainerRef.current; // saving canvas container for current ref value

        // Animation loop
        const animate = () => {
            if (managerRef.current && isVisible) {
                // Only update when hovered OR when triggerAnimationOnHover is false
                if (isHovered || !config.triggerAnimationOnHover) {
                    managerRef.current.update();
                } else {
                    managerRef.current.renderFrame(); // Static frame renderer
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            manager.resize();
        };
        window.addEventListener('resize', handleResize);

        // GSAP fade-in effect on mount
        if (containerEl) {
            gsap.fromTo(
                containerEl,
                { opacity: 0, scale: 0.75 }, // Change in order to play with the size of the canvas
                { opacity: 1, scale: 0.9, duration: 0.5, ease: 'power2.out' }
            );
        }

        // Intersection Observer to pause when off-screen
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.15 });

        if (containerEl) {
            observer.observe(containerEl);
        }

        // Cleanup
        return () => {
            window.addEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (containerEl) observer.unobserve(containerEl);
            manager.dispose();
            managerRef.current = null;
        };
    }, [sceneKey, isHovered, isVisible]);

    // Parallax-like tilt animation on hover
    const handleMouseMove = (e: React.MouseEvent) => {
        const config = scenes[sceneKey]; // Getting scene config
        if (!canvasContainerRef.current || !config.canvas.triggerCanvasOnMouseMovement) return;
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(canvasContainerRef.current, {
            rotationY: x * 10,
            rotationX: -y * 10,
            ease: 'power2.out',
            duration: 0.4,
            transformPerspective: 600,
        });
    };

    const handleMouseLeave = () => {
        const config = scenes[sceneKey]; // Getting scene config
        if (!canvasContainerRef.current || !config.canvas.triggerCanvasOnMouseMovement) return;
        gsap.to(canvasContainerRef.current, {
            rotationY: 0,
            rotationX: 0,
            ease: 'power2.out',
            duration: 0.6,
        });
        setIsHovered(false);
    };

    return (
        <div ref={canvasContainerRef} className="relative w-full h-full transition-transform duration-300"
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <canvas
                ref={canvasRef}
                className="webgl w-full h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </div>
    )
};

export default ThreeScene;
