"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TrendingUp, Check, Sparkles, Zap, Crown, Clock, Gift, AlertTriangle, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlansPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 horas em segundos
  const [showPromotion, setShowPromotion] = useState(true);

  useEffect(() => {
    // Verificar se já viu a promoção antes
    const hasSeenPromo = localStorage.getItem("easytrader_promo_seen");
    const promoTimestamp = localStorage.getItem("easytrader_promo_timestamp");
    
    if (hasSeenPromo && promoTimestamp) {
      const elapsed = Date.now() - parseInt(promoTimestamp);
      const remaining = (24 * 60 * 60 * 1000) - elapsed;
      
      if (remaining <= 0) {
        setShowPromotion(false);
      } else {
        setTimeLeft(Math.floor(remaining / 1000));
      }
    } else {
      localStorage.setItem("easytrader_promo_seen", "true");
      localStorage.setItem("easytrader_promo_timestamp", Date.now().toString());
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setShowPromotion(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const plans = [
    {
      name: "Beginner",
      price: "49,90",
      period: "pagamento único",
      credits: "500",
      features: [
        "500 créditos imediatos",
        "Análise de gráficos com IA",
        "Acesso aos melhores mercados",
        "Suporte por email",
        "Sem mensalidade"
      ],
      bonus: "PIX: 7 dias grátis + 250 créditos",
      gradient: "from-green-600 to-emerald-600",
      icon: Zap,
      popular: false
    },
    {
      name: "Trader Pro",
      price: "149,90",
      period: "por mês",
      credits: "1.000",
      features: [
        "1.000 créditos mensais",
        "Análise ilimitada de mercados",
        "Alertas em tempo real",
        "Suporte prioritário",
        "Relatórios personalizados"
      ],
      gradient: "from-green-600 to-emerald-600",
      icon: TrendingUp,
      popular: true
    },
    {
      name: "Trader Master",
      price: showPromotion ? "499,90" : "849,90",
      originalPrice: showPromotion ? "849,90" : null,
      period: "por ano",
      credits: "10.000",
      features: [
        "10.000 créditos mensais",
        "Análise premium com IA avançada",
        "Consultoria personalizada",
        "Suporte VIP 24/7",
        "Acesso antecipado a novidades",
        "Comunidade exclusiva"
      ],
      gradient: "from-yellow-600 to-orange-600",
      icon: Crown,
      popular: false,
      promo: showPromotion
    }
  ];

  const handleSelectPlan = (planName: string) => {
    localStorage.setItem("easytrader_selected_plan", planName);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1">
              <span className="text-6xl font-black text-green-500">E</span>
              <span className="text-6xl font-black text-green-500">T</span>
              <TrendingUp className="w-12 h-12 text-green-400 ml-2" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-xl text-green-200">
            Comece sua jornada para o sucesso financeiro
          </p>
        </motion.div>

        {/* Promoção Timer - SUPER APELATIVO */}
        {showPromotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-12 relative"
          >
            {/* Efeito de brilho pulsante */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
              {/* Badge de urgência */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-red-600 text-white px-6 py-2 text-lg font-bold animate-bounce border-2 border-yellow-400">
                  <Flame className="w-5 h-5 mr-2 inline animate-pulse" />
                  ÚLTIMA CHANCE!
                </Badge>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
                  🚨 OFERTA RELÂMPAGO 🚨
                </h2>
                <p className="text-2xl font-bold text-yellow-300 mb-1">
                  DESCONTO DE 41% NO PLANO ANUAL
                </p>
                <p className="text-xl text-white font-semibold">
                  De <span className="line-through">R$ 849,90</span> por apenas{" "}
                  <span className="text-yellow-300 text-3xl font-black">R$ 499,90</span>
                </p>
              </div>

              {/* Timer com destaque */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 animate-pulse" />
                  <p className="text-white font-bold text-2xl">ESTA OFERTA EXPIRA EM:</p>
                  <AlertTriangle className="w-8 h-8 text-yellow-400 animate-pulse" />
                </div>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg px-8 py-4 border-2 border-yellow-400">
                    <p className="text-yellow-300 font-mono text-5xl font-black tracking-wider drop-shadow-lg">
                      {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>
                <p className="text-center text-yellow-200 mt-3 text-lg font-semibold">
                  ⚡ Depois disso, volta para R$ 849,90! ⚡
                </p>
              </div>

              {/* Mensagens apelativas */}
              <div className="mt-6 space-y-2">
                <p className="text-center text-white font-bold text-lg">
                  ✅ Economize R$ 350,00 AGORA!
                </p>
                <p className="text-center text-yellow-300 font-semibold">
                  🔥 Apenas para NOVOS CADASTROS nas próximas {Math.floor(timeLeft / 3600)} horas!
                </p>
                <p className="text-center text-white text-sm">
                  ⏰ Não perca essa oportunidade única de começar com o pé direito!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border ${
                  plan.popular ? "border-green-500" : "border-green-500/20"
                } shadow-2xl ${plan.popular ? "scale-105" : ""} ${plan.promo ? "ring-4 ring-yellow-400 ring-offset-4 ring-offset-black" : ""}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                {/* Promo Badge */}
                {plan.promo && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1 animate-pulse border-2 border-yellow-400">
                      <Gift className="w-3 h-3 mr-1 inline" />
                      41% OFF
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`bg-gradient-to-r ${plan.gradient} p-4 rounded-2xl`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-center text-white mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="text-center mb-6">
                  {plan.originalPrice && (
                    <p className="text-green-300 line-through text-lg mb-1">
                      R$ {plan.originalPrice}
                    </p>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-green-200 text-xl">R$</span>
                    <span className={`text-5xl font-bold ${plan.promo ? "text-yellow-400" : "bg-gradient-to-r " + plan.gradient + " bg-clip-text text-transparent"}`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-green-300 text-sm mt-1">{plan.period}</p>
                  {plan.promo && (
                    <p className="text-red-400 font-bold text-sm mt-2 animate-pulse">
                      🔥 ECONOMIA DE R$ 350,00!
                    </p>
                  )}
                </div>

                {/* Credits */}
                <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 text-center">
                  <p className="text-green-200 text-sm mb-1">Créditos</p>
                  <p className="text-3xl font-bold text-white">{plan.credits}</p>
                  {plan.period.includes("mês") || plan.period.includes("ano") ? (
                    <p className="text-green-300 text-xs mt-1">por mês</p>
                  ) : (
                    <p className="text-green-300 text-xs mt-1">imediatos</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-green-100 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bonus */}
                {plan.bonus && (
                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-400" />
                      <p className="text-green-300 text-sm font-semibold">{plan.bonus}</p>
                    </div>
                  </div>
                )}

                {/* Button */}
                <Button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white py-6 text-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-105 ${plan.promo ? "animate-pulse ring-2 ring-yellow-400" : ""}`}
                >
                  {plan.promo ? "🔥 GARANTIR DESCONTO AGORA!" : `Escolher ${plan.name}`}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Garantia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-full">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Garantia de Satisfação</h3>
            <p className="text-green-200">
              Teste o EasyTrader sem riscos. Se não ficar satisfeito nos primeiros 7 dias, 
              devolvemos 100% do seu investimento.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
