/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Cantina Bella Vista - Site Demonstrativo de Página Única
 * Gastronomia Italiana Contemporânea nos Jardins, São Paulo
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import LocationSection from './components/LocationSection';
import ReservationSection from './components/ReservationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { getRestaurantStatus, RestaurantStatus } from './utils/scheduleHelper';

export default function App() {
  // Cálculo em tempo real do status de abertura (Aberto / Fechado)
  const [status, setStatus] = useState<RestaurantStatus>(() => getRestaurantStatus(new Date()));

  useEffect(() => {
    // Atualiza o status automaticamente a cada 60 segundos
    const timer = setInterval(() => {
      setStatus(getRestaurantStatus(new Date()));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#281E19] flex flex-col font-sans selection:bg-[#68182A] selection:text-[#FDFBF7]">
      {/* 1. Header Fixo com Navegação Suave e Menu Mobile */}
      <Header onNavigateToReservation={() => scrollToSection('reservas')} />

      <main className="flex-grow">
        {/* 2. Hero: Apresentação, Slogan, Status Aberto/Fechado e CTAs */}
        <Hero
          status={status}
          onNavigateToMenu={() => scrollToSection('cardapio')}
          onNavigateToReservation={() => scrollToSection('reservas')}
        />

        {/* 3. Cardápio: Categorias com abas, preços e selos especiais */}
        <MenuSection />

        {/* 4. Sobre: História da Cantina Bella Vista + 3 Destaques */}
        <AboutSection />

        {/* 5. Localização: Endereço, Horários em Tabela, Botão Como Chegar e Mapa Estilizado */}
        <LocationSection status={status} />

        {/* 6. Reservas: Formulário interativo validado com envio para o WhatsApp */}
        <ReservationSection />

        {/* 7. Contato: Cartões com WhatsApp, E-mail e Instagram */}
        <ContactSection />
      </main>

      {/* 8. Rodapé: Copyright, Links e Aviso de Site Demonstrativo */}
      <Footer />

      {/* 9. Botão Flutuante do WhatsApp em todas as seções */}
      <FloatingWhatsApp />
    </div>
  );
}
