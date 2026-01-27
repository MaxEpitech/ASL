import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'royal' | 'forest';
  id?: string;
}

export default function Section({ 
  children, 
  className = '', 
  background = 'white',
  id
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    royal: 'bg-royal text-white',
    forest: 'bg-forest text-white',
  };
  
  return (
    <section id={id} className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      {children}
    </section>
  );
}
