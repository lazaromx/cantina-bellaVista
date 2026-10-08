import { Sparkles, Utensils, HeartHandshake, Smile, CheckCircle2 } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';

export default function AboutSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'wheat':
        return <Utensils className="w-6 h-6 text-[#CDA34F]" />;
      case 'heart-handshake':
        return <HeartHandshake className="w-6 h-6 text-[#CDA34F]" />;
      case 'smile':
        return <Smile className="w-6 h-6 text-[#CDA34F]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#CDA34F]" />;
    }
  };

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#F6F1E7] relative overflow-hidden border-t border-b border-[#E5DBCD]/70">
      {/* Padrão decorativo sutil de fundo */}
      <div className="absolute inset-0 bg-subtle-pattern opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: História e Filosofia */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9F782E] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#CDA34F]" />
              <span>Nossa Tradição</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3B0914] mb-6 leading-tight">
              Uma história de amor à boa mesa italiana
            </h2>

            <p className="text-base sm:text-lg text-[#665A53] leading-relaxed mb-6 font-normal">
              {RESTAURANTE_DADOS.historiaResumo}
            </p>

            <p className="text-sm sm:text-base text-[#665A53] leading-relaxed mb-8">
              Acreditamos que a comida italiana é uma celebração de encontros sinceros. Por isso, combinamos o calor do fogão com o rigor técnico da cozinha contemporânea: cada massa é trefilada em bronze, os tomates provêm das encostas do Vesúvio e nossos caldos apuram durante a madrugada.
            </p>

            {/* Citação da Casa */}
            <div className="p-5 rounded-xl bg-white/70 border-l-4 border-[#68182A] shadow-xs">
              <p className="font-serif italic text-base sm:text-lg text-[#3B0914]">
                “Na nossa mesa, o relógio desacelera para que a conversa e os sabores durem um pouco mais.”
              </p>
              <span className="block mt-2 text-xs uppercase tracking-wider text-[#9F782E] font-medium">
                — Equipe Cantina Bella Vista
              </span>
            </div>
          </div>

          {/* Lado Direito: Bloco Visual Estilizado (Sem fotos externas) */}
          {/* DICA DE CUSTOMIZAÇÃO: Para inserir fotos reais do salão e da cozinha, você pode
              substituir o card decorativo abaixo por uma galeria de imagens <img src="..." /> */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Moldura de Trattoria com gradiente quente */}
              <div className="relative rounded-3xl p-8 bg-gradient-to-br from-[#68182A] to-[#3B0914] text-[#FDFBF7] shadow-xl overflow-hidden border border-[#CDA34F]/30">
                {/* Elementos geométricos decorativos em dourado */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#CDA34F]/20 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#E4C278]/10 blur-xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-3xl mb-6 shadow-inner">
                    🍝
                  </div>

                  <span className="text-xs uppercase tracking-[0.25em] text-[#E4C278] font-semibold block mb-1">
                    Cozinha Artesanal
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-[#FDFBF7]">
                    Feito à mão, todos os dias
                  </h3>

                  <p className="text-sm text-stone-200 leading-relaxed mb-6">
                    Farinhas italianas tipo 00, ovos caipiras selecionados e o tempo necessário para o desenvolvimento do sabor. Sem atalhos, sem conservantes.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15 text-center">
                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs">
                      <span className="block font-serif text-2xl font-bold text-[#E4C278]">100%</span>
                      <span className="text-xs text-stone-300">Artesanal & Fresco</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs">
                      <span className="block font-serif text-2xl font-bold text-[#E4C278]">60+</span>
                      <span className="text-xs text-stone-300">Rótulos na Adega</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Os 3 Destaques da Seção Sobre */}
        <div className="mt-16 pt-12 border-t border-[#E5DBCD]/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESTAURANTE_DADOS.destaquesSobre.map((destaque, idx) => (
              <div
                key={destaque.id}
                className="bg-white/80 rounded-2xl p-7 border border-[#E5DBCD] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#68182A]/10 border border-[#68182A]/20 flex items-center justify-center mb-5 group-hover:bg-[#68182A] group-hover:text-white transition-colors">
                  {getIcon(destaque.icone)}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-serif font-bold text-[#9F782E]">
                    0{idx + 1}.
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#281E19]">
                    {destaque.titulo}
                  </h4>
                </div>
                <p className="text-sm text-[#665A53] leading-relaxed">
                  {destaque.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
