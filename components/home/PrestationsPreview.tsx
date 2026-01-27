import Link from 'next/link';
import { Castle, Users } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const services = [
  {
    icon: Castle,
    title: 'Démonstrations / Initiations Publiques',
    description: 'Démonstrations et initiations pour festivals, fêtes médiévales et événements municipaux.',
    href: '/prestations#demonstrations-publiques',
  },
  {
    icon: Users,
    title: 'Corporate & Team Building',
    description: 'Initiations aux Heavy Events pour renforcer la cohésion de vos équipes.',
    href: '/prestations#corporate',
  },
];

export default function PrestationsPreview() {
  return (
    <Section background="gray">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-royal mb-4">Nos Prestations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De l&apos;animation de festivals aux événements d&apos;entreprise, 
            nous apportons l&apos;authenticité des Highland Games à vos événements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-royal" />
                </div>
                <h3 className="text-2xl text-center mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {service.description}
                </p>
                <div className="text-center">
                  <Link href={service.href}>
                    <Button variant="outline" size="sm">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/prestations">
            <Button>
              Découvrir toutes nos prestations
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
