import ThreeScene from './ThreeScene';
// import heroImage from '/img/hero_placeholder.jpeg'; // mobile fallback image

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#4d224a] to-[#452a44] text-white overflow-hidden">

      {/* Background Canvas */}
      <div className="flex justify-center items-end">
        <div className="relative inset-0 w-full h-full pointer-events-auto">
          <ThreeScene sceneKey="hero" />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="absolute top-30 pointer-events-none z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen">

        {/* Left Column - Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-4 text-left pointer-events-auto">
          <p className="dosis-bold text-4xl md:text-6xl text-orange-400 drop-shadow-lg">
            Hi, I'm LeudiX
          </p>
          <p className="dosis-medium text-2xl md:text-3xl text-white">
            Web Developer & Creative Coder
          </p>
          <p className=" text-xl md:text-xl dosis-regular text-white">
            I build accessible, pixel-perfect digital experiences for the web.
          </p>
          {/*<div className="flex space-x-6 mt-4">
            <a href="#" className="hover:text-orange-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-orange-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Instagram</a>
          </div>*/}
        </div>

        {/* Right Column - 3D Scene or Image */}
        {/*<div className="flex-1 relative w-full h-[500px] md:h-full flex justify-end md:justify-center items-center">
          <div className="flex justify-center items-center w-[75%] h-[500px] md:h-[600px] ml-auto mr-[50%] md:mr-[100%]">
            <ThreeScene sceneKey="hero" />
          </div>
        </div>*/}

        {/* <div className="py-4">
            <img
              src={heroImage}
              alt="3D Preview"
              className="block md:hidden w-3/4 max-w-xs rounded-lg shadow-lg"
            />
          </div>*/}
      </div>
    </section>
  );
};

export default HeroSection;
