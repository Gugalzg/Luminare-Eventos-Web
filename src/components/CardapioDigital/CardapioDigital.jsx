import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp } from '../../utils/whatsapp';
import './CardapioDigital.css';

const TEMAS_DISPONIVEIS = [
  'Fazendinha', 'Safari', 'Cinderela', 'Princesas', 'Stitch',
  'Fundo do Mar', 'Floresta Encantada', 'Turma da Mônica', 'Vaquinha (tete)', 
  'Patrulha Canina', 'Floresta Encantada', 'Dinossauros', 'Princesas',
  'Nuvens', 'Outro (tema personalizado)',
];

const TIPOS_ARCO = [
  { id: 'arco-redondo', nome: 'Arco Redondo', imagemExemplo: '/images/gallery/arco-redondo.png' },
  { id: 'arco-quadrado', nome: 'Arco Quadrado', imagemExemplo: '/images/gallery/arco-quadrado.png' },
  { id: 'arco-romano', nome: 'Arco Romano', imagemExemplo: '/images/gallery/arco-romano.png' },
];

const MAX_TIPOS_ARCO = 2;

const MINI_FESTA_OPCOES = [
  {
    id: 'mini-festa',
    nome: 'Mini Festa',
    desc: 'Pacote básico',
    imagens: [
      '/images/gallery/mini-festa-1.jpg',
      '/images/gallery/mini-festa-2.jpg',
      '/images/gallery/mini-festa-3.jpg',
    ],
  },
  {
    id: 'mini-festa-mesa',
    nome: 'Mini Festa na Mesa',
    desc: 'Decoração focada na mesa',
    imagens: [
      '/images/gallery/mini-festa-4.jpg',
      '/images/gallery/mini-festa-5.jpg',
      '/images/gallery/mini-festa-6.jpg',
    ],
  },
  {
    id: 'mini-festa-premium',
    nome: 'Mini Festa Premium',
    desc: 'Pacote completo premium',
    imagens: [
      '/images/gallery/mini-festa-cardapio/mini-festa-premium-1.jpg',
      '/images/gallery/mini-festa-cardapio/mini-festa-premium-2.jpeg',
      '/images/gallery/mini-festa-cardapio/mini-festa-premium-3.jpeg',
    ],
  },
];

