'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ChevronUp } from 'lucide-react';

interface StickyButtonProps {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export default function StickyButton({ 
  text = "Demander un devis", 
  href = "mailto:contact@asl-jeuxecossais.fr",
  variant = "primary"
}: StickyButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling 300px
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Hide when near footer (last 400px)
      if (scrolled + windowHeight >= documentHeight - 400) {
        setIsVisible(false);
      }

      // Show scroll to top after 500px
      setShowScrollTop(scrolled > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main CTA Button */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        {href.startsWith('mailto:') ? (
          <a href={href}>
            <Button variant={variant} size="lg" className="shadow-2xl hover:shadow-xl">
              {text}
            </Button>
          </a>
        ) : (
          <Link href={href}>
            <Button variant={variant} size="lg" className="shadow-2xl hover:shadow-xl">
              {text}
            </Button>
          </Link>
        )}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-royal-600 text-royal-700 hover:bg-royal-50 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Retour en haut"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
}
