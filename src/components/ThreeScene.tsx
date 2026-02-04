import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SceneManager } from '../three/sceneManager';
import scenes from '../three/config/sceneConfig';

interface ThreeSceneProps {
    sceneKey: keyof typeof scenes;
}

const ThreeScene = ({ sceneKey }: ThreeSceneProps) => {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const managerRef = useRef<SceneManager | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const config = scenes[sceneKey];
        const manager = new SceneManager(canvas, config);
        managerRef.current = manager;

        // Initial render
        manager.renderOnce();

        let animationFrameId: number | null = null;
        const containerEl = canvasContainerRef.current;

        const animate = (): void => {
            const mgr = managerRef.current;
            if (!mgr || mgr.isPaused) return;

            if (isHovered || !config.triggerAnimationOnHover) {
                mgr.update();
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animate();

        const handleResize = (): void => manager.resize();
        window.addEventListener('resize', handleResize);

        // GSAP fade-in effect on mount
        if (containerEl && config.canvas.triggerCanvasOnMouseMovement) {
            gsap.fromTo(
                containerEl,
                { opacity: 0, scale: 0.75 }, // Change in order to play with the size of the canvas
                { opacity: 1, scale: 0.9, duration: 0.5, ease: 'power2.out' }
            );
        }

        // Use IntersectionObserver to pause/resume rendering
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                const mgr = managerRef.current;
                if (!mgr) return;

                if (entry.isIntersecting) {
                    mgr.resume();
                    mgr.renderOnce();
                } else {
                    mgr.pause();
                }
            },
            { threshold: 0.2 }
        );

        const container = canvasContainerRef.current;
        if (container && observerRef.current) {
            observerRef.current.observe(container);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            if (observerRef.current && container) {
                observerRef.current.unobserve(container);
            }

            if (managerRef.current) {
                managerRef.current.dispose();
                managerRef.current = null;
            }
        };
    }, [sceneKey, isHovered]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        const container = canvasContainerRef.current;
        const config = scenes[sceneKey];
        if (!container || !config.canvas.triggerCanvasOnMouseMovement) return;

        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(container, {
            rotationY: x * 10,
            rotationX: -y * 10,
            ease: 'power2.out',
            duration: 0.4,
            transformPerspective: 600,
        });
    };

    const handleMouseLeave = (): void => {
        const container = canvasContainerRef.current;
        if (!container) return;

        gsap.to(container, {
            rotationY: 0,
            rotationX: 0,
            ease: 'power2.out',
            duration: 0.6,
        });

        setIsHovered(false);
    };

    const handleMouseEnter = (): void => {
        setIsHovered(true);
        if (managerRef.current) {
            managerRef.current.needsRender = true;
        }
    };

    return (
        <div
            ref={canvasContainerRef}
            className="relative w-full h-full transition-transform duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <canvas ref={canvasRef} className="webgl w-full h-full" />
        </div>
    );
};

export default ThreeScene;
