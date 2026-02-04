import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { Shield, Users, Award, Heart } from 'lucide-react';
import { MembersList } from '@/components/association/MembersList';

export const metadata: Metadata = {
  title: 'Association',
  description: 'Découvrez l\'histoire et l\'équipe de ASL Jeux Écossais, association dédiée à la promotion des Highland Games en France.',
};

export default function AssociationPage() {
  return (
    <>
      {/* Hero */}
      <Section background="royal">
        <Container>
          <div className="text-center text-white">
            <h1 className="mb-6">Notre Association</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Passionnés par la culture écossaise, nous œuvrons pour faire découvrir 
              et promouvoir les Highland Games en France.
            </p>
          </div>
        </Container>
      </Section>

      {/* Histoire */}
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-forest mb-8 text-center">Notre Histoire</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                L&apos;Association Sportive Luzarchoise Jeux Écossais (ASL) est née de la passion 
                d&apos;un groupe d&apos;athlètes et d&apos;amateurs de culture celtique désireux de faire 
                découvrir l&apos;authenticité des Highland Games au public français.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Depuis notre création, nous avons participé à de nombreux festivals, 
                fêtes médiévales et événements culturels à travers la France. Notre mission 
                est double : préserver et transmettre les traditions des jeux écossais tout 
                en les rendant accessibles à tous.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                Chaque année, nous organisons notre événement phare à Luzarches, qui attire 
                des milliers de visiteurs venus découvrir ou redécouvrir les épreuves 
                traditionnelles des Highlands : lancer de tronc, de pierre, de marteau, 
                et bien d&apos;autres disciplines spectaculaires.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Tradition</h3>
                <p className="text-gray-600 text-sm">Authenticité écossaise</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Partage</h3>
                <p className="text-gray-600 text-sm">Transmission culturelle</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Award className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Professionnalisme</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Passion</h3>
                <p className="text-gray-600 text-sm">Amour de la culture</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Équipe */}
      <Section background="gray">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-forest mb-4 text-center">Notre Équipe</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Une équipe passionnée et dévouée à la promotion des Highland Games
            </p>

            <MembersList />

            <div className="mt-12 bg-royal/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4 text-royal">Rejoignez-nous !</h3>
              <p className="text-gray-700 mb-4">
                Vous partagez notre passion pour la culture écossaise ? 
                Vous souhaitez participer à nos événements ou devenir bénévole ?
              </p>
              <p className="text-gray-700">
                Contactez-nous à{' '}
                <a href="mailto:contact@asl-jeuxecossais.fr" className="text-royal font-semibold hover:underline">
                  contact@asl-jeuxecossais.fr
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
