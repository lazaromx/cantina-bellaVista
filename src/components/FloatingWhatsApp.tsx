import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Olá! Gostaria de informações sobre o cardápio e reservas na Cantina Bella Vista.'
  );
  const whatsappUrl = `https://wa.me/${RESTAURANTE_DADOS.contato.whatsappNumero}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Tooltip de Boas-Vindas */}
      {showTooltip && (
        <div className="bg-[#FAF6EF] text-[#281E19] text-xs p-3 rounded-2xl shadow-xl border border-[#CDA34F]/40 max-w-[220px] mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-1.5 right-1.5 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            aria-label="Fechar mensagem de dica"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-[#68182A] mb-0.5">Dúvidas ou Reservas?</p>
          <p className="text-[11px] text-[#665A53]">
            Fale conosco diretamente pelo WhatsApp agora mesmo!
          </p>
        </div>
      )}

      {/* Botão Flutuante do WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label={`Conversar no WhatsApp com ${RESTAURANTE_DADOS.nome}`}
      >
        {/* Efeito de Pulso Sutil */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10 opacity-75" />

        {/* SVG do WhatsApp */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-xs"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.405z" />
        </svg>

        {/* Badge Indicador Flutuante */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#68182A] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          1
        </span>
      </a>
    </div>
  );
}
