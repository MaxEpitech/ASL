import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import SponsoringTiers from '@/components/sponsoring/SponsoringTiers';
import ContactForm from '@/components/sponsoring/ContactForm';
import FiscalCalculator from '@/components/sponsoring/FiscalCalculator';
import FadeIn from '@/components/animations/FadeIn';
import MediaGallery from '@/components/ui/MediaGallery';
import { Handshake, TrendingUp, Users, Award } from 'lucide-react';
import { sponsorImages } from '@/data/media';

export const metadata: Metadata = {
  title: 'Devenez Partenaire',
  description: 'Soutenez les Highland Games de Luzarches et bénéficiez d\'une visibilité exceptionnelle. Réduction fiscale de 60%. Découvrez nos offres de partenariat.',
};

export default function SponsoringPage() {
  return (
    <>
      {/* Hero */}
      <Section background="forest">
        <Container>
          <div className="text-center text-white">
            <h1 className="mb-6">Devenez Partenaire</h1>
            <p className="text-xl md:text-2xl max-w-5xl mx-auto">
              Soutenez notre association et gagnez en visibilité auprès de milliers de visiteurs. 
            </p>
          </div>
        </Container>
      </Section>

      {/* Avantages */}
      <Section background="white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-royal mb-12 text-center">Pourquoi devenir partenaire ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Visibilité</h3>
                <p className="text-gray-600">
                  Exposition auprès de milliers de visiteurs et sur nos réseaux sociaux
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">RSE & Engagement</h3>
                <p className="text-gray-600">
                  Valorisez votre engagement culturel et territorial
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Réseautage</h3>
                <p className="text-gray-600">
                  Rencontrez d&apos;autres partenaires et développez votre réseau
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Avantage Fiscal</h3>
                <p className="text-gray-600">
                  60% de réduction d&apos;impôt sur votre contribution
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tiers */}
      <Section background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-forest mb-4">Nos Offres de Partenariat</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le palier qui correspond à vos objectifs et à votre budget
            </p>
          </div>
          
          <SponsoringTiers />
        </Container>
      </Section>

      {/* Fiscal Calculator */}
      <Section background="white">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-royal mb-4">Calculez Votre Avantage Fiscal</h2>
                <p className="text-xl text-gray-600">
                  Découvrez combien votre partenariat vous coûtera réellement après réduction d&apos;impôt
                </p>
              </div>
              <FiscalCalculator />
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Media Gallery - Sponsor Visibility */}
      <Section background="white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-royal mb-4">Votre Visibilité sur l&apos;Événement</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez comment nos partenaires bénéficient d&apos;une exposition exceptionnelle lors de nos Highland Games
              </p>
            </div>
            <MediaGallery images={sponsorImages} columns={4} />
          </div>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-royal mb-4">Contactez-nous</h2>
              <p className="text-xl text-gray-600">
                Intéressé par un partenariat ? Remplissez le formulaire ci-dessous 
                et nous vous recontacterons rapidement.
              </p>
            </div>
            
            <ContactForm />
            
            <div className="mt-8 text-center text-gray-600">
              <p>Vous pouvez également nous contacter directement :</p>
              <p className="mt-2">
                <a href="mailto:sponsoring@asl-jeuxecossais.fr" className="text-royal font-semibold hover:underline">
                  sponsoring@asl-jeuxecossais.fr
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
