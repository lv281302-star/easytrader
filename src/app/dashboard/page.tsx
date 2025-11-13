"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Globe, Upload, Coins, User, Menu, X, Sparkles, TrendingDown, Minus, Send, MessageSquare, LineChart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [credits, setCredits] = useState(500);
  const [userName, setUserName] = useState("Usuário");
  const [selectedPlan, setSelectedPlan] = useState("Beginner");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("markets");
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: string, content: string}>>([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem("easytrader_user");
    const planData = localStorage.getItem("easytrader_selected_plan");
    
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.fullName.split(" ")[0]);
    }
    
    if (planData) {
      setSelectedPlan(planData);
      // Definir créditos baseado no plano
      if (planData === "Beginner") setCredits(500);
      if (planData === "Trader Pro") setCredits(1000);
      if (planData === "Trader Master") setCredits(10000);
    }
  }, []);

  const markets = [
    {
      id: "btc",
      name: "Bitcoin (BTC)",
      platform: "Binance",
      trend: "up",
      change: "+5.2%",
      price: "R$ 285.420,00",
      recommendation: "Alta probabilidade de valorização nas próximas 24h",
      score: 8.5,
      chartData: [42000, 43500, 42800, 44200, 45000, 44500, 46000, 47200]
    },
    {
      id: "eth",
      name: "Ethereum (ETH)",
      platform: "Coinbase",
      trend: "up",
      change: "+3.8%",
      price: "R$ 12.850,00",
      recommendation: "Tendência de alta sustentável",
      score: 8.2,
      chartData: [2200, 2300, 2250, 2400, 2500, 2450, 2550, 2600]
    },
    {
      id: "usd",
      name: "Dólar (USD/BRL)",
      platform: "XP Investimentos",
      trend: "down",
      change: "-0.5%",
      price: "R$ 5,42",
      recommendation: "Leve tendência de baixa",
      score: 6.8,
      chartData: [5.50, 5.48, 5.45, 5.43, 5.42, 5.40, 5.41, 5.42]
    },
    {
      id: "petr4",
      name: "Ações PETR4",
      platform: "B3",
      trend: "neutral",
      change: "+0.2%",
      price: "R$ 38,45",
      recommendation: "Mercado estável, aguardar sinais",
      score: 7.0,
      chartData: [38.20, 38.30, 38.25, 38.40, 38.45, 38.42, 38.48, 38.45]
    },
    {
      id: "gold",
      name: "Ouro (XAU)",
      platform: "MetaTrader 5",
      trend: "up",
      change: "+2.1%",
      price: "US$ 2.045,00",
      recommendation: "Ativo seguro em alta",
      score: 8.0,
      chartData: [2000, 2010, 2020, 2025, 2030, 2035, 2040, 2045]
    },
    {
      id: "sp500",
      name: "S&P 500",
      platform: "Interactive Brokers",
      trend: "up",
      change: "+1.5%",
      price: "4.825 pts",
      recommendation: "Mercado americano em crescimento",
      score: 7.8,
      chartData: [4750, 4770, 4780, 4790, 4800, 4810, 4820, 4825]
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (trend === "down") return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-yellow-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-400";
    if (trend === "down") return "text-red-500";
    return "text-yellow-400";
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || credits < 10) return;
    
    const newMessage = { role: "user", content: chatInput };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");
    setCredits(credits - 10);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: `Analisando ${selectedMarket ? markets.find(m => m.id === selectedMarket)?.name : "o mercado"}... Com base nos padrões atuais, identifico uma tendência de alta com 78% de probabilidade. Recomendo posição de compra com stop loss conservador.`
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const selectedMarketData = markets.find(m => m.id === selectedMarket);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-green-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-black text-green-500">E</span>
                <span className="text-3xl font-black text-green-500">T</span>
                <TrendingUp className="w-6 h-6 text-green-400 ml-1" strokeWidth={3} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                EasyTrader
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("markets")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === "markets"
                    ? "bg-green-600 text-white"
                    : "text-green-200 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Globe className="w-4 h-4" />
                Mercados
              </button>
              <button
                onClick={() => setActiveTab("analysis")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === "analysis"
                    ? "bg-green-600 text-white"
                    : "text-green-200 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Análise IA
              </button>
              <a
                href="/tutorial"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-green-200 hover:text-white hover:bg-zinc-800 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Tutorial
              </a>
            </nav>

            {/* User Info */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">{credits}</span>
                <span className="text-green-300 text-sm">créditos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-white font-semibold">{userName}</p>
                  <p className="text-green-300 text-xs">{selectedPlan}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-green-200 hover:text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-green-500/20 pt-4"
            >
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setActiveTab("markets");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 text-green-200"
                >
                  <Globe className="w-4 h-4" />
                  Mercados
                </button>
                <button
                  onClick={() => {
                    setActiveTab("analysis");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 text-green-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  Análise IA
                </button>
                <a
                  href="/tutorial"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 text-green-200"
                >
                  <BookOpen className="w-4 h-4" />
                  Tutorial
                </a>
                <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-800">
                  <span className="text-green-200">Créditos</span>
                  <span className="text-white font-semibold">{credits}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Bem-vindo, {userName}! 👋
              </h1>
              <p className="text-green-100">
                Você está no plano <strong>{selectedPlan}</strong> com {credits} créditos disponíveis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-white font-semibold">Pronto para lucrar!</span>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        {activeTab === "markets" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Melhores Mercados Agora</h2>
              <p className="text-green-200">Análise em tempo real dos mercados mais promissores</p>
              <Badge className="mt-2 bg-green-600">Função Gratuita</Badge>
            </div>

            {!selectedMarket ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {markets.map((market, index) => (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedMarket(market.id)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-6 hover:border-green-500/50 transition-all hover:scale-105">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{market.name}</h3>
                          <p className="text-green-300 text-sm">{market.platform}</p>
                        </div>
                        {getTrendIcon(market.trend)}
                      </div>

                      <div className="mb-4">
                        <p className="text-3xl font-bold text-white mb-1">{market.price}</p>
                        <p className={`text-lg font-semibold ${getTrendColor(market.trend)}`}>
                          {market.change}
                        </p>
                      </div>

                      <div className="bg-zinc-800/50 rounded-lg p-3 mb-4">
                        <p className="text-green-100 text-sm">{market.recommendation}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-green-300 text-sm">Score de Confiança</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                              style={{ width: `${market.score * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-semibold">{market.score}</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <Button
                  onClick={() => {
                    setSelectedMarket(null);
                    setChatMessages([]);
                  }}
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  ← Voltar aos Mercados
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico do Mercado */}
                  <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{selectedMarketData?.name}</h3>
                        <p className="text-green-300">{selectedMarketData?.platform}</p>
                      </div>
                      {getTrendIcon(selectedMarketData?.trend || "neutral")}
                    </div>

                    <div className="mb-6">
                      <p className="text-4xl font-bold text-white mb-2">{selectedMarketData?.price}</p>
                      <p className={`text-xl font-semibold ${getTrendColor(selectedMarketData?.trend || "neutral")}`}>
                        {selectedMarketData?.change}
                      </p>
                    </div>

                    {/* Gráfico Simulado */}
                    <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                      <div className="flex items-end justify-between h-40 gap-2">
                        {selectedMarketData?.chartData.map((value, idx) => {
                          const maxValue = Math.max(...(selectedMarketData?.chartData || []));
                          const height = (value / maxValue) * 100;
                          return (
                            <div
                              key={idx}
                              className="flex-1 bg-gradient-to-t from-green-600 to-emerald-400 rounded-t"
                              style={{ height: `${height}%` }}
                            ></div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-green-300">
                        <span>7d atrás</span>
                        <span>Hoje</span>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-green-100 text-sm mb-2">
                        <strong>Análise:</strong> {selectedMarketData?.recommendation}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-300 text-sm">Confiança</span>
                        <span className="text-white font-semibold">{selectedMarketData?.score}/10</span>
                      </div>
                    </div>
                  </Card>

                  {/* Chat com Assistente IA */}
                  <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-bold text-white">Assistente IA</h3>
                      <Badge className="bg-green-600 text-xs">10 créditos/msg</Badge>
                    </div>

                    {/* Mensagens */}
                    <div className="bg-zinc-800/50 rounded-lg p-4 h-80 overflow-y-auto mb-4 space-y-3">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-green-300 text-sm py-8">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 text-green-400" />
                          <p>Pergunte qualquer coisa sobre este mercado!</p>
                          <p className="text-xs mt-2 text-green-400">Ex: "Qual o melhor momento para comprar?"</p>
                        </div>
                      ) : (
                        chatMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-green-600 text-white ml-8"
                                : "bg-zinc-700 text-green-100 mr-8"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Digite sua pergunta..."
                        className="bg-zinc-800 border-green-500/30 text-white placeholder:text-green-300/50"
                        disabled={credits < 10}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={credits < 10 || !chatInput.trim()}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    {credits < 10 && (
                      <p className="text-red-400 text-xs mt-2">Créditos insuficientes. Recarregue seu plano!</p>
                    )}
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "analysis" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Análise de Gráficos com IA</h2>
              <p className="text-green-200">Envie uma imagem do gráfico e receba análise instantânea</p>
              <Badge className="mt-2 bg-green-600">10 créditos por análise</Badge>
            </div>

            <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-8">
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Envie seu gráfico</h3>
                  <p className="text-green-200 mb-6">
                    Faça upload de uma imagem ou print do gráfico que deseja analisar
                  </p>
                </div>

                <div className="border-2 border-dashed border-green-500/30 rounded-2xl p-12 mb-6 hover:border-green-500/50 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="chart-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        alert("Analisando gráfico... (Demo)");
                      }
                    }}
                  />
                  <label htmlFor="chart-upload" className="cursor-pointer">
                    <Upload className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-green-200 text-lg mb-2">
                      Clique para fazer upload ou arraste aqui
                    </p>
                    <p className="text-green-300 text-sm">
                      Formatos aceitos: JPG, PNG, WebP (máx. 10MB)
                    </p>
                  </label>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">O que nossa IA analisa:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-semibold">Padrões de Candlestick</p>
                        <p className="text-green-300 text-sm">Identificação de formações clássicas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-semibold">Suportes e Resistências</p>
                        <p className="text-green-300 text-sm">Níveis críticos de preço</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-semibold">Tendências</p>
                        <p className="text-green-300 text-sm">Alta, baixa ou lateral</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-semibold">Volume</p>
                        <p className="text-green-300 text-sm">Força do movimento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Exemplo de Resultado */}
            <Card className="bg-zinc-900/80 backdrop-blur-xl border-green-500/20 p-8 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Exemplo de Análise</h3>
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">Tendência de Alta Identificada</h4>
                    <p className="text-green-200 mb-3">
                      Probabilidade de valorização: <strong className="text-green-400">78%</strong>
                    </p>
                    <p className="text-green-100 text-sm leading-relaxed">
                      O gráfico apresenta formação de fundo duplo com rompimento de resistência em R$ 42,50. 
                      Volume crescente confirma a força compradora. Suporte identificado em R$ 40,20. 
                      Alvo projetado: R$ 48,00 (+14% do preço atual).
                    </p>
                  </div>
                </div>
                <div className="border-t border-green-500/20 pt-4">
                  <p className="text-green-300 text-sm">
                    <strong>Recomendação:</strong> Posição de compra com stop loss em R$ 39,80
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
