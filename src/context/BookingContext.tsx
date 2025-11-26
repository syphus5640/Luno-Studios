import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BookingType = 'receptionist' | 'website' | 'general';

interface BookingContextType {
  isBookingOpen: boolean;
  bookingType: BookingType;
  openBooking: (type?: BookingType) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>('general');

  const openBooking = (type: BookingType = 'general') => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const closeBooking = () => setIsBookingOpen(false);

  return (
    <BookingContext.Provider value={{ isBookingOpen, bookingType, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
