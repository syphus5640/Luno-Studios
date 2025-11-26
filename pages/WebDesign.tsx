
import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Monitor, Smartphone, Zap, Layers, ExternalLink } from 'lucide-react';
import { useBooking } from '../src/context/BookingContext';

export const WebDesign: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <div className="pt-24">
       {/* Hero */}
       <section className="container mx-auto px-6 mb-24 text-center">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Digital Masterpieces
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            We craft high-performance websites that are visually stunning and technically flawless. From simple landing pages to complex web applications.
          </p>
          <button 
            onClick={() => openBooking('website')}
            className="px-10 py-4 bg-luno-accent text-luno-dark font-bold rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            Book a Consultation
          </button>
        </FadeIn>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-luno-dark/50 py-20">
        <div className="container mx-auto px-6">
          <FadeIn className="mb-12">
            <h2 className="text-3xl font-bold border-l-4 border-luno-accent pl-4">Recent Works</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                { 
                  name: "Nail Studio", 
                  type: "Beauty / Booking System", 
                  gradient: "from-pink-500 to-rose-600",
                  link: "https://nail-stuido.netlify.app/",
                  // Using local image (public/images/nail-studio.png)
                  image: "/images/nail-studio.png"
                },
                { 
                  name: "Auto Service Center", 
                  type: "Automotive / Business", 
                  gradient: "from-slate-700 to-slate-900",
                  link: "https://auto-service-center.netlify.app/",
                  // Using a reliable Unsplash image for Auto Service
                  image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop"
                }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <a 
                  href={item.link} 
                  target={item.link !== '#' ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-2xl aspect-video cursor-pointer bg-white/5 border border-white/10 hover:border-luno-accent/50 transition-colors"
                >
                   {/* Image or Gradient Placeholder */}
                   {item.image ? (
                      <div className="w-full h-full overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-luno-dark/50 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                   ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.gradient} opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105`}></div>
                   )}
                  
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ExternalLink size={20} className="text-white" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-luno-dark via-luno-dark/80 to-transparent z-10">
                    <h3 className="text-2xl font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.name}</h3>
                    <p className="text-luno-accent translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.type}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Smartphone />, title: "Responsive", desc: "Looks perfect on every device, from mobile to 4K monitors." },
            { icon: <Zap />, title: "Lightning Fast", desc: "Optimized code ensuring near-instant load times." },
            { icon: <Monitor />, title: "UX Focused", desc: "Designed with the user journey in mind to maximize conversions." },
            { icon: <Layers />, title: "Scalable", desc: "Built on modern frameworks that grow with your business." },
          ].map((feat, i) => (
            <FadeIn key={i} delay={i * 100} className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-luno-accent/40 hover:bg-white/10 transition-all">
              <div className="text-luno-accent mb-4">{feat.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-gray-400 text-sm">{feat.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn className="bg-gradient-to-r from-luno-light to-luno-base rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background deco */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-luno-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <h2 className="text-4xl font-bold mb-6 relative z-10">Ready to launch?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
              Schedule a free consultation today. Let's build something out of this world.
            </p>
            <button 
              onClick={() => openBooking('website')}
              className="px-12 py-5 bg-luno-accent text-luno-dark font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-xl relative z-10"
            >
              Book Consultation
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};
