import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Calendar, MapPin, Clock, Ticket, Car, Train, Info, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Événement Luzarches 2025',
  description: 'Rejoignez-nous pour les Highland Games de Luzarches 2025. Compétitions, démonstrations, animations familiales et découverte de la culture écossaise.',
};

export default function EventPage() {
  return (
    <>
      {/* Hero */}
      <Section background="forest">
        <Container>
          <div className="text-center text-white">
            <h1 className="mb-6">Highland Games Luzarches 2026</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Une journée exceptionnelle de compétitions, démonstrations et animations 
              pour toute la famille au cœur du Val-d&apos;Oise
            </p>
          </div>
        </Container>
      </Section>

      {/* Informations Pratiques */}
      <Section background="white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-royal mb-12 text-center">Informations Pratiques</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Calendar className="w-12 h-12 text-royal mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold mb-2">Date</h3>
                <p className="text-gray-700">Dimanche 27 Septembre 2026</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Clock className="w-12 h-12 text-royal mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold mb-2">Horaires</h3>
                <p className="text-gray-700">09h00 - 18h00</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <MapPin className="w-12 h-12 text-royal mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold mb-2">Lieu</h3>
                <p className="text-gray-700">Golf Mont Griffon<br />95270 Luzarches</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Ticket className="w-12 h-12 text-royal mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold mb-2">Tarifs</h3>
                <p className="text-gray-700">Entrée gratuite</p>
              </div>
            </div>

            {/* Accès */}
            <div className="bg-royal/5 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-serif font-bold mb-6 text-royal text-center">
                Comment venir ?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-4">
                    <Car className="w-8 h-8 text-royal mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">En voiture</h4>
                      <p className="text-gray-700">
                        Depuis Paris: A1 sortie n°7 Luzarches<br />
                        Parking gratuit sur place<br />
                        GPS: Golf de Mont Griffon, 95270 Luzarches (Entrée coté Scherwood Park)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start gap-4">
                    <Train className="w-8 h-8 text-royal mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">En train</h4>
                      <p className="text-gray-700">
                        Gare de Luzarches (Ligne H depuis Gare du Nord)<br />
                        Puis 10 minutes à pied ou navette gratuite
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Billetterie */}
            <div className="text-center">
              <Button size="lg">
                Réserver vos billets
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Billetterie en ligne disponible prochainement
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programme */}
      <Section background="gray">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-forest mb-12 text-center">Programme de la journée</h2>
            
            <div className="space-y-6">
              {[
                { time: '10h00', title: 'Ouverture du site', description: 'Accueil du public, stands artisanaux et restauration' },
                { time: '10h30', title: 'Cérémonie d\'ouverture', description: 'Défilé en kilt et présentation des athlètes' },
                { time: '11h00', title: 'Début des compétitions Heavy Events', description: 'Lancer de tronc, pierre et marteau' },
                { time: '12h30', title: 'Pause déjeuner', description: 'Food trucks et restauration sur place' },
                { time: '14h00', title: 'Reprise des compétitions', description: 'Suite des épreuves et finales' },
                { time: '15h00', title: 'Initiations pour le public', description: 'Essayez les épreuves écossaises !' },
                { time: '17h00', title: 'Démonstrations spectaculaires', description: 'Les meilleurs moments en revue' },
                { time: '18h00', title: 'Remise des trophées', description: 'Cérémonie de clôture officielle' },
                { time: '19h00', title: 'Clôture', description: 'Fin de l\'événement' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 bg-white rounded-lg p-6 shadow-md">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-royal rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{item.time}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Infos complémentaires */}
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-forest/5 border-l-4 border-forest rounded-r-lg p-6">
              <div className="flex gap-4">
                <Info className="w-8 h-8 text-forest flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-serif font-bold mb-4 text-forest">Bon à savoir</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Événement familial adapté à tous les âges</li>
                    <li>✓ Restauration sur place (food trucks écossais)</li>
                    <li>✓ Stands artisanaux et boutique de souvenirs</li>
                    <li>✓ Espace pique-nique disponible</li>
                    <li>✓ Animations pour enfants tout au long de la journée</li>
                    <li>✓ Accès PMR (Personnes à Mobilité Réduite)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
