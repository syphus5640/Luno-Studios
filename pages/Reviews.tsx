
import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Star, Quote } from 'lucide-react';

const reviewsData = [
  { id: 1, name: "John Doe", role: "Small Business Owner", text: "The AI receptionist has completely changed how we handle after-hours calls. Incredible ROI.", rating: 5, initials: "JD" },
  { id: 2, name: "Jane Smith", role: "Marketing Director", text: "Luno Studios designed a website that perfectly captures our brand voice. Highly recommended!", rating: 5, initials: "JS" },
  { id: 3, name: "Mike Johnson", role: "Tech Startup CEO", text: "Fast, professional, and cutting-edge. The team really understands modern tech needs.", rating: 4, initials: "MJ" },
  { id: 4, name: "Emily Davis", role: "Restaurateur", text: "Automated reservations are a lifesaver. My staff can focus on service now.", rating: 5, initials: "ED" },
  { id: 5, name: "Chris Wilson", role: "Real Estate Agent", text: "The parallax effects on my new site are stunning. Clients love it.", rating: 5, initials: "CW" },
  { id: 6, name: "Patricia Brown", role: "Consultant", text: "Professional team that delivered ahead of schedule. Great communication.", rating: 5, initials: "PB" },
  { id: 7, name: "Robert Taylor", role: "Gym Owner", text: "Integration was smooth. The support team at Luno is top notch.", rating: 4, initials: "RT" },
  { id: 8, name: "Linda Anderson", role: "Dentist", text: "Patients love the online booking system. It's intuitive and fast.", rating: 5, initials: "LA" },
  { id: 9, name: "David Thomas", role: "Artist", text: "They turned my portfolio into a visual journey. Truly artistic developers.", rating: 5, initials: "DT" },
  { id: 10, name: "Jennifer Martinez", role: "Event Planner", text: "Luno helped me scale my business with their automation tools. Thank you!", rating: 5, initials: "JM" },
];

export const Reviews: React.FC = () => {
  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="text-center mb-16">
        <FadeIn>
          <h1 className="text-5xl font-bold mb-6">Client Reviews</h1>
          <p className="text-xl text-gray-300">See what our partners are saying about their journey with us.</p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((review, index) => (
          <FadeIn key={review.id} delay={index * 50} className="h-full">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 h-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luno-accent/10 group">
              <div className="mb-6 text-luno-accent/50 group-hover:text-luno-accent transition-colors">
                <Quote size={40} />
              </div>
              
              <p className="text-gray-200 mb-6 leading-relaxed min-h-[80px]">"{review.text}"</p>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luno-light to-luno-dark border border-white/10 flex items-center justify-center text-xs font-bold text-gray-300">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <span className="text-xs text-gray-500">{review.role}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < review.rating ? "currentColor" : "none"} 
                      className={i >= review.rating ? "text-gray-600" : ""} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
