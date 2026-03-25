import { Board } from "@/components/kanban/Board"

export default function KanbanPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Kanban de Leads</h2>
        <p className="text-muted-foreground">Gerencie o fluxo de atendimento em tempo real.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <Board />
      </div>
    </div>
  )
}
