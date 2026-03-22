"use client"

import { useState } from "react"
import { Search, ScrollText, ShieldAlert, CheckCircle, Edit, Trash2, UserPlus, Fingerprint, Activity, Clock, SlidersHorizontal, ArrowDown } from "lucide-react"

const MOCK_LOGS = [
  { id: 101, user: "Werlinho (Engenharia)", role: "God Mode", action: "Configuração de Ambiente", detail: "As chaves globais da plataforma e o JWT da API Supabase foram alterados.", type: "system", date: "Há 10 minutos", time: "10:45", icon: Fingerprint, color: "indigo" },
  { id: 102, user: "Dra. Odonto Fav", role: "Administradora Chefe", action: "Pausa Fical do Tráfego Ads", detail: "Cortou orçamentos e pausou a campanha 'Clareamento Promocional'.", type: "edit", date: "Hoje", time: "09:12", icon: Edit, color: "fuchsia" },
  { id: 103, user: "Dra. Odonto Fav", role: "Administradora Chefe", action: "Treinamento do Cérebro RAG", detail: "Modificou as restrições linguísticas e restrições médicas do 'Clareamento a Laser'.", type: "edit", date: "Ontem", time: "18:30", icon: Activity, color: "emerald" },
  { id: 104, user: "Fernanda Mello", role: "Dentista Especialista", action: "Encerramento de Consulta", detail: "Marcou a ficha clínica de 'Carolina Mendes' como sessão finalizada com sucesso.", type: "success", date: "Ontem", time: "16:15", icon: CheckCircle, color: "emerald" },
  { id: 105, user: "João Paulo", role: "Recepcionista Clínico", action: "Movimentação CRM", detail: "Transacionou o Lead 'Marcos Viana' para a fase de 'Apresentação Clínica'.", type: "create", date: "Ontem", time: "14:00", icon: UserPlus, color: "blue" },
  { id: 106, user: "AI Gateway (N8n)", role: "Motor Ominichannel", action: "Disparo Automático", detail: "Acionou Triagem baseada em IA de 4 interações com o lead MetaAds '@carla_32'.", type: "system", date: "19 de Março", time: "11:20", icon: ShieldAlert, color: "amber" },
  { id: 107, user: "João Paulo", role: "Recepcionista Clínico", action: "Suspensão de Ficha", detail: "Deletou o histórico de exames de rastreio de um paciente teste.", type: "delete", date: "18 de Março", time: "08:15", icon: Trash2, color: "rose" },
]

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState('todos')

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.detail.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'todos' || log.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[90vh] flex flex-col relative overflow-hidden">
      {/* Header Central */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mt-2 px-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none flex items-center gap-2">
             <ScrollText className="w-7 h-7 text-[#0095ff]" strokeWidth={2.5}/> Trilha de Auditoria (Logs)
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Histórico implacável. Toda mutação de banco de dados e ações de colaboradores são registradas em tempo real.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner">
             <button onClick={()=>setFilterType('todos')} className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${filterType==='todos'?'bg-white shadow-sm text-slate-800':'text-slate-400'}`}>Tudo</button>
             <button onClick={()=>setFilterType('system')} className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${filterType==='system'?'bg-indigo-500 shadow-sm shadow-indigo-500/20 text-white':'text-slate-400'}`}>Engine Dev</button>
             <button onClick={()=>setFilterType('edit')} className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${filterType==='edit'?'bg-fuchsia-500 shadow-sm shadow-fuchsia-500/20 text-white':'text-slate-400'}`}>Edições Base</button>
          </div>
        </div>
      </div>

      {/* Busca e Barra Rápida */}
      <div className="px-2 shrink-0">
         <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 font-bold" />
             <input 
               type="text" 
               placeholder="Buscar ator, data ou string do evento logístico..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl text-[14px] font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] transition-all"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-300">
                <SlidersHorizontal className="w-4 h-4"/>
             </div>
          </div>
      </div>

      {/* Relatório Visual Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col flex-1 overflow-hidden h-full mx-2 mb-4">
        <div className="p-6 border-b border-slate-100 bg-[#F8FAFC]/50 flex justify-between items-center shadow-inner">
            <h3 className="text-[14px] font-extrabold text-slate-800 flex items-center gap-2">
               <Clock className="w-4 h-4 text-[#0095ff]"/> Timeline de Injeções no BD
            </h3>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
               Exibindo {filteredLogs.length} Entradas
            </span>
        </div>
        
        <div className="overflow-y-auto flex-1 p-8 bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-opacity-[0.015] bg-cover bg-blend-multiply relative">
          
          <div className="absolute left-[59px] top-8 bottom-8 w-0.5 bg-slate-200/60 rounded-full hidden md:block z-0"></div>

          {filteredLogs.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
                <ScrollText className="w-12 h-12 opacity-30"/>
                <p className="font-extrabold text-[14px]">Nenhum Log Encontrado</p>
             </div>
          ) : (
             <div className="space-y-6 relative z-10 max-w-4xl">
               {filteredLogs.map((log) => (
                  <div key={log.id} className="flex flex-col md:flex-row gap-4 md:gap-6 group hover:-translate-y-0.5 transition-transform duration-300">
                     
                     {/* Célula do Tempo Fixo Esquerda */}
                     <div className="w-[120px] shrink-0 md:text-right pt-2.5">
                        <span className="block text-[13px] font-black text-slate-800">{log.time}</span>
                        <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-0.5">{log.date}</span>
                     </div>
                     
                     {/* Nó da Timeline e Ícone Action */}
                     <div className="relative shrink-0 hidden md:flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 ${log.color === 'indigo' ? 'bg-indigo-500 shadow-indigo-500/30' : log.color === 'fuchsia' ? 'bg-fuchsia-500 shadow-fuchsia-500/30' : log.color === 'emerald' ? 'bg-emerald-500 shadow-emerald-500/30' : log.color === 'blue' ? 'bg-[#0095ff] shadow-[#0095ff]/30' : log.color === 'amber' ? 'bg-amber-500 shadow-amber-500/30' : 'bg-rose-500 shadow-rose-500/30'}`}>
                           <log.icon className="w-5 h-5 text-white" strokeWidth={2.5}/>
                        </div>
                     </div>

                     {/* Card Rico de Evento */}
                     <div className={`flex-1 bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-[0_2px_15px_rgba(0,0,0,0.03)] group-hover:border-${log.color}-300 transition-colors relative overflow-hidden`}>
                        {/* Avatarzinho minimalista Autor */}
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-[10px] border border-slate-200/60 overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${log.user.split(" ")[0]}&backgroundColor=f8fafc`} className="w-full h-full opacity-80" />
                           </div>
                           <div>
                              <p className="text-[13px] font-extrabold text-slate-800 leading-none">{log.user}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{log.role}</p>
                           </div>
                        </div>

                        {/* Conteudo Payload */}
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                           <h4 className="text-[14px] font-extrabold text-slate-800 mb-1.5 uppercase tracking-wider">{log.action}</h4>
                           <p className="text-[13.5px] font-semibold text-slate-600 leading-relaxed">{log.detail}</p>
                        </div>
                     </div>
                  </div>
               ))}
             </div>
          )}
          
          {filteredLogs.length > 0 && (
             <div className="flex justify-center mt-10 relative z-10">
                <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm transition-all hover:shadow-md">
                   <ArrowDown className="w-3.5 h-3.5"/> Carregar Registros Antigos
                </button>
             </div>
          )}

        </div>
      </div>
    </div>
  )
}
