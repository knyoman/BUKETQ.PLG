import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { id: 1, image: '/Testimoni01.jpg' },
  { id: 2, image: '/Testimoni02.jpg' },
  { id: 3, image: '/Testimoni03.jpg' },
  { id: 4, image: '/Testimoni04.jpg' },
  { id: 6, image: '/Testimoni06.jpg' },
  { id: 7, image: '/Testimoni07.jpg' },
  { id: 8, image: '/Testimoni08.jpg' },
  { id: 9, image: '/Testimoni09.jpg' },
  { id: 10, image: '/Testimoni10.jpg' },
  { id: 11, image: '/Testimoni11.jpg' },
  { id: 12, image: '/Testimoni12.jpg' },
];

export default function TestimonialCarousel() {
  const scrollRef = useRef(null);

  const scrollTo = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => scrollTo('right'), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="overflow-hidden relative">
        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide py-4 px-2"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[280px] sm:w-[300px] h-[420px] rounded-xl shadow-lg bg-white overflow-hidden"
            >
              <img
                src={item.image}
                alt={`Testimoni ${item.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Panah Navigasi */}
      <button
        onClick={() => scrollTo('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-sage-600" />
      </button>

      <button
        onClick={() => scrollTo('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
      >
        <ChevronRight className="w-6 h-6 text-sage-600" />
      </button>
    </div>
  );
}
