
import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/FadeIn';
import { MoonLogo } from '../components/MoonLogo';
import { CheckCircle } from 'lucide-react';

export const Cancellation: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto relative z-10">
        
        <FadeIn delay={100} className="flex justify-center mb-8">
            <div className="relative">
                <MoonLogo size={100} className="animate-float" />
                <div className="absolute -bottom-2 -right-2 bg-luno-dark rounded-full p-2 border border-white/10">
                    <CheckCircle className="text-red-400" size={32} />
                </div>
            </div>
        </FadeIn>

        <FadeIn delay={300}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Cancellation Confirmed
          </h1>
        </FadeIn>

        <FadeIn delay={500}>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Your consultation has been successfully canceled. <br />
            You will receive a confirmation email shortly.
          </p>
        </FadeIn>

        <FadeIn delay={700}>
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-luno-accent hover:text-luno-accent transition-all duration-300"
          >
            Return Home
          </Link>
        </FadeIn>
      </div>
      
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luno-accent/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
