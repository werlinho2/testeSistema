import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Lead, FunilStatus } from "@/types"
import { LeadCard } from "./LeadCard"

interface ColumnProps {
  id: FunilStatus
  title: string
  subtitle?: string
  leads: Lead[]
}

export function Column({ id, title, subtitle, leads }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "Column", id },
  })

  return (
    <div className="flex w-[340px] flex-col shrink-0">
      <div className="flex items-start justify-between mb-4 px-1.5 pt-1">
        <div>
          <h3 className="font-extrabold text-[15px] text-slate-800 leading-none mb-1.5 uppercase tracking-tight">{title}</h3>
          {subtitle && <p className="text-[11.5px] font-semibold text-slate-500 leading-tight">{subtitle}</p>}
        </div>
        <span className="text-[11px] font-black bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md shadow-sm shrink-0">
          {leads.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-3 min-h-[500px] h-full rounded-xl p-3 transition-colors ${
          isOver ? "bg-muted/80 ring-2 ring-primary/20" : "bg-muted/40"
        }`}
      >
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        {leads.length === 0 && (
          <div className="text-xs text-muted-foreground/50 text-center mt-4">Nenhum lead</div>
        )}
      </div>
    </div>
  )
}
