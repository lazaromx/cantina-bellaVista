import { useState, useEffect } from 'react';
import { Menu, X, Calendar, UtensilsCrossed, PhoneCall } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';

interface HeaderProps {
  onNavigateToReservation: () => void;
}

export default function Header({ onNavigateToReservation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevenir scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Reservas', href: '#reservas' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#E5DBCD]/80 py-3'
          : 'bg-[#FDFBF7]/90 backdrop-blur-sm py-4 border-b border-[#E5DBCD]/40'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo Textual Estilizado */}
        <a
          href="#"
          className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-[#CDA34F] rounded-lg p-1"
          aria-label="Cantina Bella Vista - Início"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#68182A] group-hover:bg-[#CDA34F] transition-colors" />
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#68182A] group-hover:text-[#420D18] transition-colors">
              {RESTAURANTE_DADOS.nome}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#9F782E] font-medium pl-4.5 -mt-0.5">
            Cozinha Italiana Contemporânea
          </span>
        </a>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-sm font-medium text-[#281E19]/85 hover:text-[#68182A] transition-colors relative py-1 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] rounded px-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#68182A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </a>
          ))}

          {/* Botão de Destaque Reservar */}
          <button
            type="button"
            onClick={onNavigateToReservation}
            className="inline-flex items-center gap-2 bg-[#68182A] hover:bg-[#521321] text-[#FDFBF7] text-sm font-medium px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] focus:ring-offset-2"
          >
            <Calendar className="w-4 h-4 text-[#E4C278]" />
            <span>Reservar mesa</span>
          </button>
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onNavigateToReservation}
            className="p-2 text-[#68182A] bg-[#68182A]/10 hover:bg-[#68182A]/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#CDA34F]"
            aria-label="Ir para reservas"
          >
            <Calendar className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#281E19] hover:text-[#68182A] hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Gaveta de Navegação Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[65px] bg-[#281E19]/40 backdrop-blur-sm z-30 md:hidden flex flex-col justify-start"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#FDFBF7] border-b border-[#E5DBCD] shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DBCD]/60">
              <span className="text-xs uppercase tracking-widest text-[#9F782E] font-semibold">
                Menu de Navegação
              </span>
              <span className="text-xs text-[#665A53]">Jardins • São Paulo</span>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-3 py-2.5 rounded-lg text-[#281E19] hover:bg-[#68182A]/10 hover:text-[#68182A] font-medium text-base transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-stone-300">→</span>
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#E5DBCD]/60 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToReservation();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#68182A] hover:bg-[#521321] text-[#FDFBF7] py-3 rounded-xl font-medium shadow transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E4C278]" />
                <span>Reservar Mesa Agora</span>
              </button>

              <a
                href={RESTAURANTE_DADOS.contato.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 py-2.5 rounded-xl font-medium transition-colors text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: {RESTAURANTE_DADOS.contato.whatsappFormatado}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
