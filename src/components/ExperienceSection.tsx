import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ThreeScene from './ThreeScene';
import { experienceData } from '../data/experienceData'; // experince information

interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string[];
    icon: string;
}

const ExperienceSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const items = [...experienceData] as ExperienceItem[];

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
        }
    }, [activeIndex]);

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#1a120b] to-[#e27108] text-white overflow-hidden">
            {/* Background Canvas */}
            <div className="hidden md:flex justify-center items-end">
                <div className="absolute inset-0 w-full h-full pointer-events-auto">
                    <ThreeScene sceneKey="experience" />
                </div>
            </div>

            {/* Foreground Content */}
            <div className="relative pointer-events-none z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen">
                {/* Timeline -  Right Side (Medium Devices) */}
                <div className="w-[50%] md:w-1/2 flex md:flex-col justify-center md:items-end relative md:pr-12">
                    {/* Vertical Line */}
                    <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#e27108] to-[#1a120b] hidden md:block pointer-events-auto"></div>

                    {/* Dots */}
                    <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 z-20 pointer-events-auto">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                title={item.title}
                                aria-label={item.title}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer pointer-events-auto ${index === activeIndex
                                    ? 'bg-[#e27108] border-[#e27108] scale-110'
                                    : 'bg-transparent border-orange-400 hover:bg-orange-400'
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* Content - Left Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left space-y-6 md:pl-10 pointer-events-auto" ref={contentRef}>
                    <div className="text-xl pt-12 md:text-2xl font-bold text-orange-400 drop-shadow-lg md:flex items-center space-x-3">   
                        <h3><span>{items[activeIndex].icon}</span> {items[activeIndex].title}</h3>
                    </div>
                    <h4 className="text-xl md:text-2xl text-orange-200">
                        {items[activeIndex].company} • {items[activeIndex].period}
                    </h4>
                    <ul className="list-disc leading-relaxed pl-5 space-y-2 text-sm text-orange-100">
                        {items[activeIndex].description.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
