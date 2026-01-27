import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              ASL Jeux Écossais
            </h3>
            <p className="text-sm leading-relaxed">
              Association dédiée à la promotion et la pratique des Highland Games en France.
              Découvrez la culture écossaise à travers nos démonstrations et événements.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-royal-400" />
                <a href="mailto:contact@asl-jeuxecossais.fr" className="hover:text-white transition-colors">
                  contact@asl-jeuxecossais.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-royal-400" />
                <a href="mailto:sponsoring@asl-jeuxecossais.fr" className="hover:text-white transition-colors">
                  sponsoring@asl-jeuxecossais.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-royal-400" />
                <span>Luzarches, France</span>
              </div>
            </div>
          </div>

          {/* Links & Social */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Suivez-nous</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-royal-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-royal-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <Link href="/prestations" className="block hover:text-white transition-colors">
                Nos Prestations
              </Link>
              <Link href="/sponsoring" className="block hover:text-white transition-colors">
                Devenir Partenaire
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ASL Jeux Écossais. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
}
