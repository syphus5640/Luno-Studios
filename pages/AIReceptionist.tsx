
import React, { useRef } from 'react';
import { FadeIn } from '../components/FadeIn';
import { Mic, Clock, BarChart, Phone } from 'lucide-react';
import { RetellDemo } from '../components/RetellDemo';
import { useBooking } from '../src/context/BookingContext';

export const AIReceptionist: React.FC = () => {
  const { openBooking } = useBooking();
  const demoSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <FadeIn className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luno-accent/10 text-luno-accent font-semibold text-sm mb-6 border border-luno-accent/20">
            <Mic size={16} />
            <span>Next Gen Voice AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Receptionist That <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-luno-accent to-orange-400">Never Sleeps</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Handle missed calls, schedule appointments, and answer FAQs instantly with a human-like voice assistant available 24/7.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
            <button 
                onClick={() => openBooking('receptionist')}
                className="px-8 py-4 bg-luno-accent text-luno-dark font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,212,59,0.4)]"
            >
                Book a Consultation
            </button>
            <button 
                onClick={scrollToDemo}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
            >
                Start Free Demo
            </button>
            </div>
        </FadeIn>
      </section>

      {/* Features (How It Works) - MOVED UP */}
      <section className="bg-white/5 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Seamless integration into your existing phone lines.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Phone size={32} />, title: "Instant Pickup", desc: "Zero hold times. Every caller is greeted immediately by a friendly, professional voice." },
              { icon: <Clock size={32} />, title: "24/7 Availability", desc: "Nights, weekends, holidays. Your business is always open for inquiries." },
              { icon: <BarChart size={32} />, title: "Live Analytics", desc: "Track call volume, sentiment analysis, and conversion rates in real-time." }
            ].map((feat, i) => (
              <FadeIn key={i} delay={i*150} direction="up">
                <div className="bg-luno-dark p-8 rounded-2xl border border-white/5 hover:border-luno-accent/30 transition-all h-full">
                  <div className="w-14 h-14 bg-luno-light rounded-full flex items-center justify-center text-luno-accent mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-gray-400">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO SECTION - MOVED DOWN */}
      <section ref={demoSectionRef} className="py-24 bg-luno-light/10 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <FadeIn>
                <h2 className="text-4xl font-bold mb-6">Experience it Live</h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Don't just take our word for it. Have a real conversation with our AI right now. 
                  Ask about pricing, scheduling, or just say hello.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-luno-accent/20 flex items-center justify-center text-luno-accent"><Mic size={16} /></div>
                    <span>Zero Latency (Sub-800ms)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-luno-accent/20 flex items-center justify-center text-luno-accent"><Phone size={16} /></div>
                    <span>Human-like Intonation</span>
                  </li>
                </ul>
              </FadeIn>
            </div>
            <div className="md:w-1/2 w-full">
              <FadeIn direction="left" delay={200}>
                <RetellDemo />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
