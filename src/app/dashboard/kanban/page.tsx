import { Board } from "@/components/kanban/Board"
import { Lead } from "@/types"

const MOCK_LEADS: Lead[] = [
  { id: "1", clinica_id: "c1", nome: "João Silva", telefone: "11999999999", tratamento_interesse: "Implante Dentário", status_funil: "novo_contato", tag_prioridade: true },
  { id: "2", clinica_id: "c1", nome: "Maria Oliveira", telefone: "11988888888", tratamento_interesse: "Clareamento", status_funil: "ia_atendendo", tag_prioridade: false },
  { id: "3", clinica_id: "c1", nome: "Carlos Souza", telefone: "11977777777", tratamento_interesse: "Invisalign", status_funil: "qualificado", tag_prioridade: true },
  { id: "4", clinica_id: "c1", nome: "Ana Santos", telefone: "11966666666", tratamento_interesse: "Limpeza", status_funil: "agendado", tag_prioridade: false },
]

export default function KanbanPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Kanban de Leads</h2>
        <p className="text-muted-foreground">Gerencie o fluxo de atendimento em tempo real.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <Board initialLeads={MOCK_LEADS} />
      </div>
    </div>
  )
}
