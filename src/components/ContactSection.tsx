import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { QRCodeCanvas } from 'qrcode.react';
import ThreeScene from './ThreeScene';
//! React DevIcons
import { GithubOriginal } from 'devicons-react';
import { LinkedinPlain } from 'devicons-react';
import { GooglePlain } from 'devicons-react';
//? React SimpleIcons
import { SiWhatsapp } from 'react-icons/si';

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );
    }
    if (qrRef.current) {
      // Creating a subtle animation pulse on hover
      const qr = qrRef.current;
      qr.addEventListener('mouseenter', () => {
        gsap.to(qr, {
          scale: 1.1,
          boxShadow: '0 0 25px #e27108',
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      qr.addEventListener('mouseleave', () => {
        gsap.to(qr, {
          scale: 1,
          boxShadow: '0 0 0px transparent',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    }
  }, []);

  const contactInfo = {
    email: 'mailto:leudix.rafael@gmail.com',
    phone: 'https://alvo.chat/6WcB',
    github: 'https://github.com/LeudiX',
    linkedin: 'https://www.linkedin.com/in/leudis-estrada/'
  };

  const qrData = `Whatsapp: ${contactInfo.phone}\nEmail: ${contactInfo.email}\nGitHub: ${contactInfo.github}\nLinkedIn: ${contactInfo.linkedin}`;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-l from-[#1a120b] to-[#e27108] text-white overflow-hidden">
      {/* Background Canvas */}
      <div className="flex justify-center items-end">
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <ThreeScene sceneKey="contact" />
        </div>
      </div>

      {/* Foreground Content */}
      <div
        ref={containerRef}
        className="relative pointer-events-none z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen space-y-10 md:space-y-0"
      >
        {/* Left Text Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 text-left pointer-events-auto">
          <h2 className="text-4xl md:text-6xl dosis-bold text-orange-400 drop-shadow-lg">Contact Me</h2>
          <p className="max-w-md text-orange-100 text-lg dosis-medium text-justify">
            Feel free to reach out for collaborations, freelance opportunities, or tech discussions.
            You can contact me directly or simply scan the QR code to access all my details.
          </p>
          <div className="space-y-2 text-orange-200 text-sm">
            <span className='flex flex-row gap-2.5'>
              <a href={contactInfo.phone} target="_blank"><SiWhatsapp size={20} color='#181616' /></a>
              <a href={contactInfo.email} target="_blank"><GooglePlain size={20} color='#181616' /></a>
              <a href={contactInfo.github} target="_blank"><GithubOriginal size={20} /></a>
              <a href={contactInfo.linkedin} target="_blank"><LinkedinPlain size={20} color='#181616' /></a>
            </span>
          </div>
        </div>

        {/* Right Column - QR Code */}
        <div className="w-full md:w-1/2 flex justify-center items-center pointer-events-auto">
          <div ref={qrRef} className="p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4 cursor-pointer">
            <QRCodeCanvas value={qrData} size={180} level="Q" marginSize={4} />
            <p className="text-orange-300 text-sm dosis-light text-center">Scan the code to view my contact info</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
