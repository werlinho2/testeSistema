"use client"

import { useState } from "react"
import { Megaphone, Search, Filter, Facebook, Chrome, MousePointerClick, Users, DollarSign, TrendingUp, Activity, PauseCircle, PlayCircle, Plus } from "lucide-react"

const INITIAL_CAMPANHAS = [
  { id: 1, nome: "Meta Ads: Invisalign SP Centro", canal: "Meta Ads (IG/FB)", gasto: 2450.00, leads: 145, cpl: 16.89, status: true, icon: Facebook, color: "fuchsia" },
  { id: 2, nome: "Google Search: Urgência Dental", canal: "Google Search Ads", gasto: 1800.00, leads: 82, cpl: 21.95, status: true, icon: Chrome, color: "blue" },
  { id: 3, nome: "Meta Ads: Clareamento Promocional", canal: "Meta Ads (IG)", gasto: 600.00, leads: 50, cpl: 12.00, status: false, icon: Facebook, color: "fuchsia" }
]

export default function CampanhasAdsPage() {
  const [campanhas, setCampanhas] = useState(INITIAL_CAMPANHAS)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleStatus = (id: number) => {
    setCampanhas(prev => prev.map(c => c.id === id ? { ...c, status: !c.status } : c))
  }

  const filteredCampanhas = campanhas.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const totalGasto = campanhas.reduce((acc, c) => c.status ? acc + c.gasto : acc, 0)
  const totalLeads = campanhas.reduce((acc, c) => c.status ? acc + c.leads : acc, 0)
  const cplMedio = totalLeads > 0 ? (totalGasto / totalLeads) : 0

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col relative h-[90vh] overflow-hidden">
      
      {/* Header Central */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 px-2 mt-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Gestão de Tráfego (Ads)</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Controle as campanhas de marketing ativo e observe a integração com o N8n preenchendo o CRM Kanban.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shrink-0 border border-slate-200 shadow-sm relative">
             <input 
               type="text"
               placeholder="Buscar conta ad..."
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="pl-4 pr-10 py-2.5 outline-none rounded-lg text-sm font-semibold w-[220px]"
             />
             <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 font-bold" />
        </div>
      </div>

      {/* Primary Global KPIs for Marketing */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0 px-2 mt-2">
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><DollarSign className="w-16 h-16 text-white"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-emerald-400 mb-1 relative z-10 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5"/> Gasto Atual (Ativo)</p>
           <h3 className="text-[26px] font-black text-white leading-none mb-3 relative z-10">R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
           <span className="text-[11px] font-bold text-slate-400 relative z-10">Ciclo de faturamento: Mensal</span>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="w-16 h-16 text-indigo-900"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-1 relative z-10 flex items-center gap-1.5"><Users className="w-3.5 h-3.5"/> Leads Aquecidos Gerados</p>
           <h3 className="text-[26px] font-black text-slate-800 leading-none mb-3 relative z-10">{totalLeads}</h3>
           <span className="text-[11px] font-bold text-slate-500 relative z-10 tracking-wide">Injetados no Pipeline de Vendas</span>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5"><MousePointerClick className="w-16 h-16 text-[#0095ff]"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-1 relative z-10 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5"/> Custo Por Lead (CPL)</p>
           <h3 className="text-[26px] font-black text-slate-800 leading-none mb-3 relative z-10">R$ {cplMedio.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
           <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black text-[#0095ff] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 relative z-10">Média Global Excelênte</span>
         </div>

         <div className="bg-gradient-to-br from-fuchsia-600 to-rose-500 p-6 rounded-2xl shadow-md relative overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-fuchsia-500/30 transition-shadow">
           <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
           <div className="flex flex-col items-center justify-center h-full relative z-10 text-center text-white">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 outline outline-2 outline-white/30"><Plus className="w-6 h-6"/></div>
              <h4 className="font-extrabold text-[15px]">Integrar Nova Fonte</h4>
              <p className="text-[11px] uppercase tracking-widest font-bold text-fuchsia-100 mt-0.5 opacity-90">TikTok Ads / LinkedIn</p>
           </div>
         </div>
      </div>

      {/* Tabela Viva Interativa de Fontes */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col flex-1 overflow-hidden h-full mx-2 mb-4">
        <div className="p-6 border-b border-slate-100 bg-[#F8FAFC]/50 flex justify-between items-center">
            <h3 className="text-[15px] font-extrabold text-slate-800">Canais de Aquisição Sincronizados (N8n View)</h3>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">{filteredCampanhas.length} Sincronizados</span>
        </div>
        <div className="overflow-auto flex-1 p-2">
          <div className="space-y-3 p-4">
            {filteredCampanhas.map((campanha) => (
               <div key={campanha.id} className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${campanha.status ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200/50 opacity-70 grayscale'}`}>
                  
                  {/* Avatar/Ícone do Motor de Adesão */}
                  <div className="flex items-center gap-5 w-[35%]">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${campanha.color === 'fuchsia' ? 'bg-fuchsia-50 text-fuchsia-500 border border-fuchsia-100' : 'bg-blue-50 text-[#0095ff] border border-blue-100'}`}>
                        <campanha.icon className="w-6 h-6 outline-none border-none"/>
                     </div>
                     <div>
                        <h4 className="font-extrabold text-[15.5px] text-slate-800 leading-tight mb-1">{campanha.nome}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">{campanha.canal}</span>
                     </div>
                  </div>

                  {/* Detalhes Fiscais Mapeados */}
                  <div className="w-[45%] flex items-center justify-around px-8 border-x border-slate-100/80">
                      <div className="text-center">
                         <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Gastos Mês</p>
                         <p className="font-extrabold text-[15px] text-slate-700">R$ {campanha.gasto.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Leads Form</p>
                         <p className="font-extrabold text-[15px] text-indigo-600">{campanha.leads} un</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Custo/Lead</p>
                         <p className="font-extrabold text-[15px] text-emerald-600">R$ {campanha.cpl}</p>
                      </div>
                  </div>

                  {/* Status Toggle Engine */}
                  <div className="w-[20%] flex items-center justify-end px-4 gap-4">
                     <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md border ${campanha.status ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        {campanha.status ? 'Tráfego Ativo' : 'Pausada'}
                     </span>
                     <button 
                       onClick={() => toggleStatus(campanha.id)} 
                       className={`p-2.5 rounded-full transition-transform hover:scale-110 shadow-sm ${campanha.status ? 'bg-rose-50 text-rose-500 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-500 bg-emerald-[#0095ff]/10 hover:bg-emerald-100'}`}
                     >
                       {campanha.status ? <PauseCircle className="w-6 h-6" strokeWidth={2.5}/> : <PlayCircle className="w-6 h-6" strokeWidth={2.5}/>}
                     </button>
                  </div>
               </div>
            ))}
            {filteredCampanhas.length === 0 && (
               <div className="text-center py-10 text-slate-400 font-bold">Nenhuma campanha interceptada com este nome.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
