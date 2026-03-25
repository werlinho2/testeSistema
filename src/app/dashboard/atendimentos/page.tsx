"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Send, Bot, PauseCircle, PlayCircle, ShieldAlert, UserCheck, Archive, Phone, Instagram, MessageCircle, SlidersHorizontal, Flame, ArrowLeft, GitCommitHorizontal, Filter, ArrowUpDown, CornerDownRight, Smile, Paperclip, Mic, Wand2, CheckSquare } from "lucide-react"
import { useCRMContext } from "@/contexts/CRMContext"

const FUNIL_LABELS: Record<string, string> = {
  novo_lead: "Novo Lead",
  qualificado: "Qualificado",
  agendado: "Agendado",
  confirmado: "Confirmado",
  compareceu: "Compareceu",
  no_show: "No-show",
  perdido: "Perdido",
  pos_venda: "Pós-Venda"
}

export default function AtendimentosPage() {
  const { leads, updateLeadChatStatus, toggleBot, addMessage } = useCRMContext()
  
  const [activeTab, setActiveTab] = useState<'aberto' | 'meu' | 'fechado'>('aberto')
  
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [msgText, setMsgText] = useState("")
  const [editorMode, setEditorMode] = useState<'responder' | 'privada'>('responder')
  
  const scrollRef = useRef<HTMLDivElement>(null)

  // Filtro
  const filteredChats = leads.filter(c => c.status_chat === activeTab)
  
  const activeChat = activeChatId ? leads.find(c => c.id === activeChatId) : null

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [activeChat?.mensagens])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgText(e.target.value)
    if (e.target.value.length > 0 && activeChat?.botActive) {
       toggleBot(activeChat.id, false)
    }
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!msgText.trim() || !activeChat) return

    addMessage(activeChat.id, {
       text: msgText,
       sender: "humano",
    })

    if (activeChat.status_chat === 'aberto') {
       setActiveTab('meu')
    }

    setMsgText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 top-[76px] z-40 md:static flex flex-col h-full bg-[#f8fafc] dark:bg-[#09090A] text-slate-800 dark:text-slate-200 transition-colors">
      
      <div className="flex flex-1 h-full w-full overflow-hidden">
        
        {/* Painel Esquerdo: Lista de Conversas */}
        <div className={`w-full md:w-[360px] lg:w-[400px] shrink-0 border-r border-slate-200 dark:border-[#27272A] flex flex-col bg-white dark:bg-[#121214] transition-colors ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          {/* Header do Painel */}
          <div className="p-5 border-b border-slate-200 dark:border-[#27272A] shrink-0 space-y-4">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  Conversas 
                  <span className="text-[10px] font-bold bg-slate-100 dark:bg-[#27272A] text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">Abertas</span>
                </h2>
                <div className="flex items-center gap-1">
                   <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-md hover:bg-slate-50 dark:hover:bg-[#27272A] transition-colors"><Filter className="w-4 h-4"/></button>
                   <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-md hover:bg-slate-50 dark:hover:bg-[#27272A] transition-colors"><ArrowUpDown className="w-4 h-4"/></button>
                   <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-md hover:bg-slate-50 dark:hover:bg-[#27272A] transition-colors"><CornerDownRight className="w-4 h-4"/></button>
                </div>
             </div>

             {/* Tabs Minhas / Não Atribuídas */}
             <div className="flex gap-4 border-b border-slate-200 dark:border-[#27272A]">
               <button onClick={() => setActiveTab('meu')} className={`pb-2 text-sm font-semibold transition-all flex items-center gap-1.5 border-b-2 ${activeTab === 'meu' ? 'border-[#3B82F6] text-[#3B82F6]' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                 Minhas <span className={`text-[10px] px-1.5 rounded-full ${activeTab==='meu'?'bg-[#3B82F6]/20 text-[#3B82F6]':'bg-slate-100 dark:bg-[#27272A]'}`}>{leads.filter(c=>c.status_chat==='meu').length}</span>
               </button>
               <button onClick={() => setActiveTab('aberto')} className={`pb-2 text-sm font-semibold transition-all flex items-center gap-1.5 border-b-2 ${activeTab === 'aberto' ? 'border-[#3B82F6] text-[#3B82F6]' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                 Não atribuídas <span className={`text-[10px] px-1.5 rounded-full ${activeTab==='aberto'?'bg-[#3B82F6]/20 text-[#3B82F6]':'bg-slate-100 dark:bg-[#27272A]'}`}>{leads.filter(c=>c.status_chat==='aberto').length}</span>
               </button>
               <button onClick={() => setActiveTab('fechado')} className={`pb-2 text-sm font-semibold transition-all flex items-center gap-1.5 border-b-2 ${activeTab === 'fechado' ? 'border-[#3B82F6] text-[#3B82F6]' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                 Todos <span className={`text-[10px] px-1.5 rounded-full ${activeTab==='fechado'?'bg-[#3B82F6]/20 text-[#3B82F6]':'bg-slate-100 dark:bg-[#27272A]'}`}>{leads.filter(c=>c.status_chat==='fechado').length}</span>
               </button>
             </div>
          </div>

          {/* Lista de Chats */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredChats.length === 0 && (
               <div className="flex flex-col justify-center items-center h-full p-8 text-center text-slate-400 dark:text-slate-500 font-bold text-sm">
                 <SlidersHorizontal className="w-8 h-8 mb-2 opacity-50"/>
                 Nenhuma conversa nesta caixa.
               </div>
            )}
            {filteredChats.map((c) => (
             <div key={c.id} onClick={() => setActiveChatId(c.id)} className={`p-4 border-b border-slate-100 dark:border-[#1A1A1E] flex flex-col gap-2 cursor-pointer transition-all ${activeChatId === c.id ? 'bg-slate-50 dark:bg-[#18181B] border-l-2 border-l-[#3B82F6]' : 'bg-transparent border-l-2 border-l-transparent hover:bg-slate-50 dark:hover:bg-[#1A1A1E]'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-[#27272A] bg-slate-100 dark:bg-[#27272A]">
                      {c.foto ? <img src={c.foto} alt="" className="w-full h-full rounded-full object-cover"/> : <UserCheck className="w-4 h-4 text-slate-400"/>}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-[14px] flex items-center gap-1.5 ${activeChatId === c.id ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                        {c.nome}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        {c.canal === 'whatsapp' ? <MessageCircle className="w-3 h-3 text-emerald-500" /> : <Instagram className="w-3 h-3 text-fuchsia-500" />}
                        {c.canal === 'whatsapp' ? 'WhatsApp' : 'Instagram'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{c.mensagens[c.mensagens.length - 1]?.time.split("-")[0] || 'Agora'}</span>
                </div>
                
                <p className="text-[13px] text-slate-500 dark:text-slate-400 truncate pl-10 pr-2">
                  <span className="text-slate-400 dark:text-slate-500 mr-1">↳</span>
                  {c.mensagens[c.mensagens.length - 1]?.text || 'Conversa iniciada'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* View Main de Conversa */}
        {!activeChat ? (
           <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#09090A] text-slate-400 dark:text-slate-600">
             <MessageCircle className="w-16 h-16 mb-4 text-slate-200 dark:text-[#27272A]"/>
             <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400">Nenhuma conversa selecionada</h3>
             <p className="text-sm">Abra um chat na barra lateral para começar a atender.</p>
           </div>
        ) : (
          <div className={`flex-1 flex-col h-full overflow-hidden ${activeChatId ? 'flex' : 'hidden md:flex'}`}>
            
            {/* Header da Conversa */}
            <div className="h-[76px] shrink-0 border-b border-slate-200 dark:border-[#27272A] bg-white dark:bg-[#09090A] flex items-center justify-between px-4 lg:px-6 z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-md transition-colors">
                   <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center shrink-0 bg-slate-100 dark:bg-[#27272A] relative">
                  {activeChat.foto ? <img src={activeChat.foto} alt="" className="w-full h-full rounded-full object-cover"/> : <UserCheck className="w-5 h-5 text-slate-400"/>}
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#09090A] rounded-full p-0.5">
                    {activeChat.canal === 'whatsapp' ? <Phone className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> : <Instagram className="w-3.5 h-3.5 text-fuchsia-500" />}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-[16px] leading-none mb-1 flex items-center gap-2">
                    {activeChat.nome}
                  </h3>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5" /> FASE: {FUNIL_LABELS[activeChat.status_funil]}</span>
                    <span>•</span>
                    <span className="text-emerald-500 font-semibold">{activeChat.telefone}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {activeChat.botActive ? (
                   <button onClick={() => toggleBot(activeChat.id, false)} className="px-3 py-1.5 text-[12px] font-bold text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 rounded-md flex items-center gap-1.5 transition-colors hover:bg-emerald-200 dark:hover:bg-emerald-500/20 shadow-sm">
                     <Bot className="w-4 h-4" /> BOT LIGADO
                   </button>
                ) : (
                   <button onClick={() => toggleBot(activeChat.id, true)} className="px-3 py-1.5 text-[12px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 rounded-md flex items-center gap-1.5 transition-colors shadow-sm">
                     <PauseCircle className="w-4 h-4" /> LIGAR ROBÔ
                   </button>
                )}

                {activeChat.status_chat !== 'fechado' && (
                  <div className="flex items-center bg-slate-100 dark:bg-[#27272A] rounded-lg p-0.5 ml-1">
                    <button onClick={() => {
                        updateLeadChatStatus(activeChat.id, 'fechado');
                        toggleBot(activeChat.id, true);
                    }} className="px-3 py-1.5 text-[13px] font-semibold text-white bg-[#3B82F6] hover:bg-blue-600 transition-colors rounded-md shadow-sm">
                      Encerrar e Religar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mensagens Scroll */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 custom-scrollbar">
              
              {/* Chat Bubbles */}
              <div className="flex flex-col space-y-6 lg:space-y-8">
                {activeChat.mensagens.map(m => (
                   <div key={m.id} className={`flex w-full ${m.sender !== 'paciente' ? 'justify-end pl-12' : 'justify-start pr-12'}`}>
                     
                     <div className={`flex items-end gap-2 max-w-[80%] ${m.sender !== 'paciente' ? 'flex-row-reverse' : 'flex-row'}`}>
                       {/* Avatar do Mensageiro */}
                       <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-[#27272A] flex shrink-0 items-center justify-center text-[9px] font-black text-slate-500 dark:text-white ml-2 overflow-hidden border border-slate-300 dark:border-[#3F3F46]">
                         {m.sender === 'paciente' ? (
                            activeChat.foto ? <img src={activeChat.foto} className="w-full h-full object-cover"/> : <span className="text-slate-500 dark:text-slate-400">{activeChat.nome.substring(0,2)}</span>
                         ) : (
                            m.sender === 'humano' ? 'LM' : <Bot className="w-3.5 h-3.5 text-[#3B82F6]" />
                         )}
                       </div>

                       <div className="flex flex-col">
                         <div className={`flex items-end gap-2 mb-1 ${m.sender !== 'paciente' ? 'justify-end' : 'justify-start'}`}>
                           <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{m.sender === 'paciente' ? activeChat.nome : (m.sender === 'humano' ? 'Lucas Moreira' : 'Robô IA')}</span>
                           <span className="text-[10px] text-slate-400 dark:text-slate-500">{m.time}</span>
                         </div>
                         <div className={`p-3.5 rounded-2xl shadow-sm text-[14px] leading-relaxed ${
                            m.sender !== 'paciente' 
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-100 dark:bg-[#1E293B] dark:text-slate-200 dark:border-[#334155] rounded-br-sm' 
                              : 'bg-white text-slate-800 border border-slate-200 dark:bg-[#27272A] dark:text-slate-200 dark:border-[#3F3F46] rounded-bl-sm'
                          }`}>
                           {m.text}
                         </div>
                       </div>
                     </div>

                   </div>
                ))}
              </div>
            </div>

            {/* Input Box */}
            {activeChat.status_chat !== 'fechado' ? (
              <div className="p-4 bg-white dark:bg-[#09090A] border-t border-slate-200 dark:border-[#27272A] shrink-0">
                <div className="bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-[#27272A] rounded-2xl p-3 focus-within:border-[#3B82F6] transition-colors shadow-inner flex flex-col">
                  
                  {/* Tabs na parte superior do Input */}
                  <div className="flex items-center gap-1 mb-2 border-b border-slate-200 dark:border-[#27272A]/50 pb-2">
                    <button 
                      onClick={() => setEditorMode('responder')}
                      className={`px-3 py-1 text-[12px] font-bold rounded-lg transition-colors ${editorMode === 'responder' ? 'bg-white dark:bg-[#27272A] text-slate-800 dark:text-white shadow-sm dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#27272A]/50'}`}
                    >
                      Responder
                    </button>
                    <button 
                      onClick={() => setEditorMode('privada')}
                      className={`px-3 py-1 text-[12px] font-bold rounded-lg transition-colors ${editorMode === 'privada' ? 'bg-white dark:bg-[#27272A] text-slate-800 dark:text-white shadow-sm dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#27272A]/50'}`}
                    >
                      Mensagem Privada
                    </button>
                  </div>

                  <form className="flex flex-col w-full">
                    <textarea 
                      value={msgText}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Shift + enter para nova linha. Digite '/' para selecionar uma Resposta Pronta." 
                      className={`w-full bg-transparent border-none text-[14px] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 resize-none min-h-[60px] max-h-[150px] overflow-y-auto mb-2 ${editorMode === 'privada' ? 'text-amber-600 dark:text-amber-400 placeholder:text-amber-600/50 dark:placeholder:text-amber-600/50' : ''}`}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button type="button" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#27272A] transition-colors"><Smile className="w-4 h-4" /></button>
                        <button type="button" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#27272A] transition-colors"><Paperclip className="w-4 h-4" /></button>
                        <button type="button" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#27272A] transition-colors"><Mic className="w-4 h-4" /></button>
                        <button type="button" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#27272A] transition-colors"><Wand2 className="w-4 h-4" /></button>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => handleSend()}
                        className={`px-4 py-2 rounded-lg flex items-center justify-center text-[13px] font-bold transition-all ${
                          msgText.trim().length > 0 
                            ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[#3B82F6]/20 shadow-lg' 
                            : 'bg-slate-200 dark:bg-[#27272A] text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Enviar (↵)
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
