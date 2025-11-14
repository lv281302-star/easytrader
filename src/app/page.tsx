"use client";

import { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, BarChart3, Sparkles, CheckCircle2, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [step, setStep] = useState<"intro" | "features" | "signup" | "plans" | "dashboard">("intro");
  const [introComplete, setIntroComplete] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Animação de introdução
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (step === "intro") {
    return <IntroScreen onComplete={() => setStep("features")} introComplete={introComplete} />;
  }

  if (step === "features") {
    return <FeaturesScreen onNext={() => setStep("signup")} />;
  }

  if (step === "signup") {
    return <SignupScreen onNext={(data) => {
      setUserData(data);
      setStep("plans");
    }} />;
  }

  if (step === "plans") {
    return <PlansScreen userData={userData} onNext={() => setStep("dashboard")} />;
  }

  if (step === "dashboard") {
    return <Dashboard userData={userData} />;
  }

  return null;
}

// Tela de Introdução com Logo Animada
function IntroScreen({ onComplete, introComplete }: { onComplete: () => void; introComplete: boolean }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950/20 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Efeito de fundo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
      
      <div className={`relative z-10 text-center transition-all duration-1000 ${introComplete ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        {/* Logo ET com seta de gráfico */}
        <div className="mb-8 relative">
          <div className="text-9xl font-bold tracking-tighter flex items-center justify-center gap-2">
            <span className="text-emerald-500">E</span>
            <span className="text-emerald-500">T</span>
            <svg className="w-20 h-20 text-emerald-500 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full -z-10" />
        </div>

        {/* Slogan */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          EasyTrader
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
          A IA que cria milionários
        </p>

        {introComplete && (
          <Button 
            onClick={onComplete}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-emerald-500/50 transition-all hover:scale-105"
          >
            Começar Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Tela de Apresentação de Funcionalidades
function FeaturesScreen({ onNext }: { onNext: () => void }) {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-16 h-16" />,
      title: "Análise de Gráficos com IA",
      description: "Envie um print do gráfico e nossa IA analisa em segundos se o mercado vai subir, descer ou manter. Precisão baseada em milhões de dados históricos.",
      details: "• Análise instantânea de padrões\n• Previsão de tendências\n• Suporte para todos os mercados\n• Custo: 10 créditos por análise"
    },
    {
      icon: <TrendingUp className="w-16 h-16" />,
      title: "Melhores Mercados em Tempo Real",
      description: "Descubra quais são os mercados e plataformas mais lucrativos do momento. Dados atualizados em tempo real.",
      details: "• Ranking de mercados\n• Análise de volatilidade\n• Recomendações personalizadas\n• Função GRATUITA"
    },
    {
      icon: <Sparkles className="w-16 h-16" />,
      title: "Assistente IA por Chat",
      description: "Converse com nossa IA especializada em trading. Tire dúvidas, peça análises detalhadas e receba estratégias personalizadas.",
      details: "• Respostas instantâneas\n• Análises aprofundadas\n• Estratégias personalizadas\n• Custo: créditos por mensagem"
    }
  ];

  const feature = features[currentFeature];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Funcionalidades
          </h2>
          <p className="text-gray-400">Conheça as ferramentas que vão transformar seu trading</p>
        </div>

        {/* Feature Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/30 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl shadow-emerald-500/10">
          <div className="text-emerald-500 mb-6 flex justify-center">
            {feature.icon}
          </div>
          
          <h3 className="text-3xl font-bold mb-4 text-center">{feature.title}</h3>
          <p className="text-gray-300 text-lg mb-6 text-center">{feature.description}</p>
          
          <div className="bg-black/50 rounded-xl p-6 border border-emerald-500/20">
            <pre className="text-emerald-400 whitespace-pre-line font-mono text-sm">
              {feature.details}
            </pre>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentFeature(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentFeature ? 'bg-emerald-500 w-8' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            {currentFeature < features.length - 1 ? (
              <Button
                onClick={() => setCurrentFeature(currentFeature + 1)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Próxima
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={onNext}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-500/50"
              >
                Criar Conta Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tela de Cadastro
function SignupScreen({ onNext }: { onNext: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    termsAccepted: false
  });
  const [showTerms, setShowTerms] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Você precisa aceitar os termos e condições");
      return;
    }
    if (!emailVerified) {
      // Simular verificação de email
      setEmailVerified(true);
      alert("Email verificado com sucesso!");
      return;
    }
    onNext(formData);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Criar Conta
          </h2>
          <p className="text-gray-400">Preencha seus dados para começar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Nome Completo</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                className="w-full bg-black border border-emerald-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">CPF</label>
              <input
                type="text"
                required
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})}
                className="w-full bg-black border border-emerald-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="000.000.000-00"
                maxLength={14}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="flex-1 bg-black border border-emerald-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="seu@email.com"
                />
                {emailVerified && (
                  <div className="flex items-center px-4 bg-emerald-500/20 rounded-xl border border-emerald-500">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Telefone</label>
              <input
                type="tel"
                required
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: formatPhone(e.target.value)})}
                className="w-full bg-black border border-emerald-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                className="mt-1 w-5 h-5 rounded border-emerald-500/30 bg-black"
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                Eu aceito os{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-emerald-500 hover:text-emerald-400 underline"
                >
                  termos e condições
                </button>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/50"
            >
              {emailVerified ? "Continuar" : "Verificar Email"}
            </Button>
          </div>
        </form>

        {/* Modal de Termos */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-emerald-500/30 rounded-3xl p-8 max-w-3xl max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4 text-emerald-500">Termos e Condições de Uso</h3>
              <div className="text-sm text-gray-300 space-y-4">
                <p><strong>1. ACEITAÇÃO DOS TERMOS</strong></p>
                <p>Ao utilizar o EasyTrader, você concorda com estes termos e condições. Se não concordar, não utilize nossos serviços.</p>

                <p><strong>2. DESCRIÇÃO DO SERVIÇO</strong></p>
                <p>O EasyTrader é uma plataforma de análise de mercado financeiro que utiliza inteligência artificial para fornecer insights sobre gráficos e tendências de mercado. Nossos serviços incluem:</p>
                <ul className="list-disc ml-6">
                  <li>Análise de gráficos através de IA</li>
                  <li>Informações sobre melhores mercados</li>
                  <li>Assistente virtual especializado em trading</li>
                </ul>

                <p><strong>3. SISTEMA DE CRÉDITOS</strong></p>
                <p>3.1. Os serviços são baseados em sistema de créditos</p>
                <p>3.2. Análise de gráficos consome 10 créditos por análise</p>
                <p>3.3. Assistente IA consome créditos conforme uso</p>
                <p>3.4. Créditos não utilizados não são reembolsáveis</p>
                <p>3.5. Créditos têm validade conforme plano contratado</p>

                <p><strong>4. PLANOS E PAGAMENTOS</strong></p>
                <p>4.1. Beginner: R$ 49,90 - 500 créditos imediatos (sem recorrência)</p>
                <p>4.2. Trader Pro: R$ 149,90/mês - 1000 créditos mensais</p>
                <p>4.3. Trader Master: R$ 849,90/ano - 10.000 créditos mensais</p>
                <p>4.4. Pagamentos via PIX recebem 7 dias grátis + 250 créditos bônus</p>
                <p>4.5. Promoções têm prazo limitado e não são cumulativas</p>

                <p><strong>5. AVISO DE RISCO</strong></p>
                <p className="text-red-500 font-bold">IMPORTANTE: Trading envolve risco substancial de perda. As análises fornecidas pela IA são baseadas em dados históricos e não garantem resultados futuros. Você pode perder todo o capital investido. Não invista dinheiro que não pode perder. Recomendamos consultar um assessor financeiro antes de tomar decisões de investimento.</p>

                <p><strong>6. LIMITAÇÃO DE RESPONSABILIDADE</strong></p>
                <p>6.1. O EasyTrader não se responsabiliza por perdas financeiras</p>
                <p>6.2. As análises são informativas, não recomendações de investimento</p>
                <p>6.3. Não garantimos precisão de 100% nas análises</p>
                <p>6.4. O usuário é o único responsável por suas decisões de investimento</p>

                <p><strong>7. PRIVACIDADE E DADOS</strong></p>
                <p>7.1. Seus dados são protegidos conforme LGPD</p>
                <p>7.2. Não compartilhamos dados com terceiros sem consentimento</p>
                <p>7.3. Coletamos apenas dados necessários para o serviço</p>

                <p><strong>8. CANCELAMENTO E REEMBOLSO</strong></p>
                <p>8.1. Planos mensais podem ser cancelados a qualquer momento</p>
                <p>8.2. Não há reembolso de créditos não utilizados</p>
                <p>8.3. Plano anual não é reembolsável após 7 dias da compra</p>

                <p><strong>9. MODIFICAÇÕES</strong></p>
                <p>Reservamos o direito de modificar estes termos a qualquer momento. Usuários serão notificados de mudanças significativas.</p>

                <p><strong>10. CONTATO</strong></p>
                <p>Para dúvidas: contato@easytrader.com</p>

                <p className="text-xs text-gray-500 mt-6">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
              <Button
                onClick={() => setShowTerms(false)}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Tela de Planos
function PlansScreen({ userData, onNext }: { userData: any; onNext: () => void }) {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 horas em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const plans = [
    {
      id: "beginner",
      name: "Beginner",
      price: "49,90",
      period: "pagamento único",
      credits: "500",
      features: [
        "500 créditos imediatos",
        "Análise de gráficos com IA",
        "Acesso ao assistente IA",
        "Sem mensalidade",
        "Suporte por email"
      ],
      color: "from-gray-700 to-gray-800",
      borderColor: "border-gray-600",
      popular: false,
      highlight: true,
      paymentLink: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=316db666e39545fc97eb8bc71454cdde"
    },
    {
      id: "pro",
      name: "Trader Pro",
      price: "149,90",
      period: "por mês",
      credits: "1.000",
      bonus: "Renovação automática mensal",
      features: [
        "1.000 créditos mensais",
        "Análise ilimitada de mercados",
        "Assistente IA prioritário",
        "Alertas em tempo real",
        "Suporte prioritário"
      ],
      color: "from-emerald-600 to-emerald-700",
      borderColor: "border-emerald-500",
      popular: true,
      paymentLink: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=d752610fb7494d9ca72dc3e505fce589"
    },
    {
      id: "master",
      name: "Trader Master",
      price: "499,90",
      originalPrice: "849,90",
      period: "por ano",
      credits: "10.000",
      bonus: "PROMOÇÃO 24H - Economize R$ 350!",
      features: [
        "10.000 créditos mensais",
        "Análises ilimitadas",
        "Assistente IA exclusivo",
        "Relatórios personalizados",
        "Suporte VIP 24/7",
        "Acesso antecipado a novidades"
      ],
      color: "from-yellow-600 to-yellow-700",
      borderColor: "border-yellow-500",
      popular: false,
      promo: true,
      paymentLink: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=78411e52239547dc87134b7f83ddf324"
    }
  ];

  const handleSelectPlan = (paymentLink: string) => {
    window.open(paymentLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Escolha seu Plano
          </h2>
          <p className="text-gray-400 mb-6">Bem-vindo, {userData?.nome?.split(' ')[0]}! Selecione o plano ideal para você.</p>
          
          {/* Timer de promoção */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-full animate-pulse">
            <span className="text-white font-bold">⚠️ OFERTA EXPIRA EM:</span>
            <span className="text-2xl font-mono font-bold text-yellow-300">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gradient-to-br ${plan.color} rounded-3xl p-8 border-2 transition-all hover:scale-105 cursor-pointer border-transparent ${plan.popular ? 'ring-4 ring-emerald-500/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-1 rounded-full text-sm font-bold">
                  MAIS POPULAR
                </div>
              )}

              {plan.promo && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-full text-sm font-bold animate-pulse">
                  🔥 PROMOÇÃO 24H
                </div>
              )}

              {/* DESTAQUE ESPECIAL PARA PLANO BEGINNER */}
              {plan.highlight && (
                <div className="mb-6 -mx-8 -mt-8 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 p-6 rounded-t-3xl border-b-4 border-yellow-400 animate-pulse">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Gift className="w-8 h-8 text-white animate-bounce" />
                    <span className="text-2xl font-black text-white uppercase tracking-wide">
                      BÔNUS EXCLUSIVO PIX
                    </span>
                    <Gift className="w-8 h-8 text-white animate-bounce" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-6 h-6 text-yellow-300" />
                      <span className="text-xl font-bold text-white">7 DIAS GRÁTIS</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-black text-yellow-300">+250 CRÉDITOS</span>
                    </div>
                    <p className="text-center text-white font-semibold mt-2 text-sm">
                      Pagando via PIX você ganha!
                    </p>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  {plan.originalPrice && (
                    <span className="text-lg line-through text-gray-300 mr-2">R$ {plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                </div>
                <p className="text-sm text-gray-200">{plan.period}</p>
                <div className="mt-4 bg-black/30 rounded-xl p-3">
                  <p className="text-2xl font-bold text-yellow-300">{plan.credits} créditos</p>
                  {plan.bonus && (
                    <p className="text-xs text-gray-300 mt-1">{plan.bonus}</p>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan(plan.paymentLink)}
                className="w-full bg-white text-black hover:bg-gray-100 font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-105"
              >
                Assinar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Adicional */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">Pagamento 100% seguro via Mercado Pago • Cancele quando quiser</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard Principal
function Dashboard({ userData }: { userData: any }) {
  const [activeTab, setActiveTab] = useState<"markets" | "analysis" | "chat">("markets");
  const [credits, setCredits] = useState(1000);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-emerald-500/30 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold flex items-center gap-1">
              <span className="text-emerald-500">E</span>
              <span className="text-emerald-500">T</span>
              <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">EasyTrader</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-emerald-500/20 border border-emerald-500 rounded-xl px-4 py-2">
              <span className="text-emerald-500 font-bold">{credits} créditos</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Olá,</p>
              <p className="font-semibold">{userData?.nome?.split(' ')[0]}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("markets")}
              className={`px-6 py-4 font-medium transition-all ${
                activeTab === "markets"
                  ? "text-emerald-500 border-b-2 border-emerald-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Melhores Mercados
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-6 py-4 font-medium transition-all ${
                activeTab === "analysis"
                  ? "text-emerald-500 border-b-2 border-emerald-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-5 h-5 inline mr-2" />
              Análise de Gráficos
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-4 font-medium transition-all ${
                activeTab === "chat"
                  ? "text-emerald-500 border-b-2 border-emerald-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              Assistente IA
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "markets" && <MarketsTab />}
        {activeTab === "analysis" && <AnalysisTab credits={credits} setCredits={setCredits} />}
        {activeTab === "chat" && <ChatTab credits={credits} setCredits={setCredits} />}
      </main>
    </div>
  );
}

// Tab de Mercados (GRATUITA)
function MarketsTab() {
  const markets = [
    { name: "Bitcoin (BTC)", change: "+5.2%", price: "R$ 285.420,00", trend: "up", volatility: "Alta" },
    { name: "Ethereum (ETH)", change: "+3.8%", price: "R$ 12.850,00", trend: "up", volatility: "Média" },
    { name: "S&P 500", change: "+1.2%", price: "4.785,50", trend: "up", volatility: "Baixa" },
    { name: "Ouro (XAU)", change: "-0.5%", price: "R$ 2.045,00", trend: "down", volatility: "Baixa" },
    { name: "Dólar (USD/BRL)", change: "+0.8%", price: "R$ 4,95", trend: "up", volatility: "Média" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Melhores Mercados Agora</h2>
        <p className="text-gray-400">Função gratuita • Atualizado em tempo real</p>
      </div>

      <div className="grid gap-4">
        {markets.map((market, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-gray-900 to-black border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-500 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{market.name}</h3>
                <p className="text-2xl font-mono">{market.price}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${market.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {market.change}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Volatilidade: {market.volatility}
                </div>
              </div>
            </div>
            
            {/* Gráfico simulado */}
            <div className="mt-4 h-20 bg-black/50 rounded-xl flex items-end gap-1 p-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 ${market.trend === 'up' ? 'bg-emerald-500' : 'bg-red-500'} rounded-t`}
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab de Análise de Gráficos
function AnalysisTab({ credits, setCredits }: { credits: number; setCredits: (c: number) => void }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (credits < 10) {
      alert("Créditos insuficientes! Você precisa de 10 créditos para análise.");
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      setCredits(credits - 10);
      setResult({
        prediction: "SUBIR",
        confidence: 87,
        analysis: "Padrão de alta identificado. Tendência de rompimento detectada com volume crescente. Recomenda-se entrada em posição comprada."
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Análise de Gráficos com IA</h2>
        <p className="text-gray-400">Envie um print do gráfico • Custo: 10 créditos</p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/30 rounded-3xl p-8">
        <div className="border-2 border-dashed border-emerald-500/50 rounded-2xl p-12 text-center mb-6 hover:border-emerald-500 transition-all cursor-pointer">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
          <p className="text-lg mb-2">Arraste uma imagem ou clique para selecionar</p>
          <p className="text-sm text-gray-400">Formatos aceitos: PNG, JPG, JPEG</p>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 py-6 text-lg rounded-xl"
        >
          {analyzing ? "Analisando..." : "Analisar Gráfico (10 créditos)"}
        </Button>

        {result && (
          <div className="mt-8 bg-black/50 border border-emerald-500 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Resultado da Análise</h3>
              <div className={`text-3xl font-bold ${
                result.prediction === 'SUBIR' ? 'text-emerald-500' : 
                result.prediction === 'DESCER' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {result.prediction}
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Confiança:</span>
                <span className="font-bold">{result.confidence}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
            <p className="text-gray-300">{result.analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Tab de Chat com IA
function ChatTab({ credits, setCredits }: { credits: number; setCredits: (c: number) => void }) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Olá! Sou seu assistente de trading com IA. Como posso ajudar você hoje?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    if (credits < 5) {
      alert("Créditos insuficientes!");
      return;
    }

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setCredits(credits - 5);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Baseado na análise de mercado atual, recomendo observar os seguintes pontos: 1) Volume crescente no BTC, 2) Resistência em $45k, 3) Suporte forte em $42k. Aguarde confirmação de rompimento antes de entrar."
      }]);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Assistente IA</h2>
        <p className="text-gray-400">Converse com nossa IA especializada • 5 créditos por mensagem</p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/30 rounded-3xl p-6 h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-black border border-emerald-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
          />
          <Button
            onClick={handleSend}
            className="bg-emerald-600 hover:bg-emerald-700 px-6"
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
