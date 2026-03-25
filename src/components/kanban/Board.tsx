"use client"

import { useState } from "react"
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Lead, FunilStatus } from "@/types"
import { Column } from "./Column"
import { LeadCard } from "./LeadCard"
import { useCRMContext } from "@/contexts/CRMContext"

const COLUMNS: { id: FunilStatus; title: string; subtitle?: string }[] = [
  { id: "novo_lead", title: "Novo Lead", subtitle: "(Primeiro Contato)" },
  { id: "qualificado", title: "Qualificado", subtitle: "(IA coletando informações)" },
  { id: "agendado", title: "Agendado", subtitle: "(Pendente confirmação)" },
  { id: "confirmado", title: "Confirmado", subtitle: "(Paciente confirmou presença)" },
  { id: "compareceu", title: "Compareceu", subtitle: "(Paciente compareceu à consulta)" },
  { id: "no_show", title: "No-show", subtitle: "(Paciente não compareceu)" },
  { id: "perdido", title: "Perdido", subtitle: "(Paciente Cancelou/Não respondeu)" },
  { id: "pos_venda", title: "Pós-Venda", subtitle: "(Follow-up pós-consulta)" }
]

export function Board() {
  const { leads, updateLeadStatus } = useCRMContext()
  const [activeLead, setActiveLead] = useState<Lead | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const lead = leads.find((l) => l.id === active.id)
    if (lead) setActiveLead(lead)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id

    if (activeId === overId) return

    const isOverColumn = over.data.current?.type === "Column"
    const isOverLead = over.data.current?.type === "Lead"

    if (isOverColumn) {
      updateLeadStatus(activeId, overId as FunilStatus)
      return
    }

    if (isOverLead) {
      const overLeadStatus = leads.find((l) => l.id === overId)?.status_funil
      if (overLeadStatus) {
        updateLeadStatus(activeId, overLeadStatus)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveLead(null)
  }

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <Column 
            key={col.id} 
            id={col.id} 
            title={col.title} 
            subtitle={col.subtitle}
            leads={leads.filter((l) => l.status_funil === col.id)} 
          />
        ))}
      </div>
      <DragOverlay>
        {activeLead ? <LeadCard lead={activeLead} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
