import { Utensils, Calendar, Clock, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';
import { RestaurantStatus } from '../utils/scheduleHelper';

interface HeroProps {
  status: RestaurantStatus;
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export default function Hero({ status, onNavigateToMenu, onNavigateToReservation }: HeroProps) {
  return (
    <section
      aria-label="Apresentação do Restaurante"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#E5DBCD]/60"
    >
      {/* Fundo decorativo elegante com gradientes suaves e formas abstratas */}
      {/* DICA DE CUSTOMIZAÇÃO: Para usar uma foto real de fundo, substitua a div abaixo por:
          <div className="absolute inset-0 bg-[url('/sua-foto-fachada.jpg')] bg-cover bg-center opacity-25"></div> */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#F9F5EC] to-[#F4ECE0]/80 -z-10" />
      
      {/* Círculos decorativos em vinho e dourado suave para profundidade */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#CDA34F]/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-[#68182A]/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Indicador de Status Dinâmico em Tempo Real */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border bg-white/80 backdrop-blur shadow-xs mb-6 text-xs sm:text-sm font-medium transition-all">
          <span className="relative flex h-2.5 w-2.5">
            {status.isOpen ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            )}
          </span>

          <span className={status.isOpen ? "text-emerald-800 font-semibold" : "text-amber-900 font-semibold"}>
            {status.statusLabel}
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-[#665A53] flex items-center gap-1 font-normal">
            <Clock className="w-3.5 h-3.5 text-[#CDA34F]" />
            {status.statusDetail}
          </span>
        </div>

        {/* Emblema Trattoria & Categoria */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-[1px] w-8 sm:w-16 bg-[#CDA34F]/60" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#9F782E] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CDA34F]" />
            {RESTAURANTE_DADOS.cozinha}
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-[#CDA34F]/60" />
        </div>

        {/* Título Forte */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#3B0914] tracking-tight leading-[1.1] mb-5">
          {RESTAURANTE_DADOS.nome}
        </h1>

        {/* Slogan com Destaque Tipográfico */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#68182A]/90 max-w-2xl mx-auto mb-6">
          “{RESTAURANTE_DADOS.slogan}”
        </p>

        {/* Breve Apresentação de Acolhimento */}
        <p className="text-base sm:text-lg text-[#665A53] max-w-2xl mx-auto mb-9 font-normal leading-relaxed">
          Massas frescas preparadas artesanalmente todos os dias, molhos com cozimento lento e uma adega selecionada em um refúgio acolhedor nos Jardins.
        </p>

        {/* Ações Principais (CTAs) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Botão Ver Cardápio */}
          <button
            type="button"
            onClick={onNavigateToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#68182A] text-[#FDFBF7] font-medium text-base shadow-md hover:bg-[#4E0F1E] hover:shadow-lg transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CDA34F] focus:ring-offset-2"
          >
            <Utensils className="w-4 h-4 text-[#E4C278]" />
            <span>Ver cardápio</span>
          </button>

          {/* Botão Reservar Mesa */}
          <button
            type="button"
            onClick={onNavigateToReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-[#CDA34F] bg-white/90 text-[#3B0914] font-medium text-base shadow-xs hover:bg-[#FAF4E6] hover:border-[#9F782E] transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CDA34F] focus:ring-offset-2"
          >
            <Calendar className="w-4 h-4 text-[#CDA34F]" />
            <span>Reservar mesa</span>
          </button>
        </div>

        {/* Informações Rápidas em Linha */}
        <div className="mt-12 pt-8 border-t border-[#E5DBCD]/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#665A53]">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#CDA34F] shrink-0" />
            <span>Jardins, São Paulo – SP</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#CDA34F] shrink-0" />
            <span>Almoço & Jantar artesanal</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-base">🍷</span>
            <span>Carta com mais de 60 rótulos</span>
          </div>
        </div>

        {/* Seta discreta para rolar */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onNavigateToMenu}
            className="p-2 text-[#9F782E] hover:text-[#68182A] animate-bounce transition-colors focus:outline-none focus:ring-2 focus:ring-[#CDA34F] rounded-full"
            aria-label="Rolar para o cardápio"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
