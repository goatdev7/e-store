import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "E-Store has the best selection of gadgets. The customer service is amazing!",
    author: "John D."
  },
  {
    quote: "I love my new 4K TV. The shopping experience was smooth and hassle-free.",
    author: "Sarah K."
  },
  {
    quote: "Fast delivery, great prices, and top-notch products. Highly recommend!",
    author: "Mike P."
  },
];

const TestimonialSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Calculate total width of one set of testimonials
  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
      <motion.div
        ref={sliderRef}
        className="flex justify-start space-x-4"
        animate={{ x: -sliderWidth }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {/* Original testimonials */}
        {testimonials.map((testimonial, index) => (
          <div key={index} className="min-w-[300px] flex-shrink-0 bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-700 italic text-lg">
              &quot;{testimonial.quote}&quot;
            </p>
            <h3 className="mt-6 font-bold">- {testimonial.author}</h3>
          </div>
        ))}
        {/* Duplicate testimonials for seamless looping */}
        {testimonials.map((testimonial, index) => (
          <div key={`dup-${index}`} className="min-w-[300px] flex-shrink-0 bg-white shadow-lg rounded-lg p-8">
            <p className="text-gray-700 italic text-lg">
              &quot;{testimonial.quote}&quot;
            </p>
            <h3 className="mt-6 font-bold">- {testimonial.author}</h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialSlider;
