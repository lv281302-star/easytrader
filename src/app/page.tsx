"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/logo";

export default function Home() {
  const [step, setStep] = useState<"intro" | "features" | "signup">("intro");
  const [showLogo, setShowLogo] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    // Animação inicial do logo
    const timer = setTimeout(() => setShowLogo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (step === "intro") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent"></div>
        
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center z-10"
            >
              {/* Logo ET com seta */}
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-green-500 blur-3xl opacity-40"></div>
                  <Logo size={180} className="relative" />
                </div>
              </motion.div>

              {/* Nome do App */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent"
              >
                EasyTrader
              </motion.h1>

              {/* Slogan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mb-12"
              >
                <div className="flex items-center justify-center gap-3 text-2xl text-green-300">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <p className="font-light">A IA que cria milionários</p>
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </motion.div>

              {/* Botão */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <Button
                  onClick={() => setStep("features")}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (step === "features") {
    const features = [
      {
        icon: BarChart3,
        title: "Análise de Gráficos com IA",
        description: "Envie um print do gráfico e receba análise instantânea sobre a tendência do mercado",
        details: [
          "Análise de padrões em tempo real",
          "Previsão de alta, baixa ou manutenção",
          "Precisão baseada em machine learning",
          "10 créditos por análise"
        ],
        gradient: "from-green-600 to-emerald-600"
      },
      {
        icon: Globe,
        title: "Melhores Mercados e Plataformas",
        description: "Descubra onde investir agora com dados atualizados em tempo real",
        details: [
          "Análise de múltiplos mercados",
          "Comparação de plataformas",
          "Recomendações personalizadas",
          "Função 100% gratuita"
        ],
        gradient: "from-green-600 to-emerald-600"
      }
    ];

    const currentFeatureData = features[currentFeature];
    const Icon = currentFeatureData.icon;

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-12 border border-green-500/20 shadow-2xl"
            >
              {/* Ícone */}
              <div className="mb-8 flex justify-center">
                <div className={`bg-gradient-to-r ${currentFeatureData.gradient} p-6 rounded-2xl`}>
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Título */}
              <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {currentFeatureData.title}
              </h2>

              {/* Descrição */}
              <p className="text-xl text-green-200 text-center mb-8">
                {currentFeatureData.description}
              </p>

              {/* Detalhes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {currentFeatureData.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-zinc-800/50 p-4 rounded-xl"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentFeatureData.gradient}`}></div>
                    <span className="text-green-100">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Navegação */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {features.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentFeature ? "w-8 bg-green-500" : "w-2 bg-zinc-700"
                      }`}
                    ></div>
                  ))}
                </div>

                <div className="flex gap-4">
                  {currentFeature < features.length - 1 ? (
                    <Button
                      onClick={() => setCurrentFeature(currentFeature + 1)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Próximo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setStep("signup")}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Criar Conta
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Redirecionar para página de cadastro
  if (step === "signup") {
    window.location.href = "/signup";
  }

  return null;
}
