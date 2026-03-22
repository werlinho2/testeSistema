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

const COLUMNS: { id: FunilStatus; title: string }[] = [
  { id: "novo_contato", title: "Novos Contatos" },
  { id: "ia_atendendo", title: "IA Atendendo" },
  { id: "qualificado", title: "Qualificados" },
  { id: "agendado", title: "Agendados" },
  { id: "perdido", title: "Perdidos" },
]

export function Board({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
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

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveLead = active.data.current?.type === "Lead"
    const isOverLead = over.data.current?.type === "Lead"
    const isOverColumn = over.data.current?.type === "Column"

    if (!isActiveLead) return

    setLeads((prev) => {
      const activeIndex = prev.findIndex((l) => l.id === activeId)
      const overIndex = prev.findIndex((l) => l.id === overId)

      if (isOverColumn) {
        const activeLead = prev[activeIndex]
        activeLead.status_funil = overId as FunilStatus
        return [...prev.slice(0, activeIndex), ...prev.slice(activeIndex + 1), activeLead]
      }

      if (isOverLead) {
        const activeLead = prev[activeIndex]
        activeLead.status_funil = prev[overIndex].status_funil
        const newLeads = [...prev]
        newLeads.splice(activeIndex, 1)
        newLeads.splice(overIndex, 0, activeLead)
        return newLeads
      }

      return prev
    })
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
