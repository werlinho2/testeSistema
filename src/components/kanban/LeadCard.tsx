import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Lead } from "@/types"
import Link from "next/link"
import { Badge } from "../ui/Badge"
import { GripVertical, Instagram, MessageCircle, Bot } from "lucide-react"

interface LeadCardProps {
  lead: Lead
}

export function LeadCard({ lead }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
    data: { type: "Lead", lead },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex flex-col gap-3 rounded-xl border bg-white p-3.5 shadow-sm transition-all ${
        isDragging ? "opacity-30 border-primary scale-105 z-50 ring-2 ring-primary/20 shadow-xl" : "opacity-100 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-slate-100 p-1 rounded-md -ml-2 -mt-1 text-slate-400 self-center"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          
          <div className="relative shrink-0">
             {lead.foto ? (
                <img src={lead.foto} alt={lead.nome} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
             ) : (
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                  {lead.nome.substring(0,2)}
                </div>
             )}
             <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                {lead.canal === 'whatsapp' ? <MessageCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> : <Instagram className="w-3.5 h-3.5 text-fuchsia-500 fill-fuchsia-500" />}
             </div>
          </div>

          <div className="flex flex-col ml-1">
            <Link href={`/dashboard/atendimentos`} className="font-extrabold text-[#0095ff] hover:text-[#007acc] hover:underline text-[12px] uppercase tracking-widest transition-colors" onPointerDown={(e) => e.stopPropagation()}>
              Conversa #{lead.id}
            </Link>
            <span className="text-[13.5px] font-bold text-slate-800 leading-tight mt-0.5">{lead.nome}</span>
          </div>
        </div>
        {lead.tag_prioridade && (
          <Badge variant="destructive" className="bg-rose-100 text-rose-600 border border-rose-200 hover:bg-rose-200 text-[9px] px-1.5 py-0.5 rounded-md uppercase font-black uppercase tracking-widest">
            Urgente
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 p-1.5 rounded-lg w-max ml-6">
        <span className="text-[10px] font-bold text-slate-600">Alvo:</span>
        <span className="text-[11px] font-black text-slate-900 bg-white px-2 py-0.5 rounded-md shadow-sm border border-slate-200">
           {lead.tratamento_interesse}
        </span>
      </div>

      {lead.resumo_ia && (
        <div className="mt-1 flex gap-2 items-start bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
          <Bot className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-amber-900/80 font-medium">
            <span className="font-bold text-amber-700 block mb-0.5">Visão da IA:</span>
            {lead.resumo_ia}
          </p>
        </div>
      )}
    </div>
  )
}
