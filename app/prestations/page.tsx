import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import ServiceCard from '@/components/prestations/ServiceCard';
import Button from '@/components/ui/Button';
import MediaGallery from '@/components/ui/MediaGallery';
import { prestationsData } from '@/data/prestations';
import { prestationsImages } from '@/data/media';
import * as Icons from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prestations',
  description: 'Découvrez nos prestations : démonstrations publiques et team building avec Heavy Events. Animation écossaise authentique pour tous vos événements.',
};

// Map icon names to actual Lucide icons
const iconMap: Record<string, any> = {
  castle: Icons.Castle,
  building: Icons.Building,
  heart: Icons.Heart,
  award: Icons.Award,
  users: Icons.Users,
  briefcase: Icons.Briefcase,
};

export default function PrestationsPage() {
  return (
    <>
      {/* Hero */}
      <Section background="royal">
        <Container>
          <div className="text-center text-white">
            <h1 className="mb-6">Nos Prestations</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              De authentiques Highland Games pour vos festivals et événements d&apos;entreprise. 
              Découvrez nos différentes formules adaptées à vos besoins.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services */}
      {prestationsData.map((category, categoryIndex) => (
        <Section 
          key={category.slug} 
          id={category.slug}
          background={categoryIndex % 2 === 0 ? 'white' : 'gray'}
        >
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={categoryIndex % 2 === 0 ? 'text-royal mb-4' : 'text-forest mb-4'}>
                  {category.name}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {category.services.map((service) => {
                  const Icon = iconMap[service.icon] || Icons.Star;
                  return (
                    <ServiceCard
                      key={service.title}
                      title={service.title}
                      description={service.description}
                      features={service.features}
                      icon={Icon}
                    />
                  );
                })}
              </div>

              {/* Media Gallery for this category */}
              {category.slug === 'demonstrations-publiques' && prestationsImages.demonstrations && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-center mb-8 text-royal">Nos démonstrations en images</h3>
                  <MediaGallery images={prestationsImages.demonstrations} columns={3} />
                </div>
              )}
              {category.slug === 'corporate' && prestationsImages.corporate && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-center mb-8 text-forest">Team Building & Corporate</h3>
                  <MediaGallery images={prestationsImages.corporate} columns={3} />
                </div>
              )}
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA */}
      <Section background="forest">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="mb-6">Prêt à organiser votre événement ?</h2>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé. 
              Nous adaptons nos prestations à vos besoins spécifiques.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@asl-jeuxecossais.fr">
                <Button className="bg-white text-forest-700 hover:bg-gray-100 shadow-lg w-full sm:w-auto">
                  Demander un devis
                </Button>
              </a>
              <a href="/sponsoring">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest-700 w-full sm:w-auto">
                  Devenir partenaire
                </Button>
              </a>
            </div>

            <p className="mt-6 text-white/80">
              <Icons.Mail className="inline w-5 h-5 mr-2" />
              contact@asl-jeuxecossais.fr
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
