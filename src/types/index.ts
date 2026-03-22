export type FunilStatus = 'novo_contato' | 'ia_atendendo' | 'qualificado' | 'agendado' | 'perdido';

export interface Lead {
  id: string;
  clinica_id: string;
  nome: string;
  telefone: string;
  tratamento_interesse: string;
  status_funil: FunilStatus;
  tag_prioridade: boolean;
  created_at?: string;
  updated_at?: string;
}
