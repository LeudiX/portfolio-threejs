import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
//import ThreeScene from './ThreeScene';
import { projectsData } from '../data/projectsData';

const ITEMS_PER_PAGE = 4;

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const displayedProjects = projectsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#b36013] to-[#b36013] text-white overflow-hidden py-10 sm:py-0">
      {/* Background Canvas */}
      {/*<div className="hidden md:flex justify-center items-end">
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <ThreeScene sceneKey="projects" />
        </div>
      </div>*/}

      {/* Foreground Content */}
      <div className="relative pointer-events-none z-10 container mx-auto px-4 md:px-2 flex flex-col justify-center items-center min-h-screen space-y-10">
        <h2 className="text-4xl md:text-6xl dosis-bold text-[#4d224a] drop-shadow-lg text-center">Projects</h2>

        {/* Grid of Projects */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full pointer-events-auto"
        >
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="rounded-xl p-1 shadow-lg hover:shadow-[#4d224a] transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h5 className="text-md dosis-bold text-[#4d224a] mb-2">{project.title}</h5>
                <p className="text-md dosis-medium text-white mb-3 line-clamp-4">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs dosis-medium bg-linear-to-r from-[#4d224a] to-[#6a3066] text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4d224a] hover:text-[#6a3066] text-sm dosis-semibold"
              >
                View Repository →
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex space-x-4 md:mt-6 pointer-events-auto">
          <button
            onClick={prevPage}
            className="px-4 py-1 shadow-lg rounded-full text-xs cursor-pointer font-medium  bg-[#4d224a] hover:bg-[#6a3066] transition-colors"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            className="px-4 py-1 shadow-lg rounded-full text-xs cursor-pointer font-medium   bg-[#4d224a] hover:bg-[#6a3066] transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;