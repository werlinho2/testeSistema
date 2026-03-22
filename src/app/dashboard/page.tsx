"use client"

import { useState } from "react"
import { DollarSign, ArrowUpRight, ArrowDownRight, Users, Activity, Target } from "lucide-react"
import { LeadsOriginChart } from "@/components/admin/LeadsOriginChart"

export default function DashboardRootPage() {
  const [timeRange, setTimeRange] = useState<'hoje' | '7' | '30'>('30')

  // Mocked state dynamics to prove interactivity
  const DATA_STATE = {
     '30': { fat: "48.500", fatPerc: "+12%", fatDir: "up", base: "1.248", baseNew: "45", cons: "382", canc: "5", cac: "35,00", raw: [...Array(350).fill({ origem_lead: 'WhatsApp API' }), ...Array(230).fill({ origem_lead: 'Instagram Direct' }), ...Array(80).fill({ origem_lead: 'Tráfego Pago' })] },
     '7': { fat: "12.400", fatPerc: "+3%", fatDir: "up", base: "1.215", baseNew: "12", cons: "85", canc: "1", cac: "38,50", raw: [...Array(95).fill({ origem_lead: 'WhatsApp API' }), ...Array(40).fill({ origem_lead: 'Instagram Direct' }), ...Array(10).fill({ origem_lead: 'Tráfego Pago' })] },
     'hoje': { fat: "1.850", fatPerc: "-1%", fatDir: "down", base: "1.205", baseNew: "2", cons: "14", canc: "0", cac: "42,10", raw: [...Array(12).fill({ origem_lead: 'WhatsApp API' }), ...Array(5).fill({ origem_lead: 'Instagram Direct' })] }
  }

  const current = DATA_STATE[timeRange]

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[90vh] flex flex-col relative overflow-y-auto pb-10 pr-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mt-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Visão Global da Clínica</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Você está no Cockpit Principal. Observe as métricas sendo filtradas reativamente.</p>
        </div>
        <div className="flex bg-slate-200/50 p-1.5 rounded-xl shrink-0 border border-slate-200 shadow-inner">
           <button onClick={() => setTimeRange('hoje')} className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${timeRange === 'hoje' ? 'bg-[#0095ff] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>Hoje</button>
           <button onClick={() => setTimeRange('7')} className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${timeRange === '7' ? 'bg-[#0095ff] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>7 Dias</button>
           <button onClick={() => setTimeRange('30')} className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${timeRange === '30' ? 'bg-[#0095ff] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>30 Dias</button>
        </div>
      </div>

      {/* Primary Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0 mt-2">
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><DollarSign className="w-16 h-16 text-white"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-1 relative z-10">Faturamento Líquido</p>
           <h3 className="text-[26px] font-black text-white leading-none mb-3 relative z-10">R$ {current.fat}</h3>
           <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${current.fatDir==='up'?'text-emerald-400 bg-emerald-500/10':'text-rose-400 bg-rose-500/10'}`}>
              {current.fatDir==='up'?<ArrowUpRight className="w-3 h-3"/>:<ArrowDownRight className="w-3 h-3"/>} {current.fatPerc}
           </span>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden hover:-translate-y-0.5 transition-transform">
           <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="w-16 h-16 text-slate-900"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-1 relative z-10">Pacientes Base</p>
           <h3 className="text-[26px] font-black text-slate-800 leading-none mb-3 relative z-10">{current.base}</h3>
           <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full"><ArrowUpRight className="w-3 h-3"/> {current.baseNew} listados</span>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden hover:-translate-y-0.5 transition-transform">
           <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-16 h-16 text-slate-900"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-1 relative z-10">Consultas</p>
           <h3 className="text-[26px] font-black text-slate-800 leading-none mb-3 relative z-10">{current.cons}</h3>
           <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${Number(current.canc)===0?'text-slate-400 bg-slate-100':'text-rose-500 bg-rose-50'}`}>
              <ArrowDownRight className="w-3 h-3"/> {current.canc} faltas 
           </span>
         </div>

         <div className="bg-gradient-to-tr from-[#0095ff] to-indigo-500 p-6 rounded-2xl shadow-md relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-20"><Target className="w-16 h-16 text-white"/></div>
           <p className="text-[11px] uppercase tracking-widest font-black text-indigo-100 mb-1 relative z-10">CAC Médio</p>
           <h3 className="text-[26px] font-black text-white leading-none mb-3 relative z-10">R$ {current.cac}</h3>
           <span className="inline-flex items-center gap-1 text-[10px] font-black text-white/90 uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full border border-white/30">Custo p/ Aquisição</span>
         </div>
      </div>

      {/* Gráfico Analítico de Leads Importado da Fase 2 */}
      <div className="flex-1 min-h-[440px] mt-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h3 className="text-lg font-extrabold text-slate-800 mb-4">Volume e Origem de Captação Qualificada</h3>
        <div className="h-[320px] w-full">
           <LeadsOriginChart rawData={current.raw} />
        </div>
      </div>

    </div>
  )
}
