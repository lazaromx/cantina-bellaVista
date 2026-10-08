import { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, MessageSquare, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { RESTAURANTE_DADOS } from '../restaurantData';

export default function ReservationSection() {
  // Estados dos campos do formulário (sem tag <form>)
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const [horario, setHorario] = useState('20:00');
  const [pessoas, setPessoas] = useState('2');
  const [observacoes, setObservacoes] = useState('');

  // Erros de validação
  const [erros, setErros] = useState<{ [key: string]: string }>({});
  
  // Confirmação de reserva enviada
  const [confirmacao, setConfirmacao] = useState<{
    nome: string;
    telefone: string;
    data: string;
    horario: string;
    pessoas: string;
    observacoes?: string;
  } | null>(null);

  // Formatação automática do telefone brasileiro (11) 99999-9999
  const handleTelefoneChange = (value: string) => {
    const limpo = value.replace(/\D/g, '').slice(0, 11);
    let formatado = limpo;

    if (limpo.length > 2) {
      formatado = `(${limpo.slice(0, 2)}) ${limpo.slice(2)}`;
    }
    if (limpo.length > 7) {
      formatado = `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7, 11)}`;
    }

    setTelefone(formatado);
    if (erros.telefone) {
      setErros((prev) => ({ ...prev, telefone: '' }));
    }
  };

  // Formatar data para exibição brasileira (DD/MM/AAAA)
  const formatarDataPtBr = (dataIso: string) => {
    if (!dataIso) return '';
    const partes = dataIso.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataIso;
  };

  // Obter data mínima permitida (hoje) no formato YYYY-MM-DD
  const hoje = new Date();
  const hojeFormatado = hoje.toISOString().split('T')[0];

  // Validação dos campos
  const validarCampos = () => {
    const novosErros: { [key: string]: string } = {};

    if (!nome.trim() || nome.trim().length < 3) {
      novosErros.nome = 'Por favor, informe seu nome completo (mínimo 3 caracteres).';
    }

    const numDigitosTelefone = telefone.replace(/\D/g, '').length;
    if (numDigitosTelefone < 10) {
      novosErros.telefone = 'Informe um telefone válido com DDD (ex.: 11 99999-9999).';
    }

    if (!dataReserva) {
      novosErros.dataReserva = 'Selecione a data desejada para a reserva.';
    } else {
      const dataSelecionada = new Date(dataReserva + 'T12:00:00');
      // Segunda-feira = 1
      if (dataSelecionada.getDay() === 1) {
        novosErros.dataReserva = 'Estamos fechados às segundas-feiras. Por favor, escolha outro dia.';
      }
    }

    if (!horario) {
      novosErros.horario = 'Selecione um horário.';
    }

    if (!pessoas) {
      novosErros.pessoas = 'Selecione o número de pessoas.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Envio da reserva
  const handleEnviarReserva = () => {
    if (!validarCampos()) {
      return;
    }

    const dataFormatada = formatarDataPtBr(dataReserva);

    // Montar texto da mensagem para o WhatsApp conforme exigência
    const mensagemTexto = `Olá! Gostaria de reservar para ${pessoas} pessoas no dia ${dataFormatada} às ${horario}.\nNome: ${nome.trim()}.\nTelefone: ${telefone}${observacoes.trim() ? `\nObservações: ${observacoes.trim()}` : ''}`;

    const urlWhatsapp = `https://wa.me/${RESTAURANTE_DADOS.contato.whatsappNumero}?text=${encodeURIComponent(
      mensagemTexto
    )}`;

    // Registrar confirmação na tela
    setConfirmacao({
      nome: nome.trim(),
      telefone,
      data: dataFormatada,
      horario,
      pessoas,
      observacoes: observacoes.trim(),
    });

    // Abrir o WhatsApp do restaurante com a mensagem já preenchida
    window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
  };

  const handleNovaReserva = () => {
    setConfirmacao(null);
    setNome('');
    setTelefone('');
    setDataReserva('');
    setObservacoes('');
    setErros({});
  };

  return (
    <section id="reservas" className="py-20 md:py-28 bg-[#F6F1E7] relative border-t border-[#E5DBCD]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9F782E] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CDA34F]" />
            <span>Garanta seu Momento</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3B0914] mb-4">
            Reserva de Mesa
          </h2>
          <p className="text-[#665A53] text-base leading-relaxed">
            Reserve sua mesa com antecedência. Ao confirmar, enviaremos os dados diretamente pelo WhatsApp para garantir seu lugar com agilidade.
          </p>
        </div>

        {/* Card Principal de Reserva */}
        <div className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-10 border border-[#E5DBCD] shadow-lg">
          
          {confirmacao ? (
            /* Tela de Confirmação Sucesso */
            <div className="py-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10" />
              </div>

              <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block mb-1">
                Solicitação Iniciada com Sucesso
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0914] mb-3">
                Obrigado, {confirmacao.nome}!
              </h3>
              <p className="text-sm text-[#665A53] max-w-md mx-auto mb-6">
                Abrimos seu WhatsApp para enviar os detalhes da sua mesa à nossa recepção. Caso a conversa não tenha aberto automaticamente, você pode clicar no botão abaixo.
              </p>

              {/* Resumo da Reserva */}
              <div className="max-w-md mx-auto bg-white/80 rounded-2xl p-5 border border-[#E5DBCD] text-left text-sm mb-6 shadow-xs">
                <div className="font-serif font-bold text-base text-[#68182A] border-b border-[#E5DBCD] pb-2 mb-3">
                  Resumo da Solicitação
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm text-[#281E19]">
                  <span className="text-stone-500">Responsável:</span>
                  <span className="font-medium text-right">{confirmacao.nome}</span>

                  <span className="text-stone-500">Contato:</span>
                  <span className="font-medium text-right">{confirmacao.telefone}</span>

                  <span className="text-stone-500">Data & Horário:</span>
                  <span className="font-medium text-right">{confirmacao.data} às {confirmacao.horario}</span>

                  <span className="text-stone-500">Número de Pessoas:</span>
                  <span className="font-medium text-right">{confirmacao.pessoas} {Number(confirmacao.pessoas) === 1 ? 'pessoa' : 'pessoas'}</span>

                  {confirmacao.observacoes && (
                    <>
                      <span className="text-stone-500">Observações:</span>
                      <span className="font-medium text-right italic">{confirmacao.observacoes}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Ações pós confirmação */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${RESTAURANTE_DADOS.contato.whatsappNumero}?text=${encodeURIComponent(
                    `Olá! Gostaria de reservar para ${confirmacao.pessoas} pessoas no dia ${confirmacao.data} às ${confirmacao.horario}.\nNome: ${confirmacao.nome}.\nTelefone: ${confirmacao.telefone}${confirmacao.observacoes ? `\nObservações: ${confirmacao.observacoes}` : ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-sm shadow transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reabrir WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleNovaReserva}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-stone-300 hover:bg-stone-100 text-[#281E19] font-medium text-sm transition-colors cursor-pointer"
                >
                  <span>Fazer outra reserva</span>
                </button>
              </div>
            </div>
          ) : (
            /* Formulário Interativo (Sem tag <form> conforme instrução) */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Nome Completo */}
                <div>
                  <label htmlFor="reserva-nome" className="block text-xs font-semibold uppercase tracking-wider text-[#281E19] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#CDA34F]" />
                    <span>Nome Completo *</span>
                  </label>
                  <input
                    id="reserva-nome"
                    type="text"
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (erros.nome) setErros((prev) => ({ ...prev, nome: '' }));
                    }}
                    placeholder="Ex: Maria Rossi"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#281E19] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] text-sm transition-all ${
                      erros.nome ? 'border-red-400 ring-1 ring-red-300' : 'border-[#E5DBCD]'
                    }`}
                  />
                  {erros.nome && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {erros.nome}
                    </p>
                  )}
                </div>

                {/* Telefone / WhatsApp */}
                <div>
                  <label htmlFor="reserva-telefone" className="block text-xs font-semibold uppercase tracking-wider text-[#281E19] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#CDA34F]" />
                    <span>Telefone / WhatsApp *</span>
                  </label>
                  <input
                    id="reserva-telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => handleTelefoneChange(e.target.value)}
                    placeholder="(11) 98765-4321"
                    maxLength={15}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#281E19] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] text-sm transition-all ${
                      erros.telefone ? 'border-red-400 ring-1 ring-red-300' : 'border-[#E5DBCD]'
                    }`}
                  />
                  {erros.telefone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {erros.telefone}
                    </p>
                  )}
                </div>

                {/* Data da Reserva */}
                <div>
                  <label htmlFor="reserva-data" className="block text-xs font-semibold uppercase tracking-wider text-[#281E19] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#CDA34F]" />
                    <span>Data da Reserva *</span>
                  </label>
                  <input
                    id="reserva-data"
                    type="date"
                    min={hojeFormatado}
                    value={dataReserva}
                    onChange={(e) => {
                      setDataReserva(e.target.value);
                      if (erros.dataReserva) setErros((prev) => ({ ...prev, dataReserva: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#281E19] focus:outline-none focus:ring-2 focus:ring-[#CDA34F] text-sm transition-all ${
                      erros.dataReserva ? 'border-red-400 ring-1 ring-red-300' : 'border-[#E5DBCD]'
                    }`}
                  />
                  {erros.dataReserva ? (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {erros.dataReserva}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-stone-500">
                      * Fechado às segundas-feiras.
                    </p>
                  )}
                </div>

                {/* Horário */}
                <div>
                  <label htmlFor="reserva-horario" className="block text-xs font-semibold uppercase tracking-wider text-[#281E19] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#CDA34F]" />
                    <span>Horário Previsto *</span>
                  </label>
                  <select
                    id="reserva-horario"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DBCD] bg-white text-[#281E19] focus:outline-none focus:ring-2 focus:ring-[#CDA34F] text-sm transition-all"
                  >
                    <optgroup label="Almoço (12h às 15h / Dom até 17h)">
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:30">15:30 (Domingos)</option>
                    </optgroup>
                    <optgroup label="Jantar (19h às 23h / Sex e Sáb até 00h)">
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00 (Recomendado)</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                    </optgroup>
                  </select>
                </div>

                {/* Número de Pessoas */}
                <div className="md:col-span-2">
                  <label htmlFor="reserva-pessoas" className="block text-xs font-semibold uppercase tracking-wider text-[#281E19] mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#CDA34F]" />
                    <span>Número de Pessoas *</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                      const isSelected = pessoas === String(num);
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPessoas(String(num))}
                          className={`py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#68182A] text-white border-[#68182A] shadow-xs'
                              : 'bg-white text-stone-700 border-[#E5DBCD] hover:bg-[#F5EEDF]'
                          }`}
                        >
                          {num} {num === 1 ? 'pess.' : 'pess.'}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1 text-[11px] text-stone-500">
                    Para grupos acima de 8 pessoas, favor informar nas observações.
                  </p>
                </div>

                {/* Observações */}
                <div className="md:col-span-2">
                  <label htmlFor="reserva-observacoes" className="block text-xs font-semibold uppercase tracking-wider text-[#281E19] mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#CDA34F]" />
                    <span>Observações Especiais (Opcional)</span>
                  </label>
                  <textarea
                    id="reserva-observacoes"
                    rows={3}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Ex: Aniversário de casamento, preferência por mesa na varanda, cadeirão infantil ou restrições alimentares."
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DBCD] bg-white text-[#281E19] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] text-sm resize-none transition-all"
                  />
                </div>
              </div>

              {/* Botão de Envio com onClick (sem tag <form>) */}
              <div className="pt-4 border-t border-[#E5DBCD]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#665A53]">
                  🔒 Seus dados são utilizados exclusivamente para o contato da sua reserva.
                </div>

                <button
                  type="button"
                  onClick={handleEnviarReserva}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#68182A] hover:bg-[#50111F] text-[#FDFBF7] font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#CDA34F] focus:ring-offset-2"
                >
                  <span>Reservar mesa pelo WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#E4C278]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
