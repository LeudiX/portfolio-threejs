import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ThreeScene from './ThreeScene';

gsap.registerPlugin(SplitText);

const keywords = [
    'HTML5', 'CSS3', 'JavaScript', 'Python',
    'React', 'Django', 'Odoo',
    'Responsive Design', 'Cross-browser', 'Web Performance',
];

const AboutSection = () => {
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            const split = new SplitText(textRef.current, { type: 'words' });
            gsap.from(split.words, {
                opacity: 0,
                y: 30,
                stagger: 0.05,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#1a120b] to-[#e27108] text-white overflow-hidden">

            {/* Background Canvas */}
            <div className="hidden md:flex justify-center items-end">
                <div className="absolute inset-0 w-full h-full pointer-events-auto">
                    <ThreeScene sceneKey="about" />
                </div>
            </div>

            {/* Foreground Text */}
            <div className="relative pointer-events-none z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen space-y-10 md:space-y-0">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 text-left pointer-events-auto">
                    <p className="text-4xl md:text-6xl dosis-bold text-orange-400 drop-shadow-lg">
                        About Me
                    </p>
                    <p
                        ref={textRef}
                        className="max-w-md dosis-medium text-md leading-relaxed text-justify text-orange-100"
                    >
                        Creative Web Developer and Computer Science teacher with over 2 years of hands-on experience building digital solutions across multiple industries. Skilled in HTML5, CSS3, JavaScript, and Python, with a strong focus on modern frameworks like React, Django, and Odoo. Passionate about responsive design, cross-browser compatibility, and web performance optimization.
                    </p>

                    {/* Keywords Pills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {keywords.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-full text-sm dosis-medium bg-linear-to-l from-[#e27108] to-[#1a120b] text-white shadow-md"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
