"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TrendingUp, Mail, User, Phone, CreditCard, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTerms, setShowTerms] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, "");
    return cleanCPF.length === 11;
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join(".").replace(/\.(\d{2})$/, "-$1");
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}${match[3] ? "-" + match[3] : ""}`;
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsValidating(true);

    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    }

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.replace(/\D/g, "").match(/^\d{10,11}$/)) {
      newErrors.phone = "Telefone inválido";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsValidating(false);
      return;
    }

    // Simular validação de email
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Salvar dados no localStorage
    localStorage.setItem("easytrader_user", JSON.stringify(formData));
    
    setIsValidating(false);
    router.push("/plans");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <TrendingUp className="w-16 h-16 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
            Criar Conta
          </h1>
          <p className="text-emerald-200">Comece sua jornada para o sucesso financeiro</p>
        </div>

        {/* Formulário */}
        <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome Completo */}
            <div>
              <Label htmlFor="fullName" className="text-emerald-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-2 bg-emerald-950/30 border-emerald-500/40 text-white focus:border-emerald-400 focus:ring-emerald-400/50"
                placeholder="Digite seu nome completo"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* CPF */}
            <div>
              <Label htmlFor="cpf" className="text-emerald-200 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                className="mt-2 bg-emerald-950/30 border-emerald-500/40 text-white focus:border-emerald-400 focus:ring-emerald-400/50"
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {errors.cpf && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.cpf}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-emerald-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-emerald-950/30 border-emerald-500/40 text-white focus:border-emerald-400 focus:ring-emerald-400/50"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="phone" className="text-emerald-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                className="mt-2 bg-emerald-950/30 border-emerald-500/40 text-white focus:border-emerald-400 focus:ring-emerald-400/50"
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Termos */}
            <div className="flex items-start gap-3 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                className="mt-1 border-emerald-500/50 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <div className="flex-1">
                <Label htmlFor="terms" className="text-emerald-200 cursor-pointer">
                  Aceito os{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-emerald-400 hover:text-emerald-300 underline font-semibold"
                  >
                    Termos de Uso e Política de Privacidade
                  </button>
                </Label>
                {errors.acceptTerms && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.acceptTerms}
                  </p>
                )}
              </div>
            </div>

            {/* Botão Submit */}
            <Button
              type="submit"
              disabled={isValidating}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg rounded-xl shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-500/30"
            >
              {isValidating ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Validando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Criar Conta
                </span>
              )}
            </Button>

            {/* Detalhe vermelho decorativo */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-500/50"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500/50"></div>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Modal de Termos */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-black border-emerald-500/30">
          <DialogHeader>
            <DialogTitle className="text-2xl text-emerald-400">Termos de Uso e Política de Privacidade</DialogTitle>
            <DialogDescription className="text-emerald-200">
              Leia atentamente antes de aceitar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-emerald-100 text-sm">
            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">1. Aceitação dos Termos</h3>
              <p>
                Ao acessar e usar o EasyTrader, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">2. Descrição do Serviço</h3>
              <p>
                O EasyTrader é uma plataforma de análise de mercado financeiro que utiliza inteligência artificial para fornecer insights sobre tendências de mercado. Nossos serviços incluem:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Análise de gráficos financeiros através de IA</li>
                <li>Recomendações de mercados e plataformas de investimento</li>
                <li>Sistema de créditos para uso das funcionalidades premium</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">3. Isenção de Responsabilidade</h3>
              <p className="font-semibold text-red-400 mb-2">
                IMPORTANTE: O EasyTrader NÃO é uma consultoria de investimentos.
              </p>
              <p>
                Todas as análises, previsões e recomendações fornecidas pela plataforma são baseadas em algoritmos de inteligência artificial e dados históricos. Elas não constituem aconselhamento financeiro, jurídico ou de investimento. O usuário é o único responsável por suas decisões de investimento.
              </p>
              <p className="mt-2">
                Investimentos em mercados financeiros envolvem riscos significativos, incluindo a possível perda total do capital investido. Resultados passados não garantem resultados futuros.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">4. Sistema de Créditos</h3>
              <p>
                O EasyTrader opera com um sistema de créditos para acesso às funcionalidades premium:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Cada análise de gráfico consome 10 créditos</li>
                <li>Créditos não utilizados não expiram durante a vigência do plano</li>
                <li>Créditos não são reembolsáveis</li>
                <li>Créditos não podem ser transferidos entre contas</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">5. Planos e Pagamentos</h3>
              <p>
                Oferecemos três planos de assinatura:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Beginner:</strong> R$ 49,90 - 500 créditos imediatos (pagamento único)</li>
                <li><strong>Trader Pro:</strong> R$ 149,90/mês - 1000 créditos mensais</li>
                <li><strong>Trader Master:</strong> R$ 849,90/ano - 10.000 créditos mensais</li>
              </ul>
              <p className="mt-2">
                Pagamentos via PIX no plano Beginner recebem 7 dias de teste grátis e 250 créditos adicionais. Todos os pagamentos são processados de forma segura através de nossos parceiros de pagamento.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">6. Política de Cancelamento</h3>
              <p>
                Você pode cancelar sua assinatura a qualquer momento através das configurações da conta. O cancelamento terá efeito ao final do período de faturamento atual. Não oferecemos reembolsos proporcionais para cancelamentos antecipados.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">7. Privacidade e Proteção de Dados</h3>
              <p>
                Levamos sua privacidade a sério e estamos comprometidos com a proteção de seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD):
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Coletamos apenas dados necessários para prestação do serviço</li>
                <li>Seus dados não serão vendidos ou compartilhados com terceiros sem seu consentimento</li>
                <li>Utilizamos criptografia para proteger informações sensíveis</li>
                <li>Você tem direito de acessar, corrigir ou excluir seus dados a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">8. Uso Aceitável</h3>
              <p>
                Você concorda em não:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Usar a plataforma para atividades ilegais ou fraudulentas</li>
                <li>Tentar acessar áreas restritas do sistema</li>
                <li>Compartilhar sua conta com terceiros</li>
                <li>Fazer engenharia reversa ou copiar nossos algoritmos</li>
                <li>Usar bots ou automações não autorizadas</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">9. Propriedade Intelectual</h3>
              <p>
                Todo o conteúdo, design, código, algoritmos e marca do EasyTrader são propriedade exclusiva da empresa e estão protegidos por leis de propriedade intelectual. É proibida a reprodução, distribuição ou uso comercial sem autorização prévia.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">10. Limitação de Responsabilidade</h3>
              <p>
                O EasyTrader não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Perdas financeiras decorrentes de decisões de investimento</li>
                <li>Interrupções temporárias do serviço</li>
                <li>Erros ou imprecisões nas análises fornecidas</li>
                <li>Problemas técnicos fora de nosso controle</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">11. Modificações dos Termos</h3>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas por email com 30 dias de antecedência. O uso continuado da plataforma após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">12. Lei Aplicável</h3>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de São Paulo/SP.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">13. Contato</h3>
              <p>
                Para dúvidas, sugestões ou suporte, entre em contato:
              </p>
              <ul className="list-none ml-4 mt-2 space-y-1">
                <li>Email: suporte@easytrader.com.br</li>
                <li>Telefone: (11) 4002-8922</li>
                <li>Horário de atendimento: Segunda a Sexta, 9h às 18h</li>
              </ul>
            </section>

            <section className="border-t border-emerald-500/30 pt-4">
              <p className="text-xs text-emerald-300">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
              <p className="text-xs text-emerald-300 mt-2">
                EasyTrader - CNPJ: 00.000.000/0001-00
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
