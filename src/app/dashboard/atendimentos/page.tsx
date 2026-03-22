"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Send, Bot, PauseCircle, PlayCircle, ShieldAlert, UserCheck, Archive, Phone, Instagram, MessageCircle, SlidersHorizontal, Flame } from "lucide-react"

type Message = { id: number; text: string; sender: 'ia_n8n' | 'paciente' | 'humano'; time: string }
type Chat = { id: number; nome: string; telefone: string; status: 'aberto' | 'meu' | 'fechado'; botActive: boolean; canal: 'whatsapp' | 'instagram'; temperatura: 'quente' | 'morno' | 'frio'; mensagens: Message[] }

const INITIAL_CHATS: Chat[] = [
  { 
    id: 1, 
    nome: "João Silva", 
    telefone: "(11) 99999-9999",
    status: 'aberto',
    botActive: true,
    canal: 'whatsapp',
    temperatura: 'morno',
    mensagens: [
      { id: 1, text: "Olá, João! Tudo bem? Sou a assistente de Triagem! Como posso acelerar seu agendamento?", sender: "ia_n8n", time: "10:01" },
      { id: 2, text: "Preciso falar com um humano a respeito do valor fixo, o bot não ajudou MT.", sender: "paciente", time: "10:05" },
    ]
  },
  { 
    id: 2, 
    nome: "Maria Oliveira", 
    telefone: "@maria.odonto",
    status: 'meu',
    botActive: false,
    canal: 'instagram',
    temperatura: 'quente',
    mensagens: [
      { id: 1, text: "Oi Maria! Aqui é a Dra. Fernanda. Vi seu direct e o relato de dor no dente 34.", sender: "humano", time: "09:30" },
      { id: 2, text: "Isso doutora, começou a doer ontem a noite.", sender: "paciente", time: "09:35" },
    ]
  },
  {
    id: 3,
    nome: "Carlos Souza",
    telefone: "(11) 97777-7777",
    status: 'aberto',
    botActive: true,
    canal: 'whatsapp',
    temperatura: 'frio',
    mensagens: [
      { id: 1, text: "Seu agendamento foi confirmado para amanhã às 14h.", sender: "ia_n8n", time: "Ontem" }
    ]
  },
   {
    id: 4,
    nome: "Carla Antunes",
    telefone: "@ca_antuness",
    status: 'aberto',
    botActive: true,
    canal: 'instagram',
    temperatura: 'quente',
    mensagens: [
      { id: 1, text: "Boa tarde, qual o valor do clareamento a laser?", sender: "paciente", time: "Ontem" },
      { id: 2, text: "Olá Carla! Nossos preços baseiam-se em uma avaliação. Gostaria de agendar uma gratuita?", sender: "ia_n8n", time: "Ontem" }
    ]
  }
]

