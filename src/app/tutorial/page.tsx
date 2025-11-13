"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  TrendingUp, 
  BarChart3, 
  LineChart, 
  Candle,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Home,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TutorialPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 0,
      title: "Introdução ao Trading",
      icon: BookOpen,
      duration: "5 min",
      topics: [
        {
          subtitle: "O que é Trading?",
          content: "Trading é a prática de comprar e vender ativos financeiros (ações, criptomoedas, forex) com o objetivo de lucrar com as variações de preço. Diferente de investimento de longo prazo, o trading foca em operações de curto e médio prazo.",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
        },
        {
          subtitle: "Plataformas Populares",
          content: "As principais plataformas de trading incluem:",
          list: [
            "IQ Option - Interface intuitiva, ideal para iniciantes",
            "Exnova - Múltiplos ativos e ferramentas avançadas",
            "IQBroker - Foco em opções binárias e forex",
            "MetaTrader 5 - Plataforma profissional com análise técnica completa",
            "Binance - Maior exchange de criptomoedas do mundo"
          ]
        },
        {
          subtitle: "Tipos de Ativos",
          content: "Você pode operar diversos tipos de ativos:",
          list: [
            "Forex (pares de moedas como USD/BRL, EUR/USD)",
            "Criptomoedas (Bitcoin, Ethereum, etc.)",
            "Ações (empresas listadas na bolsa)",
            "Commodities (ouro, petróleo, prata)",
            "Índices (S&P 500, Ibovespa)"
          ]
        }
      ]
    },
    {
      id: 1,
      title: "Entendendo os Gráficos",
      icon: LineChart,
      duration: "8 min",
      topics: [
        {
          subtitle: "Tipos de Gráficos",
          content: "Existem três tipos principais de gráficos usados no trading:",
          list: [
            "Gráfico de Linha - Mostra apenas o preço de fechamento, ideal para visão geral",
            "Gráfico de Barras - Exibe abertura, fechamento, máxima e mínima",
            "Gráfico de Candlestick - Mais popular, visual intuitivo com cores"
          ]
        },
        {
          subtitle: "Timeframes (Períodos)",
          content: "O timeframe define o período de cada candle/barra no gráfico:",
          list: [
            "M1 (1 minuto) - Scalping, operações muito rápidas",
            "M5 (5 minutos) - Day trade rápido",
            "M15 (15 minutos) - Day trade moderado",
            "H1 (1 hora) - Swing trade curto",
            "D1 (1 dia) - Análise de tendências maiores"
          ],
          tip: "Iniciantes devem começar com M15 ou H1 para ter tempo de analisar."
        },
        {
          subtitle: "Como Ler o Gráfico",
          content: "Elementos essenciais de um gráfico:",
          list: [
            "Eixo Y (vertical) - Preço do ativo",
            "Eixo X (horizontal) - Tempo",
            "Candles verdes/brancos - Preço subiu (fechou acima da abertura)",
            "Candles vermelhos/pretos - Preço caiu (fechou abaixo da abertura)",
            "Volume - Quantidade de negociações (barras na parte inferior)"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Candlesticks - A Base da Análise",
      icon: Candle,
      duration: "10 min",
      topics: [
        {
          subtitle: "Anatomia de um Candle",
          content: "Cada candle possui 4 informações cruciais:",
          list: [
            "Abertura (Open) - Primeiro preço do período",
            "Fechamento (Close) - Último preço do período",
            "Máxima (High) - Maior preço atingido",
            "Mínima (Low) - Menor preço atingido",
            "Corpo - Diferença entre abertura e fechamento",
            "Pavio/Sombra - Linhas finas acima e abaixo do corpo"
          ]
        },
        {
          subtitle: "Padrões de Candlestick - Alta",
          content: "Padrões que indicam possível subida de preço:",
          list: [
            "Martelo (Hammer) - Corpo pequeno no topo, pavio longo embaixo",
            "Engolfo de Alta - Candle verde grande engole o anterior vermelho",
            "Estrela da Manhã - 3 candles: queda, indecisão, alta",
            "Piercing Line - Candle verde fecha acima do meio do anterior vermelho"
          ],
          tip: "Esses padrões são mais confiáveis em suportes ou após quedas."
        },
        {
          subtitle: "Padrões de Candlestick - Baixa",
          content: "Padrões que indicam possível queda de preço:",
          list: [
            "Enforcado (Hanging Man) - Corpo pequeno no topo, pavio longo embaixo (em topo)",
            "Engolfo de Baixa - Candle vermelho grande engole o anterior verde",
            "Estrela da Tarde - 3 candles: alta, indecisão, queda",
            "Dark Cloud Cover - Candle vermelho fecha abaixo do meio do anterior verde"
          ],
          tip: "Esses padrões são mais confiáveis em resistências ou após altas."
        },
        {
          subtitle: "Padrões de Indecisão",
          content: "Candles que mostram equilíbrio entre compradores e vendedores:",
          list: [
            "Doji - Abertura e fechamento praticamente iguais",
            "Spinning Top - Corpo pequeno com pavios longos em ambos os lados",
            "Harami - Candle pequeno dentro do corpo do anterior"
          ],
          tip: "Indecisão pode preceder reversões. Aguarde confirmação!"
        }
      ]
    },
    {
      id: 3,
      title: "Suportes e Resistências",
      icon: BarChart3,
      duration: "7 min",
      topics: [
        {
          subtitle: "O que são Suportes?",
          content: "Suporte é um nível de preço onde a demanda (compradores) é forte o suficiente para impedir que o preço caia mais. É como um 'piso' que segura o preço.",
          list: [
            "Identificação: Procure níveis onde o preço 'bateu' e subiu várias vezes",
            "Quanto mais vezes testado, mais forte o suporte",
            "Rompimento de suporte pode virar resistência"
          ],
          tip: "Use suportes para identificar pontos de compra (entrada)."
        },
        {
          subtitle: "O que são Resistências?",
          content: "Resistência é um nível de preço onde a oferta (vendedores) é forte o suficiente para impedir que o preço suba mais. É como um 'teto' que segura o preço.",
          list: [
            "Identificação: Procure níveis onde o preço 'bateu' e caiu várias vezes",
            "Quanto mais vezes testado, mais forte a resistência",
            "Rompimento de resistência pode virar suporte"
          ],
          tip: "Use resistências para identificar pontos de venda (saída)."
        },
        {
          subtitle: "Como Traçar no Gráfico",
          content: "Passo a passo para identificar suportes e resistências:",
          list: [
            "1. Abra o gráfico em timeframe H1 ou D1 (visão mais ampla)",
            "2. Procure topos (máximas) alinhados - são resistências",
            "3. Procure fundos (mínimas) alinhados - são suportes",
            "4. Use a ferramenta de linha horizontal da plataforma",
            "5. Trace linhas nos níveis mais tocados pelo preço"
          ]
        },
        {
          subtitle: "Estratégia de Operação",
          content: "Como usar suportes e resistências para operar:",
          list: [
            "Compra no Suporte: Quando preço toca suporte e mostra reversão",
            "Venda na Resistência: Quando preço toca resistência e mostra reversão",
            "Rompimento: Se preço rompe resistência com volume, pode continuar subindo",
            "Stop Loss: Sempre coloque abaixo do suporte (compra) ou acima da resistência (venda)"
          ],
          tip: "Nunca opere CONTRA a tendência principal. Suportes/resistências são mais confiáveis a favor da tendência."
        }
      ]
    },
    {
      id: 4,
      title: "Tendências de Mercado",
      icon: TrendingUp,
      duration: "6 min",
      topics: [
        {
          subtitle: "Tipos de Tendência",
          content: "O mercado pode estar em três estados:",
          list: [
            "Tendência de Alta (Bullish) - Topos e fundos cada vez mais altos",
            "Tendência de Baixa (Bearish) - Topos e fundos cada vez mais baixos",
            "Lateral (Sideways) - Preço oscila entre suporte e resistência"
          ],
          tip: "A tendência é sua amiga! Opere sempre a favor dela."
        },
        {
          subtitle: "Identificando Tendências",
          content: "Como saber qual tendência está em vigor:",
          list: [
            "Alta: Conecte os fundos com linha - se subir, é tendência de alta",
            "Baixa: Conecte os topos com linha - se descer, é tendência de baixa",
            "Use timeframes maiores (H4, D1) para tendência principal",
            "Médias móveis ajudam: preço acima = alta, abaixo = baixa"
          ]
        },
        {
          subtitle: "Operando com Tendências",
          content: "Estratégias para cada tipo de tendência:",
          list: [
            "Alta: Compre nas correções (pullbacks) para suportes",
            "Baixa: Venda nos rallies (subidas temporárias) para resistências",
            "Lateral: Compre no suporte, venda na resistência (range trading)"
          ],
          tip: "Evite operar em laterais muito estreitas - pouco lucro e muito risco."
        },
        {
          subtitle: "Reversões de Tendência",
          content: "Sinais de que a tendência pode estar mudando:",
          list: [
            "Rompimento de linha de tendência com volume alto",
            "Padrões de candlestick de reversão em topos/fundos",
            "Divergência entre preço e indicadores (RSI, MACD)",
            "Falha em fazer novos topos (alta) ou novos fundos (baixa)"
          ],
          tip: "Reversões são difíceis de pegar. Espere confirmação antes de operar!"
        }
      ]
    },
    {
      id: 5,
      title: "Gerenciamento de Risco",
      icon: Target,
      duration: "8 min",
      topics: [
        {
          subtitle: "Por que Gerenciar Risco?",
          content: "Gerenciamento de risco é a diferença entre traders lucrativos e os que perdem dinheiro. Mesmo com 50% de acerto, você pode lucrar se gerenciar bem o risco.",
          list: [
            "Protege seu capital de perdas devastadoras",
            "Permite operar com disciplina e sem emoção",
            "Garante longevidade no mercado",
            "Traders profissionais arriscam apenas 1-2% por operação"
          ]
        },
        {
          subtitle: "Stop Loss - Sua Proteção",
          content: "Stop Loss é uma ordem automática que fecha sua posição se o preço ir contra você:",
          list: [
            "SEMPRE use stop loss - sem exceções!",
            "Coloque abaixo do suporte (compra) ou acima da resistência (venda)",
            "Distância típica: 1-2% do preço de entrada",
            "Nunca mova o stop loss contra você (aumentando perda)"
          ],
          tip: "Se você não usa stop loss, não é trader - é apostador!"
        },
        {
          subtitle: "Take Profit - Realizando Lucros",
          content: "Take Profit é uma ordem automática que fecha sua posição no lucro desejado:",
          list: [
            "Defina ANTES de entrar na operação",
            "Use relação risco/retorno mínima de 1:2 (arrisca 1, ganha 2)",
            "Coloque em resistências (compra) ou suportes (venda)",
            "Considere realizar lucro parcial (50%) e deixar o resto correr"
          ]
        },
        {
          subtitle: "Regra de Ouro: 1-2% por Trade",
          content: "Nunca arrisque mais que 1-2% do seu capital total em uma única operação:",
          list: [
            "Capital R$ 1.000 → Risco máximo R$ 10-20 por trade",
            "Capital R$ 5.000 → Risco máximo R$ 50-100 por trade",
            "Capital R$ 10.000 → Risco máximo R$ 100-200 por trade"
          ],
          tip: "Com essa regra, você precisaria perder 50 trades seguidos para zerar a conta!"
        },
        {
          subtitle: "Psicologia do Trading",
          content: "Controle emocional é crucial para o sucesso:",
          list: [
            "Não opere com raiva após uma perda (revenge trading)",
            "Não aumente o risco para 'recuperar' perdas",
            "Aceite que perdas fazem parte do jogo",
            "Siga seu plano de trading religiosamente",
            "Faça pausas após 2-3 perdas seguidas"
          ],
          tip: "Traders lucrativos têm disciplina, não sorte!"
        }
      ]
    },
    {
      id: 6,
      title: "Usando as Plataformas",
      icon: Play,
      duration: "12 min",
      topics: [
        {
          subtitle: "IQ Option - Passo a Passo",
          content: "Como operar na IQ Option:",
          list: [
            "1. Faça login e selecione o ativo (ex: EUR/USD)",
            "2. Escolha o timeframe (recomendado: M15 ou H1)",
            "3. Analise o gráfico: identifique tendência, suportes, resistências",
            "4. Procure padrões de candlestick ou rompimentos",
            "5. Defina valor da operação (1-2% do capital)",
            "6. Clique em 'Comprar' (verde) ou 'Vender' (vermelho)",
            "7. Monitore a operação e aguarde o resultado"
          ],
          tip: "Use a conta demo primeiro para praticar sem risco!"
        },
        {
          subtitle: "Exnova - Recursos Avançados",
          content: "Como aproveitar a Exnova:",
          list: [
            "Múltiplos gráficos: Abra 2-4 ativos simultaneamente",
            "Indicadores: Adicione RSI, MACD, Médias Móveis",
            "Alertas de Preço: Configure notificações em níveis importantes",
            "Histórico: Analise suas operações passadas",
            "Copy Trading: Copie traders experientes (com cautela!)"
          ]
        },
        {
          subtitle: "IQBroker - Opções Binárias",
          content: "Operando opções binárias no IQBroker:",
          list: [
            "Escolha o ativo e o tempo de expiração (1min, 5min, 15min, etc.)",
            "Analise se o preço vai SUBIR ou DESCER até a expiração",
            "Defina o valor da aposta",
            "Clique em 'Call' (subir) ou 'Put' (descer)",
            "Aguarde a expiração - lucro fixo se acertar, perda total se errar"
          ],
          tip: "Opções binárias são de alto risco! Use apenas 1% do capital por operação."
        },
        {
          subtitle: "MetaTrader 5 - Profissional",
          content: "Usando o MT5 para análise avançada:",
          list: [
            "Baixe e instale o MT5 no PC ou celular",
            "Conecte com sua corretora (Exness, XM, etc.)",
            "Use ferramentas de desenho: linhas, retângulos, fibonacci",
            "Adicione indicadores personalizados",
            "Configure Expert Advisors (robôs) se tiver conhecimento",
            "Backtest suas estratégias com dados históricos"
          ]
        },
        {
          subtitle: "Binance - Criptomoedas",
          content: "Operando cripto na Binance:",
          list: [
            "Spot Trading: Compra/venda direta de criptomoedas",
            "Futures: Alavancagem até 125x (MUITO ARRISCADO!)",
            "Use ordens Limit para entrar em preços específicos",
            "Stop-Limit para proteção automática",
            "Staking: Ganhe juros mantendo cripto na carteira"
          ],
          tip: "Iniciantes devem começar com Spot Trading sem alavancagem!"
        }
      ]
    },
    {
      id: 7,
      title: "Estratégia Completa de Trading",
      icon: CheckCircle,
      duration: "10 min",
      topics: [
        {
          subtitle: "Checklist Antes de Operar",
          content: "NUNCA entre em uma operação sem verificar:",
          list: [
            "✓ Tendência identificada (alta, baixa ou lateral)?",
            "✓ Estou operando A FAVOR da tendência?",
            "✓ Há suporte/resistência próximo?",
            "✓ Padrão de candlestick confirmado?",
            "✓ Stop loss definido?",
            "✓ Take profit definido?",
            "✓ Relação risco/retorno mínima 1:2?",
            "✓ Estou arriscando apenas 1-2% do capital?"
          ],
          tip: "Se qualquer resposta for NÃO, não opere!"
        },
        {
          subtitle: "Estratégia de Rompimento",
          content: "Como operar rompimentos de suporte/resistência:",
          list: [
            "1. Identifique resistência forte testada 3+ vezes",
            "2. Aguarde candle fechar ACIMA da resistência",
            "3. Volume deve estar acima da média",
            "4. Entre na compra no candle seguinte",
            "5. Stop loss abaixo da resistência rompida",
            "6. Take profit na próxima resistência ou 2x o risco"
          ],
          tip: "Falsos rompimentos são comuns! Aguarde confirmação."
        },
        {
          subtitle: "Estratégia de Pullback",
          content: "Operando correções em tendências:",
          list: [
            "1. Identifique tendência de alta clara",
            "2. Aguarde correção (pullback) para suporte ou média móvel",
            "3. Procure padrão de reversão (martelo, engolfo)",
            "4. Entre na compra quando preço voltar a subir",
            "5. Stop loss abaixo do suporte",
            "6. Take profit na resistência anterior ou novo topo"
          ],
          tip: "Pullbacks oferecem melhor relação risco/retorno que comprar no topo!"
        },
        {
          subtitle: "Estratégia de Range Trading",
          content: "Operando em mercados laterais:",
          list: [
            "1. Identifique range claro (suporte e resistência paralelos)",
            "2. Compre quando preço tocar o suporte",
            "3. Venda quando preço tocar a resistência",
            "4. Stop loss fora do range (abaixo suporte ou acima resistência)",
            "5. Take profit no lado oposto do range",
            "6. Saia se o range for rompido"
          ],
          tip: "Ranges estreitos não valem a pena - procure ranges amplos!"
        },
        {
          subtitle: "Plano de Trading Diário",
          content: "Rotina de um trader disciplinado:",
          list: [
            "Manhã: Análise dos mercados, identificar oportunidades",
            "Definir 2-3 setups de alta probabilidade",
            "Configurar alertas de preço nos níveis importantes",
            "Operar apenas os setups planejados (sem impulsividade!)",
            "Registrar todas as operações em planilha",
            "Fim do dia: Revisar operações, aprender com erros",
            "Máximo 3-5 operações por dia"
          ],
          tip: "Qualidade > Quantidade. Menos operações, mais planejadas!"
        },
        {
          subtitle: "Próximos Passos",
          content: "Como continuar evoluindo como trader:",
          list: [
            "Pratique em conta demo por 2-3 meses",
            "Estude 1 hora por dia (livros, vídeos, cursos)",
            "Mantenha diário de trading (journal)",
            "Comece com capital pequeno (R$ 500-1000)",
            "Foque em 1-2 ativos apenas (especialização)",
            "Junte-se a comunidades de traders",
            "Tenha paciência - leva tempo para ser consistente!"
          ],
          tip: "Trading não é enriquecimento rápido. É uma profissão que exige estudo e prática!"
        }
      ]
    }
  ];

  const currentLessonData = lessons[currentLesson];
  const Icon = currentLessonData.icon;
  const progress = ((completedLessons.length) / lessons.length) * 100;

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-green-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                  <Home className="w-4 h-4 mr-2" />
                  Início
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-green-400" />
                <h1 className="text-xl font-bold text-white">Tutorial de Trading</h1>
              </div>
            </div>
            <Badge className="bg-green-600">
              {completedLessons.length}/{lessons.length} Concluídas
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lista de Lições */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-4 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-4">Lições</h2>
              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const LessonIcon = lesson.icon;
                  const isCompleted = completedLessons.includes(index);
                  const isCurrent = currentLesson === index;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isCurrent
                          ? "bg-green-600 text-white"
                          : isCompleted
                          ? "bg-zinc-800 text-green-300"
                          : "bg-zinc-800/50 text-green-200 hover:bg-zinc-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${isCurrent ? "bg-white/20" : "bg-zinc-700"}`}>
                          <LessonIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{lesson.title}</p>
                          <p className="text-xs opacity-70">{lesson.duration}</p>
                        </div>
                        {isCompleted && (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Conteúdo da Lição */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-8 mb-6">
                  {/* Cabeçalho da Lição */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-white">{currentLessonData.title}</h2>
                        <Badge className="bg-zinc-800 text-green-400">
                          {currentLessonData.duration}
                        </Badge>
                      </div>
                      <p className="text-green-300">
                        Lição {currentLesson + 1} de {lessons.length}
                      </p>
                    </div>
                  </div>

                  {/* Tópicos da Lição */}
                  <div className="space-y-8">
                    {currentLessonData.topics.map((topic, topicIndex) => (
                      <motion.div
                        key={topicIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: topicIndex * 0.1 }}
                        className="border-l-4 border-green-500 pl-6"
                      >
                        <h3 className="text-xl font-bold text-white mb-3">{topic.subtitle}</h3>
                        
                        {topic.image && (
                          <img
                            src={topic.image}
                            alt={topic.subtitle}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}

                        <p className="text-green-100 mb-4 leading-relaxed">{topic.content}</p>

                        {topic.list && (
                          <ul className="space-y-2 mb-4">
                            {topic.list.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-green-200">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {topic.tip && (
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-green-400 font-semibold mb-1">💡 Dica Importante:</p>
                              <p className="text-green-200 text-sm">{topic.tip}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Navegação */}
                <div className="flex items-center justify-between gap-4">
                  <Button
                    onClick={handlePreviousLesson}
                    disabled={currentLesson === 0}
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10 disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-3">
                    {completedLessons.includes(currentLesson) ? (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Concluída
                      </Badge>
                    ) : (
                      <Button
                        onClick={handleCompleteLesson}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marcar como Concluída
                      </Button>
                    )}

                    {currentLesson < lessons.length - 1 && (
                      <Button
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Próxima
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mensagem de Conclusão */}
                {currentLesson === lessons.length - 1 && completedLessons.includes(currentLesson) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6"
                  >
                    <Card className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
                      <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        🎉 Parabéns! Tutorial Completo!
                      </h3>
                      <p className="text-green-100 mb-6">
                        Você concluiu todas as lições do tutorial de trading. Agora é hora de praticar!
                      </p>
                      <Link href="/">
                        <Button className="bg-white text-green-600 hover:bg-green-50">
                          Voltar ao Início
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
