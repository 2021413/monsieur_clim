"use client";
import * as React from "react";
import Link from "next/link";
import Container from "./Container";
import Button from "./ui/Button";
import Image from "next/image";

export default function MainNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-[1000] w-full max-w-full overflow-hidden
        transition-all duration-300 ease-in-out
        ${scrolled ? 'backdrop-blur-xl shadow-2xl' : 'backdrop-blur-md'}
      `}
    >
      <Container className={`
        flex items-center justify-between relative transition-all duration-300
        ${scrolled ? 'h-16 py-0' : 'h-20 py-0'}
      `}>
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          onClick={() => setOpen(false)}
        >
          <div className="relative">
            <Image 
              src="/brands/logo.png" 
              alt="Logo Monsieur Clim" 
              width={48} 
              height={48} 
              className={`transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className={`font-display font-bold tracking-tight transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
            <span className="text-secondary group-hover:text-secondary/80 transition-colors">MONSIEUR</span>{" "}
            <span className="text-primary group-hover:text-primary/80 transition-colors">CLIM</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {[
            { href: "/services", label: "Services" },
            { href: "/realisations", label: "Réalisations" },
            { href: "/zones", label: "Zones" },
            { href: "/about", label: "À propos" },
            { href: "/contact", label: "Contact" }
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="
                relative text-sm font-medium tracking-wide text-foreground/80 
                hover:text-primary transition-all duration-300 
                before:absolute before:inset-0 before:bg-primary/10 before:rounded-lg 
                before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 
                after:bg-gradient-to-r after:from-primary after:to-secondary after:scale-x-0 
                hover:after:scale-x-100 after:transition-transform after:duration-300
                px-3 py-2
              "
            >
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden xl:flex items-center gap-4">
          <Link 
            href="/contact"
            onClick={() => setOpen(false)}
            className="
              group relative inline-flex items-center justify-center 
              rounded-full px-6 py-2.5 text-sm font-semibold 
              bg-gradient-to-r from-primary to-secondary text-white
              hover:shadow-2xl hover:shadow-primary/25
              transition-all duration-300 
              active:scale-95 
              before:absolute before:inset-0 before:rounded-full 
              before:bg-gradient-to-r before:from-secondary before:to-primary 
              before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
              overflow-hidden
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Devis gratuit
            </span>
          </Link>
        </div>

        {/* Menu Mobile Button */}
        <button 
          className="xl:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/10 active:scale-95" 
          onClick={() => setOpen(!open)} 
          aria-label="Ouvrir le menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span 
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                open ? 'rotate-45 translate-y-2' : ''
              }`} 
            />
            <span 
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`} 
            />
            <span 
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`} 
            />
          </div>
        </button>
      </Container>

      {/* Menu Mobile */}
      <div 
        className={`
          xl:hidden overflow-hidden transition-all duration-500 ease-out
          ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="border-t border-white/10 bg-header-dark/95 backdrop-blur-xl">
          <Container className="py-6">
            <div className="flex flex-col gap-4">
              {[
                { href: "/services", label: "Services" },
                { href: "/realisations", label: "Réalisations" },
                { href: "/zones", label: "Zones" },
                { href: "/about", label: "À propos" },
                { href: "/contact", label: "Contact" }
              ].map((item, index) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`
                    text-base font-medium text-foreground/80 hover:text-primary 
                    transition-all duration-300 py-2 px-4 rounded-lg
                    hover:bg-white/5 transform hover:translate-x-2
                    animate-[slideIn_0.3s_ease-out_${index * 0.1}s_both]
                  `}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 mt-2">
                <Link 
                  href="/contact"
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    rounded-xl px-6 py-3 text-sm font-semibold 
                    bg-gradient-to-r from-primary to-secondary text-white
                    hover:shadow-xl hover:shadow-primary/25
                    transition-all duration-300 active:scale-95
                    animate-[slideIn_0.3s_ease-out_0.5s_both]
                  "
                  onClick={() => setOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Devis gratuit
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