export default function AtendimentosPage() {
  const [activeTab, setActiveTab] = useState<'aberto' | 'meu' | 'fechado'>('aberto')
  const [activeChannel, setActiveChannel] = useState<'todos' | 'whatsapp' | 'instagram'>('todos')
  const [filterHot, setFilterHot] = useState(false)
  
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS)
  const [activeChatId, setActiveChatId] = useState<number>(1)
  const [msgText, setMsgText] = useState("")
  
  const scrollRef = useRef<HTMLDivElement>(null)

  // Filtro Triplo Inteligente: Estado X Canal X Temperatura (Prioridade Quente)
  const filteredChats = chats.filter(c => 
     c.status === activeTab && 
     (activeChannel === 'todos' || c.canal === activeChannel) &&
     (!filterHot || c.temperatura === 'quente')
  )
  const activeChat = chats.find(c => c.id === activeChatId)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [activeChat?.mensagens])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgText(e.target.value)
    if (e.target.value.length > 0 && activeChat?.botActive) {
       toggleBot(activeChatId, false)
    }
  }

  const toggleBot = (chatId: number, state: boolean) => {
    setChats(chats.map(c => c.id === chatId ? { ...c, botActive: state } : c))
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!msgText.trim() || !activeChat) return

    const newMessage: Message = {
       id: Date.now(),
       text: msgText,
       sender: "humano",
       time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setChats(chats.map(c => 
      c.id === activeChatId 
      ? { ...c, status: c.status === 'aberto' ? 'meu' : c.status, mensagens: [...c.mensagens, newMessage] } 
      : c
    ))
    
    if (activeChat.status === 'aberto') {
       setActiveTab('meu')
    }

    setMsgText("")
  }

  return (
    <div className="max-w-[1400px] mx-auto h-[90vh] flex flex-col relative overflow-hidden space-y-4">
      {/* Header Funcional com Segmentação de Leads (STATUS) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mt-2 px-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Inbox Atendimentos</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Controle os leads rastreando quais precisam de mais ou menos atenção (Termometria).</p>
        </div>
        <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0 border border-slate-200 shadow-inner">
          <button 
            onClick={() => setActiveTab('aberto')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[12.5px] font-black uppercase tracking-widest transition-all ${activeTab === 'aberto' ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <ShieldAlert className="w-4 h-4"/> Abertos (IA) <span className={`ml-1 px-2 py-0.5 rounded-md ${activeTab==='aberto'?'bg-amber-200 text-amber-800':'bg-slate-200 text-slate-500'}`}>{chats.filter(c=>c.status==='aberto').length}</span>
          </button>
          <button 
             onClick={() => setActiveTab('meu')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[12.5px] font-black uppercase tracking-widest transition-all ${activeTab === 'meu' ? 'bg-[#0095ff] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <UserCheck className="w-4 h-4"/> Triados (Meus) <span className={`ml-1 px-2 py-0.5 rounded-md ${activeTab==='meu'?'bg-white/20 text-white':'bg-slate-200 text-slate-500'}`}>{chats.filter(c=>c.status==='meu').length}</span>
          </button>
          <button 
             onClick={() => setActiveTab('fechado')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[12.5px] font-black uppercase tracking-widest transition-all ${activeTab === 'fechado' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Archive className="w-4 h-4"/> Fechados
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-1 overflow-hidden h-full mt-2 mx-2">
        {/* Painel Esquerdo: Segmentação de Apps & Chats */}
        <div className="w-[360px] shrink-0 border-r border-slate-100 flex flex-col bg-[#F8FAFC]/50">
          <div className="p-5 border-b border-slate-100 bg-white space-y-4">
             {/* Sub-Aba Filtro Global Solicitado pelo Usuário (Instagram VS WhatsApp VS Leads Quentes) */}
             <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner">
                <button onClick={() => setActiveChannel('todos')} className={`flex-1 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest transition-all ${activeChannel === 'todos' ? 'bg-white shadow-sm text-slate-800 border border-slate-200/60' : 'text-slate-400 hover:text-slate-600'}`}>Tudo</button>
                <button onClick={() => setActiveChannel('whatsapp')} className={`flex-1 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 ${activeChannel === 'whatsapp' ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-600'}`}><MessageCircle className="w-3.5 h-3.5"/> WP</button>
                <button onClick={() => setActiveChannel('instagram')} className={`flex-1 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 ${activeChannel === 'instagram' ? 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow-sm shadow-fuchsia-500/20' : 'text-slate-400 hover:text-slate-600'}`}><Instagram className="w-3.5 h-3.5"/> IG</button>
                <button onClick={() => setFilterHot(!filterHot)} className={`flex-1 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1 shadow-sm ${filterHot ? 'bg-rose-500 text-white shadow-rose-500/30' : 'bg-white text-rose-500 border border-rose-200/60 hover:bg-rose-50'}`}><Flame className={`w-3.5 h-3.5 ${filterHot ? 'fill-white' : 'fill-rose-500'}`}/> VIP</button>
             </div>
             
             <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Filtrar caixas de entrada..." className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 && (
               <div className="flex flex-col justify-center items-center h-full p-8 text-center text-slate-400 font-bold text-sm">
                 <SlidersHorizontal className="w-10 h-10 mb-2 opacity-50"/>
                 Nenhum chat reflete sua filtragem térmica atual.
               </div>
            )}
            {filteredChats.map((c) => (
             <div key={c.id} onClick={() => setActiveChatId(c.id)} className={`p-5 border-b border-slate-50 flex items-start gap-4 cursor-pointer transition-all ${activeChatId === c.id ? 'bg-white shadow-[inset_4px_0_0_0_#0095ff]' : 'bg-transparent hover:bg-white'}`}>
                {/* Badges do Canal Tático */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 shadow-sm relative ${c.canal === 'whatsapp' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-fuchsia-50 text-fuchsia-500 border-fuchsia-100'}`}>
                   {c.canal === 'whatsapp' ? <MessageCircle className="w-6 h-6"/> : <Instagram className="w-6 h-6"/>}
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className={`font-extrabold text-[15px] flex items-center gap-1.5 ${activeChatId === c.id ? 'text-slate-800' : 'text-slate-600'}`}>
                       {c.nome}
                       {c.temperatura === 'quente' && <Flame className="w-3 h-3 text-rose-500 fill-rose-500"/>}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold">{c.mensagens[c.mensagens.length - 1]?.time.split("-")[0] || 'Hoje'}</span>
                  </div>
                  <p className="text-[12.5px] font-medium text-slate-500 truncate mb-2">{c.mensagens[c.mensagens.length - 1]?.text || 'Sem mensagens'}</p>
                  
                  {c.status === 'aberto' && (
                    <span className={`px-2.5 py-0.5 flex items-center w-max gap-1.5 text-[9px] font-black uppercase tracking-widest rounded-full border ${c.botActive ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                      {c.botActive ? <Bot className="w-3 h-3"/> : null} {c.botActive ? 'ROBÔ OMINICHANNEL ATIVO' : 'HUMANO SOLICITADO'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Main de Conversa */}
        {!activeChat ? (
           <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
             <MessageCircle className="w-12 h-12 mb-4 text-slate-300"/>
             <h3 className="text-xl font-bold">Nenhum Chat em Foco</h3>
             <p className="text-sm">Clique em um lead no menu lateral ou alterne de aba.</p>
           </div>
        ) : (
          <div className="flex-1 flex flex-col relative" style={{ backgroundColor: '#F0F5F8' }}>
            {/* Header Dinâmico de Identidade Visual pelo Canal */}
            <div className={`h-[84px] shrink-0 border-b bg-white flex items-center justify-between px-8 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${activeChat.canal === 'whatsapp' ? 'border-emerald-500/20' : 'border-fuchsia-500/20'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black shadow-sm ${activeChat.canal === 'whatsapp' ? 'bg-emerald-500 text-white' : 'bg-gradient-to-tr from-fuchsia-500 to-rose-500 text-white'}`}>
                  {activeChat.canal === 'whatsapp' ? <MessageCircle className="w-6 h-6"/> : <Instagram className="w-6 h-6"/>}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-[18px] leading-none mb-1.5 flex items-center gap-2">
                    {activeChat?.nome}
                    {activeChat?.temperatura === 'quente' && <span className="bg-rose-100 text-rose-600 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1 shadow-sm"><Flame className="w-3 h-3 fill-rose-500"/> Urgente</span>}
                  </h3>
                  <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-md flex items-center gap-1.5 w-max ${activeChat.canal === 'whatsapp' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' : 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200/50'}`}>
                    {activeChat.canal === 'whatsapp' ? <><Phone className="w-3 h-3"/> Venda Originada via WhatsApp</> : <><Instagram className="w-3 h-3"/> Lead Originado no Instagram</>}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {activeChat.status !== 'fechado' && (
                  <>
                    <button onClick={() => setChats(chats.map(c => c.id === activeChat.id ? { ...c, status: 'fechado' } : c))} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm">
                      Mover para Fechados
                    </button>
                    {activeChat.botActive ? (
                      <button onClick={() => toggleBot(activeChatId, false)} className="flex items-center gap-2 px-3 py-2 bg-white text-amber-600 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm border border-amber-200 hover:bg-amber-50">
                        <PauseCircle className="w-4 h-4" /> Desligar Robô
                      </button>
                    ) : (
                      <button onClick={() => toggleBot(activeChatId, true)} className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm ${activeChat.canal === 'whatsapp' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-fuchsia-500 hover:bg-fuchsia-600'}`}>
                        <PlayCircle className="w-4 h-4" /> Religar {activeChat.canal === 'whatsapp' ? 'ZapIA' : 'InstAI'}
                      </button>
                    )}
                  </>
                )}
                {activeChat.status === 'fechado' && (
                   <span className="text-slate-500 font-black text-xs uppercase tracking-widest bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300">Este Tratamento está Fechado</span>
                )}
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-opacity-[0.03] bg-cover bg-blend-multiply pb-10">
              {!activeChat.botActive && activeChat.status !== 'fechado' && (
                <div className="flex justify-center sticky top-0 z-20">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-amber-300 shadow-md flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5"/> Hand-Off: Você encabeça esta negociação agora.
                  </span>
                </div>
              )}
              
              <div className="flex flex-col space-y-4">
                {activeChat.mensagens.map(m => (
                   <div key={m.id} className={`flex ${m.sender === 'paciente' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[70%] p-5 rounded-2xl shadow-sm relative group ${m.sender === 'paciente' ? (activeChat.canal === 'whatsapp' ? 'bg-emerald-500 text-white shadow-emerald-500/20 rounded-tr-sm' : 'bg-gradient-to-tr from-fuchsia-500 to-rose-500 text-white shadow-fuchsia-500/20 rounded-tr-sm') : m.sender === 'humano' ? 'bg-white border border-slate-300' : 'bg-white border border-[#0095ff]/10 rounded-tl-sm'}`}>
                       {m.sender !== 'paciente' && <h5 className={`text-[11px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5 ${m.sender === 'humano' ? 'text-slate-800' : 'text-[#0095ff]'}`}>{m.sender === 'humano' ? 'Agente / Dentista' : 'Robô de Triagem Ominichannel'}</h5>}
                       <p className={`text-[14.5px] font-semibold leading-relaxed ${m.sender === 'paciente' ? 'text-white' : 'text-slate-700'}`}>{m.text}</p>
                       <div className="flex items-center gap-1.5 mt-2 justify-end">
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${m.sender === 'paciente' ? 'text-white/80' : 'text-slate-400'}`}>{m.time}</span>
                       </div>
                     </div>
                   </div>
                ))}
              </div>
            </div>

            {activeChat.status !== 'fechado' ? (
              <form onSubmit={handleSend} className={`h-[90px] shrink-0 border-t ${activeChat.botActive ? 'bg-amber-50/50 border-amber-200/60' : 'bg-white border-slate-200/60'} p-5 flex items-center gap-4 transition-colors`}>
                <input 
                  type="text" 
                  value={msgText}
                  onChange={handleInputChange}
                  placeholder={activeChat.botActive ? `A ${activeChat.canal} API está em vigor. APERTE ALGO PARA INTERROMPÊ-LA E ASSUMIR O CHAT!` : `Escreva sua mensagem via ${activeChat.canal}...`} 
                  className={`flex-1 border rounded-xl px-5 py-4 text-[14.5px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:bg-white transition-all shadow-inner ${
                    activeChat.botActive ? "border-amber-300 bg-amber-50 placeholder:text-amber-500 text-amber-900 focus:border-amber-400" : "bg-[#F8FAFC] border-slate-200 placeholder:text-slate-400 text-slate-800"
                  }`} 
                />
                <button type="submit" className={`w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all shadow-md ${
                  msgText.length > 0 ? (activeChat.canal === 'whatsapp' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-fuchsia-500 hover:bg-fuchsia-600 shadow-fuchsia-500/30') : "bg-slate-300 shadow-none cursor-not-allowed"
                }`}>
                  <Send className="w-6 h-6 ml-1"/>
                </button>
              </form>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
