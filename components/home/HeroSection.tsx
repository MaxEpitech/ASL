import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <div className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background - Placeholder for user's video */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal to-forest">
        {/* TODO: Add video element here when video file is provided */}
        {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video> */}
        
        {/* Temporary decorative overlay */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-shadow mb-6">
          ASL Jeux Écossais
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-shadow font-sans">
          Découvrez l&apos;authenticité des Highland Games en France
        </p>
        <p className="text-lg md:text-xl mb-10 text-gray-100 font-sans">
          Démonstrations spectaculaires • Team Building • Festivals • Événements municipaux
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link href="/prestations">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white text-white hover:text-royal-700">
              Nos Prestations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
