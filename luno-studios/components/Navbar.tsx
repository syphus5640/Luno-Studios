
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { MoonLogo } from './MoonLogo';
import { useBooking } from '../src/context/BookingContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [desktopProductOpen, setDesktopProductOpen] = useState(false);
  
  // New state to keep Navbar elevated during modal exit animation
  const [isElevated, setIsElevated] = useState(false);
  
  const location = useLocation();
  const { isBookingOpen } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Navbar Elevation Delay (sync with Modal fade duration)
  useEffect(() => {
    if (isBookingOpen) {
      setIsElevated(true);
    } else {
      const timer = setTimeout(() => {
        setIsElevated(false);
      }, 500); // Match the modal transition duration
      return () => clearTimeout(timer);
    }
  }, [isBookingOpen]);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setMobileProductOpen(false);
    setDesktopProductOpen(false);
  }, [location]);

  // Navbar transition styles
  // Z-INDEX LOGIC:
  // Normal: z-50
  // Elevated (Modal Open/Closing): z-[101] (Above Backdrop z-100, Below Modal z-102)
  const navClasses = `fixed top-0 w-full transition-[padding,background-color,backdrop-filter,box-shadow,opacity] duration-300 ${
    isElevated 
      ? 'z-[101] !bg-transparent pointer-events-none' 
      : 'z-50 pointer-events-auto'
  } ${
    scrolled && !isElevated ? 'bg-luno-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
  }`;

  const linkClasses = (path: string) => `
    relative text-white hover:text-luno-accent transition-colors duration-300 font-medium
    ${location.pathname === path ? 'text-luno-accent' : ''}
    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
    after:bottom-[-4px] after:left-0 after:bg-luno-accent after:origin-bottom-right 
    after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left
  `;
  
  // Disable pointer events when elevated (modal active)
  const dimmingClass = isElevated 
    ? 'pointer-events-none transition-all duration-300' 
    : 'transition-all duration-300';

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - Always bright, clickable if needed (pointer-events-auto overrides parent) */}
        <Link 
          to="/" 
          className={`flex items-center gap-3 group ${isElevated ? 'pointer-events-auto' : ''}`}
        >
          <MoonLogo size={32} animated={false} />
          <span className="text-2xl font-bold tracking-wider group-hover:text-luno-accent transition-colors">
            LUNO STUDIOS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 ${dimmingClass}`}>
          <Link to="/" className={linkClasses('/')}>Home</Link>
          <Link to="/about" className={linkClasses('/about')}>About Us</Link>
          <Link to="/reviews" className={linkClasses('/reviews')}>Reviews</Link>
          
          {/* Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDesktopProductOpen(true)}
            onMouseLeave={() => setDesktopProductOpen(false)}
          >
            <button 
              className="flex items-center gap-1 text-white hover:text-luno-accent transition-colors font-medium py-2"
              onClick={() => setDesktopProductOpen(!desktopProductOpen)}
            >
              Products <ChevronDown size={16} className={`transition-transform duration-300 ${desktopProductOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full right-0 pt-4 transition-all duration-300 ${desktopProductOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
              <div className={`w-64 bg-[#0f1229]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 p-2 transition-all duration-300 transform origin-top-right ${desktopProductOpen ? 'translate-y-0' : 'translate-y-4'}`}>
                <Link 
                  to="/products/ai-receptionist" 
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-luno-accent hover:text-luno-dark transition-all duration-200 font-medium mb-1"
                  onClick={() => setDesktopProductOpen(false)}
                >
                  AI Receptionist
                </Link>
                <Link 
                  to="/products/web-design" 
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-luno-accent hover:text-luno-dark transition-all duration-200 font-medium"
                  onClick={() => setDesktopProductOpen(false)}
                >
                  Web Design
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden text-white ${dimmingClass} pointer-events-auto`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-luno-dark/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} ${dimmingClass}`}>
        <div className="flex flex-col p-6 gap-4">
          <Link to="/" className="text-lg hover:text-luno-accent">Home</Link>
          <Link to="/about" className="text-lg hover:text-luno-accent">About Us</Link>
          <Link to="/reviews" className="text-lg hover:text-luno-accent">Reviews</Link>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setMobileProductOpen(!mobileProductOpen)}
              className="flex justify-between items-center text-lg hover:text-luno-accent"
            >
              Products <ChevronDown size={16} className={`transform transition-transform ${mobileProductOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductOpen && (
              <div className="pl-4 flex flex-col gap-3 mt-3 border-l-2 border-luno-accent/30">
                <Link to="/products/ai-receptionist" className="text-base text-gray-300 hover:text-luno-accent">AI Receptionist</Link>
                <Link to="/products/web-design" className="text-base text-gray-300 hover:text-luno-accent">Web Design</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
