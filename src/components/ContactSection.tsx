import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { QRCodeCanvas } from 'qrcode.react';
import ThreeScene from './ThreeScene';

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
    email: 'leudix.rafael@gmail.com',
    phone: '+53 53459909',
    github: 'https://github.com/LeudiX',
    linkedin: 'https://linkedin.com/in/leudix'
  };

  const qrData = `Phone: ${contactInfo.phone}\nEmail: ${contactInfo.email}\nGitHub: ${contactInfo.github}\nLinkedIn: ${contactInfo.linkedin}`;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#1a120b] to-[#e27108] text-white overflow-hidden">
      {/* Background Canvas */}
      <div className="flex justify-center items-end">
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <ThreeScene sceneKey="contact" />
        </div>
      </div>

      {/* Foreground Content */}
      <div
        ref={containerRef}
        className="absolute pointer-events-none z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-screen space-y-10 md:space-y-0"
      >
        {/* Left Text Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-orange-400 drop-shadow-lg">Contact Me</h2>
          <p className="max-w-md text-orange-100 text-md leading-relaxed">
            Feel free to reach out for collaborations, freelance opportunities, or tech discussions.
            You can contact me directly or simply scan the QR code to access all my details.
          </p>
          <div className="space-y-2 text-orange-200 text-sm">
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
            <p><strong>GitHub:</strong> <a href={contactInfo.github} target="_blank" className="text-orange-400 hover:text-orange-300">{contactInfo.github}</a></p>
            <p><strong>LinkedIn:</strong> <a href={contactInfo.linkedin} target="_blank" className="text-orange-400 hover:text-orange-300">{contactInfo.linkedin}</a></p>
          </div>
        </div>

        {/* Right Column - QR Code */}
        <div className="w-full md:w-1/2 flex justify-center items-center pointer-events-auto">
          <div ref={qrRef} className="p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4">
            <QRCodeCanvas value={qrData} size={180} level="Q" marginSize={4} />
            <p className="text-orange-300 text-md text-center">Scan the code to view my contact info</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
