import React from 'react';
import { Link } from 'react-router-dom';
import { MoonLogo } from './MoonLogo';
import { Instagram, Linkedin, Mail } from 'lucide-react';

// Custom X Logo SVG since it's specific
const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-luno-dark pt-20 pb-10 overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luno-accent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <MoonLogo size={32} animated={false} />
              <span className="text-2xl font-bold">LUNO STUDIOS</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Illuminating the digital space with intelligent design and automated solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-luno-accent hover:text-luno-dark transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-luno-accent hover:text-luno-dark transition-all duration-300">
                <XLogo size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-luno-accent hover:text-luno-dark transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b-2 border-luno-accent inline-block pb-1">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-luno-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-luno-accent transition-colors">About Us</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-luno-accent transition-colors">Reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b-2 border-luno-accent inline-block pb-1">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/products/ai-receptionist" className="text-gray-400 hover:text-luno-accent transition-colors">AI Receptionist</Link></li>
              <li><Link to="/products/web-design" className="text-gray-400 hover:text-luno-accent transition-colors">Web Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b-2 border-luno-accent inline-block pb-1">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="shrink-0 text-luno-accent" size={20} />
                <a href="mailto:support@lunostudios.com" className="hover:text-white transition-colors">support@lunostudios.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Luno Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};