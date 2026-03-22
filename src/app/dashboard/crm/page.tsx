"use client"
import React, { useState } from "react"
import { Target, GripVertical, Phone, DollarSign, Plus, Megaphone, TrendingUp } from "lucide-react"

type ColunaId = "new" | "contacted" | "presentation" | "closed"
type Lead = { id: string, name: string, value: string, tags: string[], phone: string }
type Colunas = Record<ColunaId, { name: string, color: string, border: string, bg: string, leads: Lead[] }>

const INITIAL_KANBAN: Colunas = {
  "new": { 
    name: "Leads Recentes (Descoberta)", color: "blue-500", border: "border-blue-200", bg: "bg-blue-50",
    leads: [ 
        { id: "l1", name: "Marcos Viana", value: "4.500", tags: ['Lente de Contato'], phone: "(11) 9888-7777" },
        { id: "l2", name: "Patrícia Alves", value: "1.200", tags: ['Clareamento'], phone: "(11) 9999-0000" } 
    ] 
  },
  "contacted": { 
    name: "Em Contato (N8n)", color: "amber-500", border: "border-amber-200", bg: "bg-amber-50",
    leads: [ 
        { id: "l3", name: "Julian Cardoso", value: "800", tags: ['Limpeza'], phone: "(21) 9777-1111" } 
    ] 
  },
  "presentation": { 
    name: "Apresentação Clínica", color: "fuchsia-500", border: "border-fuchsia-200", bg: "bg-fuchsia-50",
    leads: [ 
        { id: "l4", name: "Carolina Mendes", value: "18.000", tags: ['Invisalign'], phone: "(31) 9444-2222" } 
    ] 
  },
  "closed": { 
    name: "Contratos Fechados", color: "emerald-500", border: "border-emerald-200", bg: "bg-emerald-50",
    leads: [ 
        { id: "l5", name: "Fernando Souza", value: "12.000", tags: ['Implante'], phone: "(11) 9111-3333" } 
    ] 
  }
}

export default function CRMKanbanPage() {
  const [board, setBoard] = useState(INITIAL_KANBAN)
  const [draggedLead, setDraggedLead] = useState<{lead: Lead, sourceCol: ColunaId} | null>(null)

  const handleDragStart = (e: React.DragEvent, lead: Lead, sourceCol: ColunaId) => {
    setDraggedLead({ lead, sourceCol })
    // Efeito Ghost
    e.currentTarget.classList.add("opacity-50", "scale-95")
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50", "scale-95")
    setDraggedLead(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // Importante para permitir o onDrop
  }

  const handleDrop = (e: React.DragEvent, targetCol: ColunaId) => {
    e.preventDefault()
    if (!draggedLead) return
    if (draggedLead.sourceCol === targetCol) return

    setBoard(prev => {
        const sourceLeads = prev[draggedLead.sourceCol].leads.filter(l => l.id !== draggedLead.lead.id)
        const targetLeads = [...prev[targetCol].leads, draggedLead.lead]
        
        return {
            ...prev,
            [draggedLead.sourceCol]: { ...prev[draggedLead.sourceCol], leads: sourceLeads },
            [targetCol]: { ...prev[targetCol], leads: targetLeads }
        }
    })
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 px-4">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none flex items-center gap-2">
             <Target className="w-6 h-6 text-[#0095ff]" strokeWidth={3}/> Pipeline de Vendas (CRM)
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Mova os Leads através do ciclo até fecharem o tratamento.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shrink-0 border border-slate-200 shadow-sm">
           <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all bg-[#0095ff] text-white shadow-md">
             <Plus className="w-3.5 h-3.5"/> Cadastrar Novo Lead
           </button>
        </div>
      </div>
      
      {/* Funil de Receita Esperada */}
      <div className="px-4 shrink-0 flex gap-4">
         <div className="bg-slate-900 px-5 py-3 rounded-xl border border-slate-800 flex items-center gap-4 text-white hover:scale-105 transition-transform cursor-default shadow-lg shadow-slate-900/20">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center"><TrendingUp className="w-5 h-5 text-[#0095ff]"/></div>
            <div>
               <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Pipeline Potencial Global</p>
               <h4 className="text-[22px] font-black leading-none mt-0.5">R$ 36.500</h4>
            </div>
         </div>
      </div>

      {/* Board Visual Moderno */}
      <div className="flex-1 overflow-x-auto pb-6 px-4">
        <div className="flex gap-6 h-full min-w-max items-start">
          {(Object.keys(board) as ColunaId[]).map((colId) => {
            const coluna = board[colId]
            
            return (
              <div 
                key={colId}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, colId)}
                className={`w-[320px] shrink-0 h-full flex flex-col bg-slate-100/50 rounded-2xl border ${coluna.border} relative overflow-hidden transition-colors ${draggedLead && draggedLead.sourceCol !== colId ? 'hover:bg-slate-200/50 hover:border-dashed hover:border-slate-400' : ''}`}
              >
                 {/* Column Header */}
                 <div className={`px-5 py-4 ${coluna.bg} border-b ${coluna.border} flex justify-between items-center sticky top-0 z-10`}>
                    <h3 className={`text-[13px] font-black uppercase tracking-widest text-${coluna.color}`}>{coluna.name}</h3>
                    <span className={`bg-white px-2.5 py-0.5 rounded-full text-[11px] font-bold text-${coluna.color} shadow-sm border ${coluna.border}`}>
                       {coluna.leads.length}
                    </span>
                 </div>
                 
                 {/* Cards Area */}
                 <div className="flex-1 p-3 overflow-y-auto space-y-3 relative z-0">
                    {coluna.leads.map(lead => (
                       <div 
                         key={lead.id}
                         draggable
                         onDragStart={(e) => handleDragStart(e, lead, colId)}
                         onDragEnd={handleDragEnd}
                         className={`bg-white p-4 rounded-xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.03)] cursor-grab hover:shadow-md hover:border-${coluna.color.replace('text-', '')} transition-all group active:cursor-grabbing`}
                       >
                          <div className="flex justify-between items-start mb-2.5">
                             <div className="flex items-center gap-1.5 focus:outline-none">
                                <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors cursor-grab" />
                                <h4 className="font-extrabold text-[15px] text-slate-800">{lead.name}</h4>
                             </div>
                          </div>
                          <div className="ml-5 space-y-2.5">
                             <div className="flex flex-wrap gap-1.5">
                                {lead.tags.map(tag => (
                                   <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black tracking-widest uppercase border border-slate-200">
                                      {tag}
                                   </span>
                                ))}
                             </div>
                             <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                                <span className="flex items-center gap-1 text-[11.5px] font-bold text-slate-500">
                                   <Phone className="w-3.5 h-3.5"/> {lead.phone}
                                </span>
                                <span className="flex items-center text-[13px] font-black text-emerald-600">
                                   R$ {lead.value}
                                </span>
                             </div>
                          </div>
                       </div>
                    ))}
                    
                    {/* Add Lead Button at bottom of column */}
                    <button className="w-full py-3 mt-2 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-[12px] uppercase tracking-widest hover:border-slate-300 hover:bg-white hover:text-slate-600 transition-all flex justify-center items-center gap-1.5">
                       <Plus className="w-4 h-4" strokeWidth={3}/> Adicionar
                    </button>
                    {coluna.leads.length === 0 && (
                       <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none">
                          <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Coluna Vazia</p>
                       </div>
                    )}
                 </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