const formatCep = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const formatDate = (value) => {
  if (!value) return '';
  const parts = value.split('-');
  if (parts.length !== 3) return value;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

function CardapioDigital() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1); // 1=dados+tipo, 2=detalhes do tipo, 3=pagamento
  const [cepStatus, setCepStatus] = useState('idle'); // idle | loading | success | error
  const [cepMensagem, setCepMensagem] = useState('Digite o CEP para completar o endereço automaticamente.');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cep: '',
    dataEvento: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    tipoEvento: '',
    tipoEventoOutro: '',
    tipoFesta: '',
  });

  // Bubble
  const [bubbleData, setBubbleData] = useState({
    escrita: '',
    coresDesejadas: '',
    fotoEscolhida: null,
  });

  // Mini Festa
  const [miniFestaData, setMiniFestaData] = useState({
    subtipo: '', // 'mini-festa' | 'mini-festa-mesa' | 'mini-festa-premium'
    tema: '',
    temaPersonalizado: '',
    observacoes: '',
  });

  // Decoração Montada
  const [decoracaoData, setDecoracaoData] = useState({
    tipoArco: [],
    coresTema: '',
    mesas: {
      cilindros: 0,
      mesaTrelicas: 0,
      mesaBranca: 0,
      banquetas: 0,
    },
    observacoes: '',
  });

  // Pagamento
  const [pagamentoData, setPagamentoData] = useState({
    formaPagamento: '', // 'pix' | 'dinheiro' | 'cartao'
  });

  const toggleTipoArco = (arcoId) => {
    setDecoracaoData((prev) => {
      const jaSelecionado = prev.tipoArco.includes(arcoId);
      if (jaSelecionado) {
        return {
          ...prev,
          tipoArco: prev.tipoArco.filter((id) => id !== arcoId),
        };
      }
      if (prev.tipoArco.length >= MAX_TIPOS_ARCO) return prev;
      return {
        ...prev,
        tipoArco: [...prev.tipoArco, arcoId],
      };
    });
  };

  const tiposEvento = [
    'Aniversário Infantil',
    'Aniversário Adulto',
    'Chá de Casa Nova',
    'Despedida de Solteira',
    'Chá Revelação',
    'Chá de Bebê',
    'Outros',
  ];

  const tiposFesta = [
    {
      id: 'bubble',
      nome: 'Bubble',
      descricao: 'Decoração com balões bubble personalizados',
      icone: '🫧',
      imagens: [
        '/images/gallery/balao-bubble-1.jpg',
        '/images/gallery/balao-bubble-2.jpg',
        '/images/gallery/balao-bubble-3.jpg',
        '/images/gallery/balao-bubble-4.jpeg',
        '/images/gallery/balao-bubble-5.jpeg',
        '/images/gallery/balao-bubble-6.jpeg',
      ],
    },
    {
      id: 'mini-festa',
      nome: 'Mini Festa',
      descricao: 'Pacote compacto para festas íntimas',
      icone: '🎉',
      imagens: [
        '/images/gallery/mini-festa-1.jpg',
        '/images/gallery/mini-festa-2.jpg',
        '/images/gallery/mini-festa-3.jpg',
        '/images/gallery/mini-festa-4.jpg',
        '/images/gallery/mini-festa-5.jpg',
        '/images/gallery/mini-festa-6.jpg',
        '/images/gallery/mini-festa-7.jpg',
        '/images/gallery/mini-festa-8.jpg',
        '/images/gallery/mini-festa-9.jpg',
      ],
    },
    {
      id: 'decoracao-montada',
      nome: 'Decoração Montada',
      descricao: 'Decoração completa montada no local',
      icone: '✨',
      imagens: [
        '/images/gallery/festas-personalizadas-1.jpg',
        '/images/gallery/festas-personalizadas-2.jpg',
        '/images/gallery/festas-personalizadas-3.jpg',
        '/images/gallery/festas-personalizadas-4.jpg',
        '/images/gallery/festas-personalizadas-5.jpg',
        '/images/gallery/festas-personalizadas-6.jpg',
      ],
    },
  ];

  const [galeriaAberta, setGaleriaAberta] = useState(null);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  useEffect(() => {
    if (galeriaAberta || imagemAmpliada) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [galeriaAberta, imagemAmpliada]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (imagemAmpliada) setImagemAmpliada(null);
        else if (galeriaAberta) setGaleriaAberta(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [galeriaAberta, imagemAmpliada]);

  // Scroll to top ao trocar etapa
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [etapa]);

  useEffect(() => {
    const cepLimpo = formData.cep.replace(/\D/g, '');

    if (cepLimpo.length === 0) {
      setCepStatus('idle');
      setCepMensagem('Digite o CEP para completar o endereço automaticamente.');
      setFormData((prev) => ({
        ...prev,
        rua: '',
        bairro: '',
        cidade: '',
      }));
      return;
    }

    if (cepLimpo.length < 8) {
      setCepStatus('idle');
      setCepMensagem('CEP incompleto. Informe os 8 dígitos.');
      setFormData((prev) => ({
        ...prev,
        rua: '',
        bairro: '',
        cidade: '',
      }));
      return;
    }

    let cancelado = false;

    const buscarCep = async () => {
      setCepStatus('loading');
      setCepMensagem('Buscando endereço no ViaCEP...');

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        if (!response.ok) throw new Error('Resposta inválida do ViaCEP.');

        const dados = await response.json();
        if (dados.erro) {
          if (!cancelado) {
            setCepStatus('error');
            setCepMensagem('CEP não encontrado. Verifique e tente novamente.');
          }
          return;
        }

        if (!cancelado) {
          setFormData((prev) => ({
            ...prev,
            rua: dados.logradouro || '',
            bairro: dados.bairro || '',
            cidade: dados.localidade || '',
          }));
          setCepStatus('success');
          setCepMensagem('Rua, bairro e cidade preenchidos automaticamente.');
        }
      } catch (error) {
        if (!cancelado) {
          console.error('Erro ao consultar ViaCEP:', error);
          setCepStatus('error');
          setCepMensagem('Não foi possível consultar o CEP agora. Tente novamente.');
        }
      }
    };

    buscarCep();

    return () => {
      cancelado = true;
    };
  }, [formData.cep]);

  const abrirGaleria = (tipo, e) => {
    e.stopPropagation();
    setGaleriaAberta(tipo);
  };

  const abrirGaleriaMiniFesta = (subtipo, e) => {
    e.preventDefault();
    e.stopPropagation();
    setGaleriaAberta({
      id: 'mini-festa',
      subtipo: subtipo.id,
      nome: subtipo.nome,
      descricao: subtipo.desc,
      icone: '🎉',
      imagens: subtipo.imagens,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipoFestaSelect = (id) => {
    setFormData((prev) => ({ ...prev, tipoFesta: id }));
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formatted }));
  };

  const handleCepChange = (e) => {
    const formatted = formatCep(e.target.value);
    setFormData((prev) => ({ ...prev, cep: formatted }));
  };

  // Validação etapa 1
  const isEtapa1Valid = () => {
    const {
      nome,
      telefone,
      cep,
      dataEvento,
      rua,
      numero,
      bairro,
      cidade,
      tipoEvento,
      tipoEventoOutro,
      tipoFesta,
    } = formData;
    const cepValido = cep.replace(/\D/g, '').length === 8;
    const tipoEventoPreenchido = tipoEvento === 'Outros' ? tipoEventoOutro.trim() !== '' : tipoEvento !== '';
    return (
      nome.trim()
      && telefone.trim()
      && cepValido
      && dataEvento
      && rua.trim()
      && numero.trim()
      && bairro.trim()
      && cidade.trim()
      && tipoEventoPreenchido
      && tipoFesta
    );
  };

  // Validação etapa 2
  const isEtapa2Valid = () => {
    if (formData.tipoFesta === 'bubble') {
      return bubbleData.escrita.trim() && bubbleData.coresDesejadas.trim() && bubbleData.fotoEscolhida;
    }
    if (formData.tipoFesta === 'mini-festa') {
      if (!miniFestaData.subtipo || !miniFestaData.tema) return false;
      if (miniFestaData.tema === 'Outro (tema personalizado)' && !miniFestaData.temaPersonalizado.trim()) return false;
      return true;
    }
    if (formData.tipoFesta === 'decoracao-montada') {
      return decoracaoData.tipoArco.length > 0 && decoracaoData.coresTema.trim();
    }
    return false;
  };

  // Validação etapa 3
  const isEtapa3Valid = () => {
    return pagamentoData.formaPagamento !== '';
  };

  // Calcula se o tema precisa de 7 dias
  const diasAteEvento = useMemo(() => {
    if (!formData.dataEvento) return null;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const evento = new Date(formData.dataEvento + 'T00:00:00');
    const diff = Math.ceil((evento - hoje) / (1000 * 60 * 60 * 24));
    return diff;
  }, [formData.dataEvento]);

  const temaPrecisaPrazo = (tema) => {
    if (!tema || tema === 'Outro (tema personalizado)') return true;
    return false;
  };

  const avisoTema = useMemo(() => {
    if (!miniFestaData.tema) return null;
    const precisaPrazo = temaPrecisaPrazo(miniFestaData.tema);
    if (precisaPrazo && diasAteEvento !== null && diasAteEvento < 7) {
      return '⚠️ Temas personalizados necessitam de no mínimo 7 dias de antecedência para encomenda.';
    }
    return null;
  }, [miniFestaData.tema, diasAteEvento]);

  const gerarMensagemWhatsApp = () => {
    const tipoEventoFinal = formData.tipoEvento === 'Outros'
      ? formData.tipoEventoOutro
      : formData.tipoEvento;

    const tipoFestaFinal = tiposFesta.find((tipo) => tipo.id === formData.tipoFesta)?.nome
      || formData.tipoFesta;

    const detalhes = [];

    if (formData.tipoFesta === 'bubble') {
      detalhes.push(`Escrita no Bubble: ${bubbleData.escrita}`);
      detalhes.push(`Cores desejadas: ${bubbleData.coresDesejadas}`);
      if (bubbleData.fotoEscolhida) {
        const foto = bubbleData.fotoEscolhida.split('/').pop();
        detalhes.push(`Foto escolhida: ${foto}`);
      }
    }

    if (formData.tipoFesta === 'mini-festa') {
      const subtipo = MINI_FESTA_OPCOES.find((opt) => opt.id === miniFestaData.subtipo)?.nome
        || miniFestaData.subtipo;
      const tema = miniFestaData.tema === 'Outro (tema personalizado)'
        ? miniFestaData.temaPersonalizado
        : miniFestaData.tema;
      detalhes.push(`Tipo de Mini Festa: ${subtipo}`);
      detalhes.push(`Tema: ${tema}`);
      if (miniFestaData.observacoes.trim()) {
        detalhes.push(`Observacoes: ${miniFestaData.observacoes}`);
      }
    }

    if (formData.tipoFesta === 'decoracao-montada') {
      const arcos = decoracaoData.tipoArco
        .map((id) => TIPOS_ARCO.find((arco) => arco.id === id)?.nome || id)
        .join(', ');
      const mesasSelecionadas = [
        { key: 'cilindros', nome: 'Cilindros' },
        { key: 'mesaTrelicas', nome: 'Mesa de Trelicas' },
        { key: 'mesaBranca', nome: 'Mesa Branca' },
        { key: 'banquetas', nome: 'Banquetas' },
      ]
        .filter((mesa) => decoracaoData.mesas[mesa.key] > 0)
        .map((mesa) => `${mesa.nome}: ${decoracaoData.mesas[mesa.key]}`);

      detalhes.push(`Tipo de arco: ${arcos}`);
      detalhes.push(`Cores do tema: ${decoracaoData.coresTema}`);
      detalhes.push(`Mesas: ${mesasSelecionadas.length ? mesasSelecionadas.join(', ') : 'Nenhuma'}`);
      if (decoracaoData.observacoes.trim()) {
        detalhes.push(`Observacoes: ${decoracaoData.observacoes}`);
      }
    }

    const formaPagamento = pagamentoData.formaPagamento === 'pix'
      ? 'Pix'
      : pagamentoData.formaPagamento === 'dinheiro'
        ? 'Dinheiro'
        : 'Cartao';

    const linhas = [
      'Ola! Seguem os dados do meu evento:',
      '',
      '*Dados do evento*',
      `Nome: ${formData.nome}`,
      `Telefone: ${formData.telefone}`,
      `Data do evento: ${formatDate(formData.dataEvento)}`,
      `Endereco: ${formData.rua}, ${formData.numero} - ${formData.bairro}, ${formData.cidade} - CEP ${formData.cep}`,
      `Tipo de evento: ${tipoEventoFinal}`,
      '',
      '*Tipo de festa*',
      `Tipo: ${tipoFestaFinal}`,
    ];

    if (detalhes.length) {
      linhas.push(...detalhes);
    }

    linhas.push('', '*Pagamento*', `Forma de pagamento: ${formaPagamento}`);

    return linhas.join('\n');
  };

  const handleContinuarEtapa1 = (e) => {
    e.preventDefault();
    if (!isEtapa1Valid()) return;
    setEtapa(2);
  };

  const handleContinuarEtapa2 = (e) => {
    e.preventDefault();
    if (!isEtapa2Valid()) return;
    setEtapa(3);
  };

  const handleFinalizar = (e) => {
    e.preventDefault();
    if (!isEtapa3Valid()) return;
    console.log('Dados completos:', {
      ...formData,
      detalhes: formData.tipoFesta === 'bubble' ? bubbleData
        : formData.tipoFesta === 'mini-festa' ? miniFestaData
        : decoracaoData,
      pagamento: pagamentoData,
    });

    const mensagem = gerarMensagemWhatsApp();
    openWhatsApp(mensagem, 'cardapio');
  };

  const handleVoltar = () => {
    setEtapa((prev) => Math.max(1, prev - 1));
  };

  // Encontra o tipo de festa selecionado
  const tipoFestaSelecionado = tiposFesta.find((t) => t.id === formData.tipoFesta);

  // ================================
  // RENDER - Etapa Bubble
  // ================================
  const renderBubble = () => (
    <section className="cardapio-secao">
      <div className="secao-header">
        <span className="secao-numero">3</span>
        <h2>Detalhes do Bubble</h2>
      </div>

      <div className="form-grid">
        <div className="form-group form-group-full">
          <label htmlFor="bubbleEscrita">Escrita no Bubble</label>
          <input
            type="text"
            id="bubbleEscrita"
            placeholder="Ex: Feliz Aniversário Maria!"
            value={bubbleData.escrita}
            onChange={(e) => setBubbleData((prev) => ({ ...prev, escrita: e.target.value }))}
          />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="bubbleCores">Cores Desejadas</label>
          <input
            type="text"
            id="bubbleCores"
            placeholder="Ex: Rosa, dourado e branco"
            value={bubbleData.coresDesejadas}
            onChange={(e) => setBubbleData((prev) => ({ ...prev, coresDesejadas: e.target.value }))}
          />
        </div>

        <div className="form-group form-group-full">
          <label>Escolha a foto que mais se assemelha ao que deseja</label>
          <div className="bubble-fotos-grid">
            {tipoFestaSelecionado?.imagens.map((img, idx) => (
              <div
                key={idx}
                className={`bubble-foto-item ${bubbleData.fotoEscolhida === img ? 'selecionada' : ''}`}
                onClick={() => setBubbleData((prev) => ({ ...prev, fotoEscolhida: img }))}
              >
                <img src={img} alt={`Bubble exemplo ${idx + 1}`} loading="lazy" />
                {bubbleData.fotoEscolhida === img && (
                  <div className="bubble-foto-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ================================
  // RENDER - Etapa Mini Festa
  // ================================
  const renderMiniFesta = () => (
    <section className="cardapio-secao">
      <div className="secao-header">
        <span className="secao-numero">3</span>
        <h2>Detalhes da Mini Festa</h2>
      </div>

      <div className="form-grid">
        <div className="form-group form-group-full">
          <label>Tipo de Mini Festa</label>
          <div className="mini-festa-opcoes">
            {MINI_FESTA_OPCOES.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`mini-festa-btn ${miniFestaData.subtipo === opt.id ? 'selecionado' : ''}`}
                onClick={() => setMiniFestaData((prev) => ({ ...prev, subtipo: opt.id }))}
              >
                <span className="mini-festa-btn-nome">{opt.nome}</span>
                <span className="mini-festa-btn-desc">{opt.desc}</span>
                <div className="mini-festa-preview" aria-hidden="true">
                  {opt.imagens.map((img, idx) => (
                    <img key={img} src={img} alt={`${opt.nome} exemplo ${idx + 1}`} loading="lazy" />
                  ))}
                </div>
                <span
                  className="mini-festa-ver-exemplos"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => abrirGaleriaMiniFesta(opt, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      abrirGaleriaMiniFesta(opt, e);
                    }
                  }}
                >
                  Ver exemplos
                </span>
                {miniFestaData.subtipo === opt.id && <span className="mini-festa-btn-check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="miniTema">Escolha do Tema</label>
          <select
            id="miniTema"
            value={miniFestaData.tema}
            onChange={(e) => setMiniFestaData((prev) => ({ ...prev, tema: e.target.value }))}
          >
            <option value="">Selecione um tema</option>
            {TEMAS_DISPONIVEIS.map((tema) => (
              <option key={tema} value={tema}>{tema}</option>
            ))}
          </select>
          {avisoTema && (
            <span className="aviso-tema">{avisoTema}</span>
          )}
        </div>

        {miniFestaData.tema === 'Outro (tema personalizado)' && (
          <div className="form-group form-group-full form-group-outros">
            <label htmlFor="temaPersonalizado">Descreva o tema desejado</label>
            <input
              type="text"
              id="temaPersonalizado"
              placeholder="Descreva o tema personalizado"
              value={miniFestaData.temaPersonalizado}
              onChange={(e) => setMiniFestaData((prev) => ({ ...prev, temaPersonalizado: e.target.value }))}
            />
            {diasAteEvento !== null && diasAteEvento < 7 && (
              <span className="aviso-tema">
                ⚠️ Temas personalizados necessitam de no mínimo 7 dias de antecedência para encomenda.
              </span>
            )}
          </div>
        )}

        <div className="form-group form-group-full">
          <label htmlFor="miniObs">Observações</label>
          <textarea
            id="miniObs"
            placeholder="Alguma observação especial?"
            rows={3}
            value={miniFestaData.observacoes}
            onChange={(e) => setMiniFestaData((prev) => ({ ...prev, observacoes: e.target.value }))}
          />
        </div>
      </div>
    </section>
  );

  // ================================
  // RENDER - Etapa Decoração Montada
  // ================================
  const renderDecoracaoMontada = () => (
    <section className="cardapio-secao">
      <div className="secao-header">
        <span className="secao-numero">3</span>
        <h2>Detalhes da Decoração Montada</h2>
      </div>

      <div className="form-grid">
        <div className="form-group form-group-full">
          <label>Tipo de Arco de Balões</label>
          <small className="arco-hint">Selecione até 2 opções</small>
          <div className="arco-opcoes">
            {TIPOS_ARCO.map((arco) => {
              const selecionado = decoracaoData.tipoArco.includes(arco.id);
              const bloqueado = !selecionado && decoracaoData.tipoArco.length >= MAX_TIPOS_ARCO;
              return (
                <div
                  key={arco.id}
                  className={`arco-btn ${selecionado ? 'selecionado' : ''} ${bloqueado ? 'desabilitado' : ''}`}
                >
                  <label className="arco-select-btn">
                    <input
                      type="checkbox"
                      className="arco-checkbox"
                      checked={selecionado}
                      onChange={() => toggleTipoArco(arco.id)}
                      disabled={bloqueado}
                      aria-label={arco.nome}
                    />
                    <span>{arco.nome}</span>
                    {selecionado && <span className="arco-btn-check">✓</span>}
                  </label>
                  <button
                    type="button"
                    className="arco-thumb-btn"
                    onClick={() => setImagemAmpliada(arco.imagemExemplo)}
                    aria-label={`Ampliar exemplo de ${arco.nome}`}
                  >
                    <img
                      src={arco.imagemExemplo}
                      alt={`Exemplo de ${arco.nome}`}
                      className={`arco-thumb-img ${arco.id === 'arco-redondo' ? 'arco-thumb-img-redondo' : ''}`}
                      loading="lazy"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="coresTema">Cores Tema</label>
          <input
            type="text"
            id="coresTema"
            placeholder="Ex: Azul, branco e prata"
            value={decoracaoData.coresTema}
            onChange={(e) => setDecoracaoData((prev) => ({ ...prev, coresTema: e.target.value }))}
          />
        </div>

        <div className="form-group form-group-full">
          <label>Adicionar Mesas</label>
          <div className="mesas-grid">
            {[
              {
                key: 'cilindros',
                nome: 'Cilindros',
                max: 3,
                imagemExemplo: '/images/gallery/cilindro-festa.png',
              },
              {
                key: 'mesaTrelicas',
                nome: 'Mesa de Treliças',
                max: 1,
                imagemExemplo: '/images/gallery/mesa-treli%C3%A7a.png',
              },
              {
                key: 'mesaBranca',
                nome: 'Mesa Branca',
                max: 1,
                imagemExemplo: '/images/gallery/mesa-branca.png',
              },
              {
                key: 'banquetas',
                nome: 'Banquetas',
                max: 2,
                imagemExemplo: '/images/gallery/banqueta.png',
              },
            ].map((mesa) => (
              <div key={mesa.key} className="mesa-item">
                <div className="mesa-info">
                  <span className="mesa-nome">{mesa.nome}</span>
                  <button
                    type="button"
                    className="mesa-thumb-btn"
                    onClick={() => setImagemAmpliada(mesa.imagemExemplo)}
                    aria-label={`Ampliar exemplo de ${mesa.nome}`}
                  >
                    <img
                      src={mesa.imagemExemplo}
                      alt={`Exemplo de ${mesa.nome}`}
                      className={`mesa-thumb-img ${mesa.key === 'banquetas' ? 'mesa-thumb-img-banquetas' : ''}`}
                      loading="lazy"
                    />
                  </button>
                </div>
                <div className="mesa-controles">
                  <button
                    type="button"
                    className="mesa-btn-menos"
                    onClick={() => setDecoracaoData((prev) => ({
                      ...prev,
                      mesas: { ...prev.mesas, [mesa.key]: Math.max(0, prev.mesas[mesa.key] - 1) },
                    }))}
                    disabled={decoracaoData.mesas[mesa.key] === 0}
                  >
                    −
                  </button>
                  <span className="mesa-qtd">{decoracaoData.mesas[mesa.key]}</span>
                  <button
                    type="button"
                    className="mesa-btn-mais"
                    onClick={() => setDecoracaoData((prev) => ({
                      ...prev,
                      mesas: { ...prev.mesas, [mesa.key]: Math.min(mesa.max, prev.mesas[mesa.key] + 1) },
                    }))}
                    disabled={decoracaoData.mesas[mesa.key] >= mesa.max}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="decObs">Observações</label>
          <textarea
            id="decObs"
            placeholder="Alguma observação especial?"
            rows={3}
            value={decoracaoData.observacoes}
            onChange={(e) => setDecoracaoData((prev) => ({ ...prev, observacoes: e.target.value }))}
          />
        </div>
      </div>
    </section>
  );

  // ================================
  // RENDER - Etapa Pagamento
  // ================================
  const renderPagamento = () => {
    return (
      <section className="cardapio-secao">
        <div className="secao-header">
          <span className="secao-numero">4</span>
          <h2>Forma de Pagamento Pretendido</h2>
        </div>

        <div className="form-grid">
          <div className="form-group form-group-full">
            <div className="pagamento-opcoes">
              {[
                { id: 'pix', nome: 'Pix', icone: '📱'},
                { id: 'dinheiro', nome: 'Dinheiro', icone: '💵'},
                { id: 'cartao', nome: 'Cartão', icone: '💳'},
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`pagamento-btn ${pagamentoData.formaPagamento === opt.id ? 'selecionado' : ''}`}
                  onClick={() => setPagamentoData((prev) => ({ ...prev, formaPagamento: opt.id }))}
                >
                  <span className="pagamento-btn-icone">{opt.icone}</span>
                  <span className="pagamento-btn-nome">{opt.nome}</span>
                  <span className="pagamento-btn-desc">{opt.desc}</span>
                  {pagamentoData.formaPagamento === opt.id && <span className="pagamento-btn-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ================================
  // Steps Indicator
  // ================================
  const renderSteps = () => (
    <div className="steps-indicator">
      {[
        { num: 1, label: 'Dados' },
        { num: 2, label: 'Detalhes' },
        { num: 3, label: 'Pagamento' },
      ].map((step, idx) => (
        <div key={step.num} className="step-wrapper">
          <div className={`step-item ${etapa >= step.num ? 'ativo' : ''} ${etapa === step.num ? 'atual' : ''}`}>
            <span className="step-num">{step.num}</span>
            <span className="step-label">{step.label}</span>
          </div>
          {idx < 2 && <div className={`step-line ${etapa > step.num ? 'completa' : ''}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="cardapio-page">
      {/* Header simplificado */}
      <header className="cardapio-header">
        <div className="cardapio-header-inner">
          <img
            src="/logo-luminare.png"
            alt="Luminare Eventos"
            className="cardapio-logo"
            onClick={() => navigate('/')}
          />
          <button className="cardapio-voltar" onClick={() => navigate('/')}>
            ← Voltar ao site
          </button>
        </div>
      </header>

      <main className="cardapio-main">
        {/* Título */}
        <div className="cardapio-titulo">
          <h1>Cardápio Digital</h1>
          <p>Simule sua Festa</p>
          <div className="titulo-linha"></div>
        </div>

        {renderSteps()}

        {/* ========== ETAPA 1 ========== */}
        {etapa === 1 && (
          <form className="cardapio-form" onSubmit={handleContinuarEtapa1}>
            {/* PARTE 1 - Dados */}
            <section className="cardapio-secao">
              <div className="secao-header">
                <span className="secao-numero">1</span>
                <h2>Dados do Evento</h2>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nome">Nome da Pessoa</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={handleCepChange}
                    autoComplete="postal-code"
                    required
                  />
                  {cepStatus === 'loading' && (
                    <small className="cep-hint">{cepMensagem}</small>
                  )}
                  {(cepStatus === 'success' || cepStatus === 'idle') && (
                    <small className="cep-hint">{cepMensagem}</small>
                  )}
                  {cepStatus === 'error' && (
                    <small className="cep-error">{cepMensagem}</small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="dataEvento">Data do Evento</label>
                  <input
                    type="date"
                    id="dataEvento"
                    name="dataEvento"
                    value={formData.dataEvento}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="rua">Rua</label>
                  <input
                    type="text"
                    id="rua"
                    name="rua"
                    placeholder="Ex: Rua das Flores"
                    value={formData.rua}
                    onChange={handleChange}
                    autoComplete="address-line1"
                    required
                  />
                  <small className="cep-hint">Preenchido automaticamente via CEP, mas você pode ajustar manualmente.</small>
                </div>

                <div className="form-group">
                  <label htmlFor="numero">Número</label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    placeholder="Ex: 123"
                    value={formData.numero}
                    onChange={handleChange}
                    autoComplete="address-line2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    placeholder="Ex: Centro"
                    value={formData.bairro}
                    onChange={handleChange}
                    autoComplete="address-level3"
                    required
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    placeholder="Ex: Medianeira"
                    value={formData.cidade}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    required
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="tipoEvento">Tipo de Evento</label>
                  <select
                    id="tipoEvento"
                    name="tipoEvento"
                    value={formData.tipoEvento}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o tipo de evento</option>
                    {tiposEvento.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.tipoEvento === 'Outros' && (
                  <div className="form-group form-group-full form-group-outros">
                    <label htmlFor="tipoEventoOutro">Especifique o tipo de evento</label>
                    <input
                      type="text"
                      id="tipoEventoOutro"
                      name="tipoEventoOutro"
                      placeholder="Descreva o tipo do seu evento"
                      value={formData.tipoEventoOutro}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </div>
            </section>

            {/* PARTE 2 - Tipo de festa */}
            <section className="cardapio-secao">
              <div className="secao-header">
                <span className="secao-numero">2</span>
                <h2>Tipo de Festa</h2>
              </div>

              <div className="tipo-festa-grid">
                {tiposFesta.map((tipo) => (
                  <button
                    key={tipo.id}
                    type="button"
                    className={`tipo-festa-card ${formData.tipoFesta === tipo.id ? 'selecionado' : ''}`}
                    onClick={() => handleTipoFestaSelect(tipo.id)}
                  >
                    <span className="tipo-festa-icone">{tipo.icone}</span>
                    <h3>{tipo.nome}</h3>
                    <p>{tipo.descricao}</p>
                    <div className="tipo-festa-check">
                      {formData.tipoFesta === tipo.id && <span>✓</span>}
                    </div>
                    <button
                      type="button"
                      className="tipo-festa-ver-exemplos"
                      onClick={(e) => abrirGaleria(tipo, e)}
                    >
                       Ver exemplos
                    </button>
                  </button>
                ))}
              </div>
            </section>

            {/* Botão Continuar */}
            <div className="cardapio-actions">
              <button
                type="submit"
                className="cardapio-btn-continuar"
                disabled={!isEtapa1Valid()}
              >
                <span>Continuar</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </form>
        )}

        {/* ========== ETAPA 2 - Detalhes do tipo ========== */}
        {etapa === 2 && (
          <form className="cardapio-form" onSubmit={handleContinuarEtapa2}>
            {formData.tipoFesta === 'bubble' && renderBubble()}
            {formData.tipoFesta === 'mini-festa' && renderMiniFesta()}
            {formData.tipoFesta === 'decoracao-montada' && renderDecoracaoMontada()}

            <div className="cardapio-actions cardapio-actions-dupla">
              <button type="button" className="cardapio-btn-voltar" onClick={handleVoltar}>
                <span className="btn-arrow">←</span>
                <span>Voltar</span>
              </button>
              <button
                type="submit"
                className="cardapio-btn-continuar"
                disabled={!isEtapa2Valid()}
              >
                <span>Continuar</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </form>
        )}

        {/* ========== ETAPA 3 - Pagamento ========== */}
        {etapa === 3 && (
          <form className="cardapio-form" onSubmit={handleFinalizar}>
            {renderPagamento()}

            <div className="cardapio-actions cardapio-actions-dupla">
              <button type="button" className="cardapio-btn-voltar" onClick={handleVoltar}>
                <span className="btn-arrow">←</span>
                <span>Voltar</span>
              </button>
              <button
                type="submit"
                className="cardapio-btn-continuar cardapio-btn-finalizar"
                disabled={!isEtapa3Valid()}
              >
                <span>Finalizar</span>
                <span className="btn-arrow">✓</span>
              </button>
            </div>
          </form>
        )}

        {/* Modal Galeria de Exemplos */}
        {galeriaAberta && (
          <div
            className="galeria-overlay"
            onClick={() => { setGaleriaAberta(null); setImagemAmpliada(null); }}
          >
            <div className="galeria-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="galeria-fechar"
                onClick={() => { setGaleriaAberta(null); setImagemAmpliada(null); }}
              >
                ✕
              </button>
              <div className="galeria-header">
                <span className="galeria-icone">{galeriaAberta.icone}</span>
                <h3>{galeriaAberta.nome}</h3>
                <p>{galeriaAberta.descricao}</p>
              </div>
              <div className="galeria-grid">
                {galeriaAberta.imagens.map((img, idx) => (
                  <div
                    key={idx}
                    className="galeria-thumb"
                    onClick={() => setImagemAmpliada(img)}
                  >
                    <img
                      src={img}
                      alt={`${galeriaAberta.nome} - Exemplo ${idx + 1}`}
                      loading="lazy"
                    />
                    <div className="galeria-thumb-hover">
                      <span>🔍</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="galeria-btn-selecionar"
                onClick={() => {
                  if (galeriaAberta.subtipo) {
                    handleTipoFestaSelect('mini-festa');
                    setMiniFestaData((prev) => ({ ...prev, subtipo: galeriaAberta.subtipo }));
                  } else {
                    handleTipoFestaSelect(galeriaAberta.id);
                  }
                  setGaleriaAberta(null);
                }}
              >
                Selecionar {galeriaAberta.nome}
              </button>
            </div>
          </div>
        )}

        {/* Lightbox da imagem ampliada */}
        {imagemAmpliada && (
          <div
            className="lightbox-overlay"
            onClick={() => setImagemAmpliada(null)}
          >
            <button className="lightbox-fechar" onClick={() => setImagemAmpliada(null)}>✕</button>
            <img
              src={imagemAmpliada}
              alt="Imagem ampliada"
              className="lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default CardapioDigital;
