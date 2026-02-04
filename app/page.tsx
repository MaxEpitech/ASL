import HeroSection from '@/components/home/HeroSection';
import PrestationsPreview from '@/components/home/PrestationsPreview';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MediaGallery from '@/components/ui/MediaGallery';
import Countdown from '@/components/ui/Countdown';
import FadeIn from '@/components/animations/FadeIn';
import { SponsorsSlider } from '@/components/sponsors/SponsorsSlider';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { homeGalleryImages } from '@/data/media';

export default function Home() {
  const eventDate = new Date('2026-09-27T10:00:00');

  return (
    <>
      <HeroSection />
      
      <PrestationsPreview />

      {/* Media Gallery Section */}
      <Section background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-royal mb-4">Nos Événements en Images</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez l&apos;ambiance unique de nos Highland Games à travers notre galerie photo
              </p>
            </div>
            <MediaGallery images={homeGalleryImages} columns={3} />
          </FadeIn>
        </Container>
      </Section>

      {/* Event Highlight Section */}
      <Section background="royal">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-white mb-6">Highland Games de Luzarches 2026</h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Rejoignez-nous pour une journée inoubliable de Highland Games, 
                compétitions traditionnelles et animations pour toute la famille !
              </p>
              
              <div className="mb-10">
                <Countdown targetDate={eventDate} className="" />
              </div>

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
                <Button className="  hover:bg-gray-100 shadow-lg">
                  En savoir plus sur l&apos;événement
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Sponsors Section */}
      <Section background="gray">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-royal mb-4">Nos Partenaires</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ils nous font confiance et soutiennent nos événements
              </p>
            </div>
            <SponsorsSlider />
          </FadeIn>
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
