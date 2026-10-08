import { Sparkles } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3B0914] text-[#FDFBF7] py-14 border-t border-[#CDA34F]/30 relative overflow-hidden">
      {/* Detalhe de fundo */}
      <div className="absolute inset-0 bg-wine-pattern opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          
          {/* Logo e Slogan */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CDA34F]" />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7]">
                {RESTAURANTE_DADOS.nome}
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#E4C278] mb-3">
              “{RESTAURANTE_DADOS.slogan}”
            </p>
            <p className="text-xs text-stone-300 max-w-sm leading-relaxed">
              Gastronomia italiana contemporânea e massas artesanais frescas nos Jardins, São Paulo.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-widest text-[#CDA34F] font-semibold block mb-3">
              Navegação
            </span>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#cardapio" className="hover:text-[#E4C278] transition-colors">Cardápio Completo</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#E4C278] transition-colors">Nossa Tradição</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#E4C278] transition-colors">Localização & Horários</a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-[#E4C278] transition-colors">Reservas Online</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#E4C278] transition-colors">Canais de Contato</a>
              </li>
            </ul>
          </div>

          {/* Localização e Atendimento */}
          <div className="md:col-span-4 text-xs text-stone-300 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#CDA34F] font-semibold block mb-3">
              Endereço & Atendimento
            </span>
            <p>{RESTAURANTE_DADOS.endereco.completo}</p>
            <p className="text-stone-400">WhatsApp: {RESTAURANTE_DADOS.contato.whatsappFormatado}</p>
            <p className="text-stone-400">E-mail: {RESTAURANTE_DADOS.contato.email}</p>
            <p className="text-[#E4C278] pt-1">{RESTAURANTE_DADOS.horarioResumo}</p>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Aviso Discreto "Site demonstrativo" */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {currentYear} {RESTAURANTE_DADOS.nome}. Todos os direitos reservados.
          </p>

          {/* Aviso discreto solicitado */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-stone-400">
            <Sparkles className="w-3 h-3 text-[#CDA34F]" />
            <span>Site demonstrativo • Projeto modelo para restaurantes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
