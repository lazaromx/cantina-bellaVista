import { MapPin, Navigation, Clock, ExternalLink, Car, Train, Compass } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';
import { RestaurantStatus } from '../utils/scheduleHelper';

interface LocationProps {
  status: RestaurantStatus;
}

export default function LocationSection({ status }: LocationProps) {
  const currentDayIndex = status.currentDayIndex;

  return (
    <section id="localizacao" className="py-20 md:py-28 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9F782E] mb-2">
            <Compass className="w-3.5 h-3.5 text-[#CDA34F]" />
            <span>Onde Estamos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3B0914] mb-4">
            Localização & Horários
          </h2>
          <p className="text-[#665A53] text-base leading-relaxed">
            Localizada no coração dos Jardins em São Paulo, em uma rua arborizada e de fácil acesso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coluna Esquerda: Informações de Endereço & Tabela de Horários */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Card de Endereço e Ações */}
            <div className="bg-[#FAF6EF] rounded-2xl p-7 border border-[#E5DBCD] shadow-xs">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#68182A] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6 text-[#E4C278]" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#9F782E] font-semibold block mb-1">
                    Endereço
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#281E19] leading-snug">
                    {RESTAURANTE_DADOS.endereco.completo}
                  </h3>
                  <p className="text-xs text-[#665A53] mt-1">
                    CEP: {RESTAURANTE_DADOS.endereco.cep} • Bairro Jardins
                  </p>
                </div>
              </div>

              {/* Informações de Conveniência */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E5DBCD]/70 text-xs text-[#665A53] mb-6">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#CDA34F] shrink-0" />
                  <span>Serviço de manobrista no local</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#CDA34F] shrink-0" />
                  <span>Próximo à Estação Oscar Freire</span>
                </div>
              </div>

              {/* Botão Como Chegar -> Google Maps Search */}
              <a
                href={RESTAURANTE_DADOS.endereco.linkGoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#68182A] hover:bg-[#50111F] text-[#FDFBF7] font-medium text-sm shadow transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CDA34F] focus:ring-offset-2"
                aria-label="Abrir rota no Google Maps (nova aba)"
              >
                <Navigation className="w-4 h-4 text-[#E4C278]" />
                <span>Como chegar (Abrir no Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Tabela de Horários de Funcionamento */}
            <div className="bg-[#FAF6EF] rounded-2xl p-7 border border-[#E5DBCD] shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DBCD]/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#68182A]" />
                  <h3 className="font-serif text-lg font-bold text-[#281E19]">
                    Horários de Funcionamento
                  </h3>
                </div>
                <span className="text-xs text-[#9F782E] font-medium">
                  {status.isOpen ? '● Aberto agora' : '○ Fechado agora'}
                </span>
              </div>

              {/* Tabela Acessível */}
              <div className="overflow-hidden rounded-xl border border-[#E5DBCD]/60">
                <table className="w-full text-left text-sm" aria-label="Horários de funcionamento da semana">
                  <thead className="bg-[#EFE6D8]/60 text-xs uppercase tracking-wider text-[#665A53]">
                    <tr>
                      <th scope="col" className="py-2.5 px-4 font-semibold">Dia da Semana</th>
                      <th scope="col" className="py-2.5 px-4 font-semibold text-right">Horário de Atendimento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DBCD]/60 bg-white/60">
                    {RESTAURANTE_DADOS.horariosSemanais.map((horario) => {
                      const isHoje = horario.diaSemana === currentDayIndex;
                      return (
                        <tr
                          key={horario.diaSemana}
                          className={`transition-colors ${
                            isHoje
                              ? 'bg-[#68182A]/10 font-medium text-[#281E19]'
                              : 'text-[#665A53] hover:bg-stone-50/50'
                          }`}
                        >
                          <td className="py-2.5 px-4 flex items-center gap-2">
                            <span>{horario.diaNome}</span>
                            {isHoje && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#68182A] text-white">
                                Hoje
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <span
                              className={
                                !horario.aberto
                                  ? 'text-red-700 font-semibold'
                                  : isHoje
                                  ? 'text-[#68182A] font-bold'
                                  : ''
                              }
                            >
                              {horario.textoExibicao}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Bloco Visual Representando o Mapa (SEM IFRAME) */}
          <div className="lg:col-span-6">
            <div className="bg-[#F5EEDF] rounded-2xl p-6 sm:p-8 border border-[#E5DBCD] shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#9F782E]">
                  Mapa da Região • Jardins
                </span>
                <span className="text-xs text-[#665A53]">
                  Vista Esquemática
                </span>
              </div>

              {/* Representação Gráfica Esquemática em SVG / CSS da Malha Urbana dos Jardins */}
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl bg-[#EBE1D0] border border-[#D8C7B0] overflow-hidden shadow-inner flex items-center justify-center">
                
                {/* Linhas de Ruas Estilizadas */}
                <svg
                  className="absolute inset-0 w-full h-full text-[#DFCBB0]"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D3BE9F" strokeWidth="1.5" strokeOpacity="0.4" />
                    </pattern>
                  </defs>
                  
                  {/* Fundo de malha urbana */}
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  
                  {/* Avenida Principal (simbolizando Av. Rebouças / Alameda Lorena) */}
                  <path d="M -20 180 Q 200 160 500 240" stroke="#FAF6EF" strokeWidth="20" fill="none" />
                  <path d="M -20 180 Q 200 160 500 240" stroke="#D3BE9F" strokeWidth="2" strokeDasharray="6 4" fill="none" />

                  {/* Rua das Palmeiras Cortando */}
                  <path d="M 160 -20 L 260 480" stroke="#FAF6EF" strokeWidth="16" fill="none" />
                  <path d="M 160 -20 L 260 480" stroke="#CDA34F" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeOpacity="0.7" />

                  {/* Travessa Secundária */}
                  <path d="M 40 320 L 460 120" stroke="#FAF6EF" strokeWidth="12" fill="none" opacity="0.9" />

                  {/* Áreas Verdes dos Jardins */}
                  <rect x="30" y="40" width="75" height="65" rx="8" fill="#6B8E23" fillOpacity="0.22" />
                  <rect x="330" y="270" width="110" height="90" rx="8" fill="#6B8E23" fillOpacity="0.22" />
                </svg>

                {/* Marcadores de Ruas em Texto */}
                <div className="absolute top-12 left-6 bg-white/80 px-2 py-0.5 rounded text-[11px] font-medium text-stone-600 shadow-xs">
                  Praça arborizada
                </div>
                <div className="absolute top-36 left-4 bg-white/70 px-2 py-0.5 rounded text-[10px] text-stone-500 transform -rotate-6">
                  Alameda Lorena
                </div>
                <div className="absolute bottom-16 right-6 bg-white/80 px-2 py-0.5 rounded text-[11px] text-stone-600 shadow-xs">
                  Rua Oscar Freire
                </div>
                <div className="absolute top-24 right-16 bg-white/70 px-2 py-0.5 rounded text-[10px] text-stone-500 transform rotate-70">
                  Rua das Palmeiras
                </div>

                {/* Marcador Principal do Restaurante (Pino com Efeito de Pulso) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-14 h-14 rounded-full bg-[#68182A]/25 animate-ping" />
                    <div className="w-12 h-12 rounded-full bg-[#68182A] text-white flex items-center justify-center shadow-lg border-2 border-[#E4C278] transform -translate-y-1">
                      <span className="text-xl">🍷</span>
                    </div>
                  </div>

                  {/* Tooltip do Pino */}
                  <div className="mt-2 bg-[#3B0914] text-[#FDFBF7] px-3.5 py-1.5 rounded-lg shadow-xl text-center border border-[#CDA34F]/40 whitespace-nowrap">
                    <span className="font-serif font-bold text-xs sm:text-sm block text-[#E4C278]">
                      {RESTAURANTE_DADOS.nome}
                    </span>
                    <span className="text-[11px] text-stone-200 block">
                      Rua das Palmeiras, 123
                    </span>
                  </div>
                </div>

                {/* Bússola Decorativa */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-md shadow-xs text-[10px] text-stone-600 flex items-center gap-1.5 border border-stone-200">
                  <span className="font-bold text-[#68182A]">N ↑</span>
                  <span>Jardins • SP</span>
                </div>
              </div>

              {/* Rodapé Informativo do Mapa */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#665A53]">
                <span>📍 Fácil acesso pela Av. Paulista e Rebouças</span>
                <a
                  href={RESTAURANTE_DADOS.endereco.linkGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#68182A] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
