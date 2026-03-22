import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Lead } from "@/types"
import Link from "next/link"
import { Badge } from "../ui/Badge"
import { GripVertical } from "lucide-react"

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
      className={`relative flex flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm ${
        isDragging ? "opacity-30 border-primary" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-muted p-1 rounded -ml-2 -mt-1 text-muted-foreground"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <Link href={`/dashboard/pacientes/${lead.id}`} className="font-bold text-[#0095ff] hover:text-[#007acc] hover:underline text-[13px] transition-colors" onPointerDown={(e) => e.stopPropagation()}>
            {lead.nome}
          </Link>
        </div>
        {lead.tag_prioridade && (
          <Badge variant="destructive" className="text-[10px] px-1.5 py-0">High-Ticket</Badge>
        )}
      </div>
      <div className="text-xs text-muted-foreground pl-6">
        <p>Tratamento: {lead.tratamento_interesse}</p>
      </div>
    </div>
  )
}
