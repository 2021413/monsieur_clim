import * as React from "react";
import Container from "./Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-gradient-to-b from-[#161c2e] to-[#1a2135] text-white">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-white">Monsieur Clim</h3>
          <p className="mt-2 text-sm text-gray-400">Climatisation & pompes à chaleur – installation, entretien, dépannage.</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Navigation</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/realisations">Réalisations</Link></li>
            <li><Link href="/zones">Zones</Link></li>
            <li><Link href="/about">À propos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Contact</h4>
          <div className="space-y-3">
            <Link 
              href="/contact#contact-form" 
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Demander un devis
            </Link>
            <Link 
              href="/contact#contact-form" 
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Nous contacter
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Golfe de Saint-Tropez
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Légal</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link href="/legal/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/legal/politique-confidentialite">Confidentialité</Link></li>
            <li><Link href="/legal/plan-du-site">Plan du site</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Monsieur Clim. Tous droits réservés.</div>
    </footer>
  );
}
