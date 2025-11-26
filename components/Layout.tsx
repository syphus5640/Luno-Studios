import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StarBackground } from './StarBackground';
import { BookingModal } from './BookingModal';
import { useBooking } from '../src/context/BookingContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isBookingOpen, closeBooking } = useBooking();

  return (
    <div className="min-h-screen flex flex-col relative text-white bg-luno-base">
      {/* Navbar sits outside the fade wrapper to handle its own Logo z-indexing */}
      <Navbar />
      
      {/* Global Modal Instance */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      
      {/* Main Content Wrapper - Fades out when modal is open */}
      <div 
        className={`flex flex-col flex-grow transition-all duration-500 ease-in-out ${
          isBookingOpen ? 'opacity-30 blur-sm pointer-events-none grayscale-[50%]' : 'opacity-100 blur-0 grayscale-0'
        }`}
      >
        <StarBackground />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};