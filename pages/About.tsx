
import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Users, Target, Lightbulb } from 'lucide-react';

const TeamCard: React.FC<{ name: string; role: string; img: string; delay: number }> = ({ name, role, img, delay }) => (
  <FadeIn delay={delay} className="group">
    <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-luno-accent/10">
      <div className="aspect-square overflow-hidden">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
        />
      </div>
      <div className="p-6 text-center relative bg-luno-base">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-luno-accent text-sm uppercase tracking-wider">{role}</p>
      </div>
    </div>
  </FadeIn>
);

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="container mx-auto px-6 mb-24 text-center">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a collective of dreamers, designers, and engineers obsessed with the intersection of art and artificial intelligence.
          </p>
        </FadeIn>
      </div>

      {/* Mission / Vision */}
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn direction="up" delay={200} className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-luno-accent/30 transition-colors">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-luno-accent flex items-center justify-center text-luno-dark mb-6">
                  <Target size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-gray-400 leading-relaxed">
                    To democratize access to high-end digital tools. We believe every business, regardless of size, deserves a website that stuns and an AI system that scales.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={400} className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-luno-accent/30 transition-colors">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white mb-6">
                  <Lightbulb size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-gray-400 leading-relaxed">
                    A future where technology feels human. We strive to create digital experiences that are not just functional, but emotional, intuitive, and genuinely helpful.
                  </p>
                </div>
              </div>
            </FadeIn>
        </div>
      </div>

      {/* Team */}
      <div className="bg-luno-dark/50 py-24">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="inline-block p-3 rounded-full bg-white/5 mb-4">
              <Users size={24} className="text-luno-accent" />
            </div>
            <h2 className="text-4xl font-bold">Meet the Crew</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              The minds behind the moon. We bring together diverse backgrounds in coding, psychology, and fine arts.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard name="Alex Luna" role="Founder & CEO" img="https://picsum.photos/400/400?random=101" delay={0} />
            <TeamCard name="Sarah Chen" role="Lead AI Engineer" img="https://picsum.photos/400/400?random=102" delay={100} />
            <TeamCard name="Marcus Cole" role="Creative Director" img="https://picsum.photos/400/400?random=103" delay={200} />
            <TeamCard name="Jessica Lee" role="UX Specialist" img="https://picsum.photos/400/400?random=104" delay={300} />
          </div>
        </div>
      </div>
    </div>
  );
};
