import { useState } from 'react';
import { Award, Leaf, Wheat, Sparkles, Check } from 'lucide-react';
import { RESTAURANTE_DADOS, MenuCategory, MenuItem } from '../restaurantData';

export default function MenuSection() {
  const [activeTabId, setActiveTabId] = useState<string>('entradas');

  const categories = RESTAURANTE_DADOS.cardapio;
  const currentCategory = categories.find((cat) => cat.id === activeTabId) || categories[0];

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const renderBadge = (badge: 'vegetariano' | 'sem-gluten' | 'chef') => {
    switch (badge) {
      case 'chef':
        return (
          <span
            key={badge}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#68182A]/10 text-[#68182A] border border-[#68182A]/20"
            title="Receita autoral recomendada pelo Chef"
          >
            <Award className="w-3 h-3 text-[#CDA34F]" />
            Chef recomenda
          </span>
        );
      case 'vegetariano':
        return (
          <span
            key={badge}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
            title="Opção vegetariana"
          >
            <Leaf className="w-3 h-3" />
            Vegetariano
          </span>
        );
      case 'sem-gluten':
        return (
          <span
            key={badge}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"
            title="Sem ingredientes com glúten"
          >
            <Wheat className="w-3 h-3" />
            Sem glúten
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="cardapio" className="py-20 md:py-28 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9F782E] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CDA34F]" />
            <span>Nossa Gastronomia</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3B0914] mb-4">
            Cardápio da Trattoria
          </h2>
          <p className="text-[#665A53] text-base leading-relaxed">
            Receitas preparadas no momento com ingredientes frescos, massa artesanal e o toque contemporâneo da nossa cozinha.
          </p>

          {/* Legenda de Selos Dietéticos */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#665A53]">
            <span className="flex items-center gap-1 bg-[#F5EEDF] px-2.5 py-1 rounded-full">
              <Award className="w-3 h-3 text-[#68182A]" /> Chef recomenda
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
              <Leaf className="w-3 h-3 text-emerald-600" /> Vegetariano
            </span>
            <span className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
              <Wheat className="w-3 h-3 text-amber-700" /> Sem glúten
            </span>
          </div>
        </div>

        {/* Abas por Categoria */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 sm:gap-3 no-scrollbar"
        >
          {categories.map((category) => {
            const isSelected = category.id === activeTabId;
            return (
              <button
                key={category.id}
                role="tab"
                id={`tab-${category.id}`}
                aria-controls={`panel-${category.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTabId(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] focus:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#68182A] text-[#FDFBF7] shadow-md shadow-[#68182A]/20 scale-102'
                    : 'bg-[#F6F1E7] text-[#281E19]/80 hover:bg-[#EFE6D8] hover:text-[#68182A]'
                }`}
              >
                <span className="text-base" role="img" aria-hidden="true">
                  {category.icone}
                </span>
                <span>{category.nome}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-stone-600'
                  }`}
                >
                  {category.itens.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Descrição da Categoria Ativa */}
        <div className="text-center mb-8">
          <p className="text-sm italic font-serif text-[#68182A]">
            {currentCategory.descricao}
          </p>
        </div>

        {/* Grid de Itens do Cardápio com Transição Suave */}
        <div
          role="tabpanel"
          id={`panel-${currentCategory.id}`}
          aria-labelledby={`tab-${currentCategory.id}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300"
        >
          {currentCategory.itens.map((item) => (
            <div
              key={item.id}
              className={`group bg-[#FAF6EF] rounded-2xl p-6 border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                item.destaque
                  ? 'border-[#CDA34F]/70 shadow-xs ring-1 ring-[#CDA34F]/30 bg-gradient-to-br from-[#FAF6EF] to-[#F5ECE0]'
                  : 'border-[#E5DBCD]/80 hover:border-[#CDA34F]/50'
              }`}
            >
              <div>
                {/* Linha de Título, Ícone e Preço */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    {/* Visual ilustrativo com Emoji / Gradiente CSS
                        DICA: Para exibir foto real em miniatura de cada prato, substitua este span por:
                        <img src={`/pratos/${item.id}.jpg`} alt={item.nome} className="w-10 h-10 rounded-full object-cover" />
                    */}
                    <div className="w-10 h-10 rounded-xl bg-[#68182A]/5 border border-[#CDA34F]/20 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                      {item.icone}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#281E19] group-hover:text-[#68182A] transition-colors leading-tight">
                        {item.nome}
                      </h3>
                    </div>
                  </div>

                  {/* Preço em R$ com destaque */}
                  <div className="shrink-0 text-right">
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#68182A] tabular-nums whitespace-nowrap">
                      {formatPrice(item.preco)}
                    </span>
                  </div>
                </div>

                {/* Descrição do Prato */}
                <p className="text-sm text-[#665A53] leading-relaxed mb-4 pl-12.5">
                  {item.descricao}
                </p>
              </div>

              {/* Selos Opcionais */}
              {item.selos && item.selos.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5DBCD]/50 pl-12.5">
                  {item.selos.map((badge) => renderBadge(badge))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rodapé do Cardápio: Informação sobre Alergênicos & Carta de Vinhos */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F6F1E7] border border-[#E5DBCD] text-center max-w-2xl mx-auto text-xs sm:text-sm text-[#665A53]">
          <p className="mb-2">
            🍷 <strong>Harmonização especial:</strong> Consulte nosso sommelier para sugestões de vinhos italianos que complementam perfeitamente sua escolha.
          </p>
          <p className="text-stone-500 text-xs">
            Avisos de alergia: informe nosso garçom sobre quaisquer restrições alimentares antes de fazer seu pedido.
          </p>
        </div>
      </div>
    </section>
  );
}
