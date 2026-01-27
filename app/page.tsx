import HeroSection from '@/components/home/HeroSection';
import PrestationsPreview from '@/components/home/PrestationsPreview';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MediaGallery from '@/components/ui/MediaGallery';
import Link from 'next/link';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { homeGalleryImages } from '@/data/media';

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <PrestationsPreview />

      {/* Media Gallery Section */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-royal mb-4">Nos Événements en Images</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez l&apos;ambiance unique de nos Highland Games à travers notre galerie photo
            </p>
          </div>
          <MediaGallery images={homeGalleryImages} columns={3} />
        </Container>
      </Section>

      {/* Event Highlight Section */}
      <Section background="royal">
        <Container>
          <div className="text-center">
            <h2 className="text-white mb-6">Événement Luzarches 2026</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Rejoignez-nous pour une journée inoubliable de Highland Games, 
              compétitions traditionnelles et animations pour toute la famille !
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-white">
                <Calendar className="w-6 h-6" />
                <span className="font-sans text-lg">27 Septembre 2026</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white">
                <MapPin className="w-6 h-6" />
                <span className="font-sans text-lg">Luzarches, France</span>
              </div>
            </div>

            <Link href="/evenement/luzarches-2026">
              <Button className="bg-white text-royal-700 hover:bg-gray-100 shadow-lg">
                En savoir plus sur l&apos;événement
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-forest mb-6">Devenez Partenaire</h2>
            <p className="text-xl text-gray-600 mb-8">
              Soutenez notre association et bénéficiez d&apos;une visibilité exceptionnelle 
              auprès de milliers de visiteurs. Réduction fiscale de 60% sur votre don.
            </p>
            <Link href="/sponsoring">
              <Button variant="secondary" size="lg">
                Découvrir nos offres de partenariat
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
