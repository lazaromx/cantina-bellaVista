import { useState } from 'react';
import { MessageSquare, Mail, Instagram, ExternalLink, Copy, Check, Sparkles, Send } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(RESTAURANTE_DADOS.contato.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9F782E] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CDA34F]" />
            <span>Fale Conosco</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3B0914] mb-4">
            Canais de Atendimento
          </h2>
          <p className="text-[#665A53] text-base leading-relaxed">
            Dúvidas sobre o cardápio, eventos corporativos ou reservas para grandes grupos? Estamos sempre à disposição.
          </p>
        </div>

        {/* 3 Cartões de Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cartão 1: WhatsApp */}
          <div className="bg-[#FAF6EF] rounded-2xl p-8 border border-[#E5DBCD] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#9F782E] font-semibold block mb-1">
                Atendimento Rápido
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#281E19] mb-2">
                WhatsApp
              </h3>
              <p className="text-sm text-[#665A53] leading-relaxed mb-6">
                Converse diretamente com nossa recepção para dúvidas imediatas, confirmações ou encomendas.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DBCD]/60">
              <span className="block font-medium text-base text-[#281E19] mb-3">
                {RESTAURANTE_DADOS.contato.whatsappFormatado}
              </span>
              <a
                href={RESTAURANTE_DADOS.contato.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-medium shadow-xs transition-colors cursor-pointer"
              >
                <span>Chamar no WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Cartão 2: E-mail */}
          <div className="bg-[#FAF6EF] rounded-2xl p-8 border border-[#E5DBCD] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#68182A]/10 text-[#68182A] border border-[#68182A]/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#9F782E] font-semibold block mb-1">
                Eventos & Imprensa
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#281E19] mb-2">
                E-mail
              </h3>
              <p className="text-sm text-[#665A53] leading-relaxed mb-6">
                Para propostas de eventos fechados, fornecedores, críticas ou sugestões institucionais.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DBCD]/60">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-sm text-[#281E19] truncate" title={RESTAURANTE_DADOS.contato.email}>
                  {RESTAURANTE_DADOS.contato.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-[#68182A] hover:bg-white transition-colors cursor-pointer"
                  title="Copiar e-mail"
                  aria-label="Copiar endereço de e-mail"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${RESTAURANTE_DADOS.contato.email}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#68182A] hover:bg-[#50111F] text-[#FDFBF7] text-sm font-medium shadow-xs transition-colors cursor-pointer"
              >
                <span>Enviar e-mail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Cartão 3: Instagram */}
          <div className="bg-[#FAF6EF] rounded-2xl p-8 border border-[#E5DBCD] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E1306C]/10 text-[#E1306C] border border-[#E1306C]/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Instagram className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#9F782E] font-semibold block mb-1">
                Redes Sociais
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#281E19] mb-2">
                Instagram
              </h3>
              <p className="text-sm text-[#665A53] leading-relaxed mb-6">
                Acompanhe os bastidores da nossa cozinha, novidades do chef e os pratos do dia em nossos stories.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DBCD]/60">
              <span className="block font-medium text-base text-[#281E19] mb-3">
                {RESTAURANTE_DADOS.contato.instagram}
              </span>
              <a
                href={RESTAURANTE_DADOS.contato.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#C13584] to-[#E1306C] hover:opacity-90 text-white text-sm font-medium shadow-xs transition-opacity cursor-pointer"
              >
                <span>Seguir no Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
