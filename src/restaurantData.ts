/**
 * Objeto Central de Configuração da Cantina Bella Vista
 * Todos os textos, preços, horários e contatos estão reunidos aqui
 * para facilitar a personalização e manutenção.
 */

export interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number; // Em reais (R$)
  icone: string;
  selos?: ('vegetariano' | 'sem-gluten' | 'chef')[];
  destaque?: boolean;
}

export interface MenuCategory {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  itens: MenuItem[];
}

export interface HighlightItem {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
}

export interface DaySchedule {
  dia: string; // Ex: Segunda-feira
  aberto: boolean;
  horariosTexto: string;
  periodos?: { inicio: string; fim: string }[]; // Formato HH:MM
}

export const RESTAURANTE_DADOS = {
  // Informações Principais
  nome: "Cantina Bella Vista",
  subtitulo: "Trattoria & Vinho",
  cozinha: "Cozinha Italiana Contemporânea",
  slogan: "Sabores que aproximam pessoas",
  historiaResumo:
    "Nascida do amor pelas receitas tradicionais da nonna e pelo frescor da gastronomia contemporânea, a Cantina Bella Vista traz aos Jardins uma experiência italiana autêntica e calorosa. Nossas massas são abertas diariamente à mão, os molhos cozinham pacientemente em fogo brando e cada taça de vinho é escolhida para celebrar momentos inesquecíveis ao redor da mesa.",

  // Localização e Contatos
  endereco: {
    completo: "Rua das Palmeiras, 123 – Jardins, São Paulo – SP",
    logradouro: "Rua das Palmeiras, 123",
    bairro: "Jardins",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01423-000",
    pontoReferencia: "A duas quadras da Alameda Lorena, com serviço de manobrista no local.",
    linkGoogleMaps: "https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras,+123+-+Jardins,+S%C3%A3o+Paulo+-+SP",
  },

  contato: {
    whatsappFormatado: "(11) 99999-9999",
    whatsappNumero: "5511999999999",
    whatsappLink: "https://wa.me/5511999999999",
    email: "contato@bellavista.com.br",
    instagram: "@cantinabellavista",
    instagramLink: "https://instagram.com/cantinabellavista",
  },

  // 3 Destaques da seção Sobre
  destaquesSobre: [
    {
      id: "ingredientes",
      titulo: "Ingredientes Selecionados",
      descricao: "Massas artesanais frescas feitas diariamente, azeites extravirgem da Puglia e tomates San Marzano DOP.",
      icone: "wheat",
    },
    {
      id: "ambiente",
      titulo: "Ambiente Aconchegante",
      descricao: "Salão intimista com iluminação acolhedora, varanda arborizada e adega climatizada à vista.",
      icone: "heart-handshake",
    },
    {
      id: "atendimento",
      titulo: "Atendimento Afetuoso",
      descricao: "A genuína hospitalidade italiana, onde cada cliente é recebido como parte da nossa família.",
      icone: "smile",
    },
  ] as HighlightItem[],

  // Horários de Funcionamento Estruturados (Domingo = 0, Segunda = 1, ..., Sábado = 6)
  horariosSemanais: [
    {
      diaSemana: 0,
      diaNome: "Domingo",
      aberto: true,
      textoExibicao: "12h às 17h",
      periodos: [{ inicio: "12:00", fim: "17:00" }],
    },
    {
      diaSemana: 1,
      diaNome: "Segunda-feira",
      aberto: false,
      textoExibicao: "Fechado",
      periodos: [],
    },
    {
      diaSemana: 2,
      diaNome: "Terça-feira",
      aberto: true,
      textoExibicao: "12h–15h e 19h–23h",
      periodos: [
        { inicio: "12:00", fim: "15:00" },
        { inicio: "19:00", fim: "23:00" },
      ],
    },
    {
      diaSemana: 3,
      diaNome: "Quarta-feira",
      aberto: true,
      textoExibicao: "12h–15h e 19h–23h",
      periodos: [
        { inicio: "12:00", fim: "15:00" },
        { inicio: "19:00", fim: "23:00" },
      ],
    },
    {
      diaSemana: 4,
      diaNome: "Quinta-feira",
      aberto: true,
      textoExibicao: "12h–15h e 19h–23h",
      periodos: [
        { inicio: "12:00", fim: "15:00" },
        { inicio: "19:00", fim: "23:00" },
      ],
    },
    {
      diaSemana: 5,
      diaNome: "Sexta-feira",
      aberto: true,
      textoExibicao: "12h às 00h (direto)",
      periodos: [{ inicio: "12:00", fim: "24:00" }],
    },
    {
      diaSemana: 6,
      diaNome: "Sábado",
      aberto: true,
      textoExibicao: "12h às 00h (direto)",
      periodos: [{ inicio: "12:00", fim: "24:00" }],
    },
  ],

  // Resumo de Horários para Textos Curtos
  horarioResumo: "Ter a Qui 12h–15h e 19h–23h | Sex e Sáb 12h–00h | Dom 12h–17h | Segunda fechado",

  // Cardápio Completo (5 Categorias com 4 a 5 itens cada)
  cardapio: [
    {
      id: "entradas",
      nome: "Entradas",
      descricao: "Para começar e despertar o paladar com frescor e crocância",
      icone: "🥖",
      itens: [
        {
          id: "ent-1",
          nome: "Bruschetta al Pomodoro e Basilico",
          descricao: "Pão de fermentação natural tostado, tomates italianos marinados, manjericão fresco e azeite extravirgem.",
          preco: 38.0,
          icone: "🥖",
          selos: ["vegetariano"],
          destaque: false,
        },
        {
          id: "ent-2",
          nome: "Burrata Cremosa com Pesto Artesanal",
          descricao: "Burrata fresca de búfala, tomates confitados, pesto genovês de manjericão e redução de balsâmico di Modena.",
          preco: 62.0,
          icone: "🧀",
          selos: ["vegetariano", "chef"],
          destaque: true,
        },
        {
          id: "ent-3",
          nome: "Carpaccio Bella Vista",
          descricao: "Finas lâminas de filé mignon curado, emulsão de mostarda Dijon, alcaparras crocantes e lascas de Grana Padano.",
          preco: 56.0,
          icone: "🥩",
          selos: ["sem-gluten"],
          destaque: false,
        },
        {
          id: "ent-4",
          nome: "Arancini al Tartufo (4 un)",
          descricao: "Bolinhos crocantes de risoto de cogumelos com centro de queijo fontina e leve toque de azeite trufado.",
          preco: 46.0,
          icone: "🧆",
          selos: ["vegetariano"],
          destaque: false,
        },
      ],
    },
    {
      id: "massas",
      nome: "Massas Artesanais",
      descricao: "Massas frescas abertas à mão todos os dias na nossa cantina",
      icone: "🍝",
      itens: [
        {
          id: "mas-1",
          nome: "Fettuccine ai Funghi Porcini & Filé",
          descricao: "Fettuccine fresco envolvido em cogumelos porcini frescos, tiras macias de filé mignon e manteiga de sálvia.",
          preco: 86.0,
          icone: "🍝",
          selos: ["chef"],
          destaque: true,
        },
        {
          id: "mas-2",
          nome: "Ravioli di Zucca con Burro e Salvia",
          descricao: "Massa fresca recheada com abóbora cabotiá assada e noz-moscada, emulsionada em manteiga noisette, sálvia e amêndoas tostadas.",
          preco: 74.0,
          icone: "🥟",
          selos: ["vegetariano"],
          destaque: false,
        },
        {
          id: "mas-3",
          nome: "Gnocchi alla Sorrentina Gratinado",
          descricao: "Nhoque artesanal de batata ao molho pomodoro rústico, fior di latte derretido e manjericão fresco gratinado ao forno a lenha.",
          preco: 69.0,
          icone: "🍲",
          selos: ["vegetariano"],
          destaque: false,
        },
        {
          id: "mas-4",
          nome: "Tagliolini Nero com Frutos do Mar",
          descricao: "Massa negra com tinta de lula, camarões grelhados, lulas, vôngoles e tomate cereja puxados no vinho branco.",
          preco: 98.0,
          icone: "🦐",
          selos: ["chef"],
          destaque: true,
        },
        {
          id: "mas-5",
          nome: "Lasagna Tradizionale Bolognese",
          descricao: "Camadas delicadas de massa fresca com ragù bovino cozido por 8 horas, bechamel sedoso e parmesão gratinado.",
          preco: 78.0,
          icone: "🥘",
          selos: [],
          destaque: false,
        },
      ],
    },
    {
      id: "pratos-principais",
      nome: "Pratos Principais",
      descricao: "Cortes nobres e clássicos da gastronomia italiana com assinatura contemporânea",
      icone: "🥩",
      itens: [
        {
          id: "pri-1",
          nome: "Ossobuco alla Milanese com Risotto",
          descricao: "Corte tradicional cozido lentamente em vinho tinto e ervas, guarnecido de cremoso risoto ao açafrão da terra.",
          preco: 108.0,
          icone: "🍖",
          selos: ["chef", "sem-gluten"],
          destaque: true,
        },
        {
          id: "pri-2",
          nome: "Bistecca alla Fiorentina Prime (para compartilhar)",
          descricao: "T-Bone grelhado ao ponto na brasa, servido com batatas rústicas ao alecrim e alho confit (serve 2 pessoas).",
          preco: 184.0,
          icone: "🥩",
          selos: ["sem-gluten"],
          destaque: false,
        },
        {
          id: "pri-3",
          nome: "Salmone in Crosta di Erbe",
          descricao: "Filé de salmão fresco em crosta aromática de ervas finas e castanhas, acompanhado de purê aveludado de mandioquinha.",
          preco: 89.0,
          icone: "🐟",
          selos: ["sem-gluten"],
          destaque: false,
        },
        {
          id: "pri-4",
          nome: "Polenta Taragna com Ragù de Cogumelos",
          descricao: "Polenta cremosa com queijo gorgonzola dolce e farto ragù de cogumelos selvagens e azeite trufado.",
          preco: 72.0,
          icone: "🥣",
          selos: ["vegetariano", "sem-gluten"],
          destaque: false,
        },
      ],
    },
    {
      id: "sobremesas",
      nome: "Sobremesas",
      descricao: "Finais doces e memoráveis com a alma da Itália",
      icone: "🍰",
      itens: [
        {
          id: "sob-1",
          nome: "Tiramisù Clássico Veneziano",
          descricao: "Biscoito savoiardi embebido em café espresso puro e Marsala, camadas ricas de creme de mascarpone e cacau 100%.",
          preco: 36.0,
          icone: "☕",
          selos: ["chef"],
          destaque: true,
        },
        {
          id: "sob-2",
          nome: "Panna Cotta ai Frutti di Bosco",
          descricao: "Delicada panna cotta de baunilha Bourbon em fava, servida com calda fresca de amoras e framboesas silvestres.",
          preco: 32.0,
          icone: "🍓",
          selos: ["sem-gluten"],
          destaque: false,
        },
        {
          id: "sob-3",
          nome: "Cannoli Siciliani Crocanti (2 un)",
          descricao: "Massa frita crocante recheada com ricota doce artesanal, gotas de chocolate belga e pistaches tostados de Bronte.",
          preco: 34.0,
          icone: "🥐",
          selos: [],
          destaque: false,
        },
        {
          id: "sob-4",
          nome: "Gelato Artesanal Bella Vista",
          descricao: "Duas bolas de gelato cremoso à sua escolha: Pistache Siciliano, Cioccolato Fondente ou Flor de Leite com Caramelo.",
          preco: 28.0,
          icone: "🍨",
          selos: ["sem-gluten", "vegetariano"],
          destaque: false,
        },
      ],
    },
    {
      id: "bebidas",
      nome: "Bebidas & Vinhos",
      descricao: "Rótulos selecionados, coquetéis clássicos e refrescantes",
      icone: "🍷",
      itens: [
        {
          id: "beb-1",
          nome: "Vinho Chianti Classico DOCG (Taça)",
          descricao: "Tinto toscano elegante, com notas de cereja madura, tabaco e taninos aveludados. Excelente para harmonizar com massas.",
          preco: 42.0,
          icone: "🍷",
          selos: ["chef"],
          destaque: true,
        },
        {
          id: "beb-2",
          nome: "Aperol Spritz Clássico",
          descricao: "Aperol, espumante prosecco italiano, água com gás e fatia de laranja fresca.",
          preco: 39.0,
          icone: "🍹",
          selos: [],
          destaque: false,
        },
        {
          id: "beb-3",
          nome: "Negroni Bella Vista",
          descricao: "Gin artesanal, vermute rosso italiano, Campari infusionado com casca de laranja amarga.",
          preco: 44.0,
          icone: "🥃",
          selos: [],
          destaque: false,
        },
        {
          id: "beb-4",
          nome: "Limonata Siciliana com Alecrim",
          descricao: "Suco natural de limão siciliano, xarope de açúcar demerara e ramo de alecrim fresco macerado.",
          preco: 18.0,
          icone: "🍋",
          selos: ["vegetariano", "sem-gluten"],
          destaque: false,
        },
        {
          id: "beb-5",
          nome: "Água San Pellegrino / Acqua Panna (505ml)",
          descricao: "Água mineral italiana com ou sem gás.",
          preco: 22.0,
          icone: "🍾",
          selos: ["sem-gluten"],
          destaque: false,
        },
      ],
    },
  ] as MenuCategory[],
};
