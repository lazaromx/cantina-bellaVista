/**
 * Helper para calcular se o restaurante está aberto ou fechado em tempo real,
 * com base no relógio do navegador.
 *
 * Horários:
 * - Segunda: Fechado
 * - Terça a Quinta: 12:00–15:00 e 19:00–23:00
 * - Sexta e Sábado: 12:00–00:00
 * - Domingo: 12:00–17:00
 */

export interface RestaurantStatus {
  isOpen: boolean;
  statusLabel: string;
  badgeClass: string;
  statusDetail: string;
  currentDayName: string;
  currentDayIndex: number;
  timeFormatted: string;
  proximaAbertura?: string;
}

const DIAS_NOMES = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function getRestaurantStatus(date: Date = new Date()): RestaurantStatus {
  const day = date.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const currentDayName = DIAS_NOMES[day];
  const timeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // Segunda-feira (1): Fechado
  if (day === 1) {
    return {
      isOpen: false,
      statusLabel: 'Fechado agora',
      badgeClass: 'bg-stone-100 text-stone-700 border-stone-300',
      statusDetail: 'Fechado às segundas • Reabre terça-feira às 12:00',
      currentDayName,
      currentDayIndex: day,
      timeFormatted,
      proximaAbertura: 'Terça às 12:00',
    };
  }

  // Domingo (0): 12:00 às 17:00 (720 min a 1020 min)
  if (day === 0) {
    const abre = 12 * 60; // 720
    const fecha = 17 * 60; // 1020

    if (currentMinutes >= abre && currentMinutes < fecha) {
      return {
        isOpen: true,
        statusLabel: 'Aberto agora',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        statusDetail: 'Atendimento almoço até às 17:00 hoje',
        currentDayName,
        currentDayIndex: day,
        timeFormatted,
      };
    } else if (currentMinutes < abre) {
      return {
        isOpen: false,
        statusLabel: 'Fechado no momento',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
        statusDetail: 'Abre hoje às 12:00 (almoço de domingo)',
        currentDayName,
        currentDayIndex: day,
        timeFormatted,
        proximaAbertura: 'Hoje às 12:00',
      };
    } else {
      return {
        isOpen: false,
        statusLabel: 'Fechado agora',
        badgeClass: 'bg-stone-100 text-stone-700 border-stone-300',
        statusDetail: 'Encerrado por hoje • Reabre terça-feira às 12:00',
        currentDayName,
        currentDayIndex: day,
        timeFormatted,
        proximaAbertura: 'Terça às 12:00',
      };
    }
  }

  // Sexta (5) e Sábado (6): 12:00 às 00:00 (720 min a 1440 min)
  if (day === 5 || day === 6) {
    const abre = 12 * 60; // 720
    const fecha = 24 * 60; // 1440

    if (currentMinutes >= abre && currentMinutes < fecha) {
      return {
        isOpen: true,
        statusLabel: 'Aberto agora',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        statusDetail: 'Aberto hoje ininterruptamente até 00:00',
        currentDayName,
        currentDayIndex: day,
        timeFormatted,
      };
    } else if (currentMinutes < abre) {
      return {
        isOpen: false,
        statusLabel: 'Fechado no momento',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
        statusDetail: 'Abre hoje às 12:00 para almoço e jantar',
        currentDayName,
        currentDayIndex: day,
        timeFormatted,
        proximaAbertura: 'Hoje às 12:00',
      };
    }
  }

  // Terça (2), Quarta (3), Quinta (4): 12:00–15:00 e 19:00–23:00
  const almocoAbre = 12 * 60; // 720
  const almocoFecha = 15 * 60; // 900
  const jantarAbre = 19 * 60; // 1140
  const jantarFecha = 23 * 60; // 1380

  if (currentMinutes >= almocoAbre && currentMinutes < almocoFecha) {
    return {
      isOpen: true,
      statusLabel: 'Aberto agora',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      statusDetail: 'Horário de almoço • Aberto até às 15:00',
      currentDayName,
      currentDayIndex: day,
      timeFormatted,
    };
  } else if (currentMinutes >= jantarAbre && currentMinutes < jantarFecha) {
    return {
      isOpen: true,
      statusLabel: 'Aberto agora',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      statusDetail: 'Horário de jantar • Aberto até às 23:00',
      currentDayName,
      currentDayIndex: day,
      timeFormatted,
    };
  } else if (currentMinutes < almocoAbre) {
    return {
      isOpen: false,
      statusLabel: 'Fechado no momento',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
      statusDetail: 'Abre hoje às 12:00 para o almoço',
      currentDayName,
      currentDayIndex: day,
      timeFormatted,
      proximaAbertura: 'Hoje às 12:00',
    };
  } else if (currentMinutes >= almocoFecha && currentMinutes < jantarAbre) {
    return {
      isOpen: false,
      statusLabel: 'Intervalo da tarde',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
      statusDetail: 'Fechado entre turnos • Reabre hoje às 19:00 para o jantar',
      currentDayName,
      currentDayIndex: day,
      timeFormatted,
      proximaAbertura: 'Hoje às 19:00',
    };
  } else {
    // Após 23h
    return {
      isOpen: false,
      statusLabel: 'Fechado por hoje',
      badgeClass: 'bg-stone-100 text-stone-700 border-stone-300',
      statusDetail: 'Atendimento encerrado • Reabre amanhã às 12:00',
      currentDayName,
      currentDayIndex: day,
      timeFormatted,
      proximaAbertura: 'Amanhã às 12:00',
    };
  }
}
