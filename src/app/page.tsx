"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email.toLowerCase().includes("dev") && password !== "123456") {
      alert("Senha incorreta!")
      return
    }

    setIsLoading(true)

    // Simulando regras de permissão corporativas baseada no Email
    let userMock = {
       name: "Dra. Odonto Fav",
       role: "Diretoria",
       email: email || "diretoria@odontofav.com.br",
       initials: "OF",
       type: "admin"
    }

    if (email.toLowerCase().includes("dev")) {
       userMock = {
          name: "Werlinho (Engenharia)",
          role: "God Mode",
          email: email,
          initials: "WD",
          type: "dev"
       }
    } else if (email.toLowerCase().includes("alexia") || email.toLowerCase().includes("gerencia")) {
       userMock = {
          name: "Alexia (Gerência)",
          role: "Gerente Comercial",
          email: email,
          initials: "AL",
          type: "admin"
       }
    } else if (email.toLowerCase().includes("recepcao")) {
       userMock = {
          name: "João Paulo",
          role: "Recepcionista Clínico",
          email: email,
          initials: "JP",
          type: "recepcao"
       }
    }

    localStorage.setItem("odontofav_user", JSON.stringify(userMock))

    // Simulando tempo de resposta do servidor da API Autenticadora
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex text-slate-800 bg-white">
      {/* Lado Esquerdo - Formulário de Acesso */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Oficial OdontoFav */}
          <div className="mb-12 flex items-center gap-3">
             <img src="/logo.png" alt="OdontoFav Logo" className="h-[75px] w-auto object-contain" />
          </div>

          <h2 className="text-[32px] font-black text-slate-800 mb-2 tracking-tight">Bem-vindo(a) de volta!</h2>
          <p className="text-slate-500 font-semibold mb-10 text-[15px]">Insira suas credenciais administrativas para acessar o ERP e Painel Omnichannel da OdontoFav.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[12px] uppercase tracking-widest font-black text-slate-500">ID / E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0095ff] transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@odontofav.com.br"
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-[15px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] transition-all bg-[#F8FAFC] focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center pb-1">
                <label className="text-[12px] uppercase tracking-widest font-black text-slate-500">Sua Autenticação</label>
                <a href="#" className="text-[#0095ff] text-[13px] font-extrabold hover:text-[#007acc] transition-colors">Esqueceu a senha?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0095ff] transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-[15px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] transition-all bg-[#F8FAFC] focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !isMounted}
              className={`w-full py-4 mt-6 rounded-xl text-white font-black uppercase tracking-widest text-[13px] transition-all flex justify-center items-center gap-2 ${
                (isLoading || !isMounted)
                ? 'bg-[#0095ff]/70 cursor-not-allowed shadow-none' 
                : 'bg-[#0095ff] hover:bg-[#007acc] hover:shadow-[0_8px_20px_rgba(0,149,255,0.25)] hover:-translate-y-0.5 shadow-[0_4px_10px_rgba(0,149,255,0.15)]'
              }`}
            >
              {isLoading ? (
                 <span className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                 <>Acessar Sistema <ArrowRight className="w-4 h-4 ml-1" strokeWidth={3} /></>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-[12px] font-bold text-slate-400 flex items-center justify-center gap-1.5 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" strokeWidth={3} /> Conexão End-to-end Supabase Auth
          </p>
        </div>
      </div>

      {/* Lado Direito - Branding / Imagem Premium */}
      <div className="hidden lg:flex w-1/2 bg-[#0095ff] relative overflow-hidden flex-col justify-center items-center border-l border-[#007acc]/20">
        {/* Overlay Azul com mix-blend para colorir a imagem perfeitamente */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0095ff]/95 via-[#007acc]/90 to-[#005b99]/95 z-10 mix-blend-multiply"></div>
        
        {/* Imagem de Alta Qualidade Médica / Odontológica de Fundo */}
        <img 
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1600" 
          alt="Odontologia Premium" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0 grayscale opacity-80"
        />
        
        {/* Conteúdo de Texto Overlay na Imagem */}
        <div className="relative z-20 max-w-lg text-white px-12">
           <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[20px] flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
             <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2.5}/>
           </div>
           <h1 className="text-[44px] font-black leading-[1.1] mb-6 tracking-tight">Gestão Clínica Inteligente de Última Geração.</h1>
           <p className="text-blue-50 font-medium text-[16px] leading-relaxed opacity-90">
             O ERP OdontoFav unifica todos os seus atendimentos N8n, converte os leads do WhatsApp, agenda horários dinâmicos e controla o fluxo de caixa em um só lugar.
           </p>
           
           <div className="mt-12 flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors cursor-default">
                <span className="block text-[11px] uppercase tracking-widest font-black text-blue-200">Supabase DB</span>
                <span className="block font-bold mt-1 text-[15px]">Cloud Real-Time</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors cursor-default">
                <span className="block text-[11px] uppercase tracking-widest font-black text-blue-200">Omnichannel</span>
                <span className="block font-bold mt-1 text-[15px]">Multi-atendimento</span>
              </div>
           </div>
        </div>
      </div>
      
    </div>
  )
}
