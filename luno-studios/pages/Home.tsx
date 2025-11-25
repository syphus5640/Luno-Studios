
import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/FadeIn';
import { MoonLogo } from '../components/MoonLogo';
import { ArrowRight, Bot, PenTool, Star, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn delay={100} className="flex justify-center mb-8">
            <MoonLogo size={120} className="animate-float" />
          </FadeIn>
          <FadeIn delay={300}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-luno-accent">
              Where Smart Design Meets <br />
              <span className="text-luno-accent drop-shadow-lg">Intelligent Automation</span>
            </h1>
          </FadeIn>
          <FadeIn delay={500}>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Elevate your digital presence with Luno Studios. We blend aesthetic web design with cutting-edge AI receptionists to capture every lead.
            </p>
          </FadeIn>
          <FadeIn delay={700}>
            <div className="flex justify-center">
              <Link 
                to="/about" 
                className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </FadeIn>
        </div>
        
        {/* Decorative floating elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </section>

      {/* What We Do */}
      <section className="py-24 bg-luno-light/10 relative">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <span className="text-luno-accent font-bold uppercase tracking-widest text-sm">Our Expertise</span>
              <h2 className="text-4xl font-bold mt-2">What Luno Studios Does</h2>
              <div className="w-20 h-1 bg-luno-accent mx-auto mt-4 rounded-full" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="left" delay={200}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-luno-accent/50 transition-colors h-full">
                <div className="w-16 h-16 bg-luno-accent/20 rounded-2xl flex items-center justify-center mb-6 text-luno-accent">
                  <Bot size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Receptionists</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Never miss a call again. Our intelligent voice assistants handle inquiries, bookings, and customer support 24/7 with human-like natural conversation.
                </p>
                <Link to="/products/ai-receptionist" className="text-luno-accent font-semibold hover:underline flex items-center gap-2">
                  Explore AI Solutions <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={400}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-luno-accent/50 transition-colors h-full">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                  <PenTool size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Modern Web Design</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Stunning, responsive, and conversion-optimized websites that tell your brand story. We build digital experiences that leave a lasting impression.
                </p>
                <Link to="/products/web-design" className="text-purple-400 font-semibold hover:underline flex items-center gap-2">
                  View Portfolio <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
            <FadeIn direction="up" className="text-center max-w-4xl mx-auto">
              <span className="text-luno-accent font-bold uppercase tracking-widest text-sm">Why Us</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Future-Proof Your Business</h2>
              <p className="text-gray-300 mb-12">
                We don't just build websites or bots; we build ecosystems that grow with you. Our unique blend of artistic vision and technical engineering ensures you stay ahead of the curve.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  "Custom-tailored strategies for your niche",
                  "Seamless integration of AI into workflows",
                  "Mobile-first, lightning-fast designs",
                  "Ongoing support and optimization"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-lg p-4 bg-white/5 rounded-xl border border-white/5">
                    <CheckCircle className="text-luno-accent shrink-0" size={24} />
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 bg-gradient-to-b from-luno-base to-luno-dark relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl font-bold mb-12">Trusted by Innovators</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { quote: "Luno Studios completely transformed how we handle client intake. The AI receptionist alone has saved us 20 hours a week.", name: "Sarah Jenkins", role: "CEO, TechFlow", initials: "SJ" },
                { quote: "The web design exceeded all our expectations. It's fast, beautiful, and converts visitors into paying customers.", name: "Mark Davis", role: "Founder, Davis Co", initials: "MD" },
                { quote: "Incredible support and technology. They truly understand what modern businesses need to succeed.", name: "Elena Rodriguez", role: "Director, ArtSpace", initials: "ER" }
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 200} className="h-full">
                <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all h-full flex flex-col">
                  <div className="flex gap-1 text-luno-accent mb-4 justify-center">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-300 italic mb-6 flex-grow">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-luno-accent text-luno-dark font-bold flex items-center justify-center text-sm">
                        {t.initials}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12">
            <Link to="/reviews" className="inline-block text-white border-b border-luno-accent pb-1 hover:text-luno-accent transition-colors">
              Read all reviews &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
