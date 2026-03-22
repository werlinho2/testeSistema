import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Lead, FunilStatus } from "@/types"
import { LeadCard } from "./LeadCard"

interface ColumnProps {
  id: FunilStatus
  title: string
  leads: Lead[]
}

export function Column({ id, title, leads }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "Column", id },
  })

  return (
    <div className="flex w-80 flex-col shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-medium text-sm text-foreground">{title}</h3>
        <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
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
