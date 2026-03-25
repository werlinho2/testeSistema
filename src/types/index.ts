export type FunilStatus = 'novo_lead' | 'qualificado' | 'agendado' | 'confirmado' | 'compareceu' | 'no_show' | 'perdido' | 'pos_venda';

export interface Message {
  id: number;
  text: string;
  sender: 'ia_n8n' | 'paciente' | 'humano';
  time: string;
}

export interface Lead {
  id: string; // Número da Conversa
  clinica_id?: string;
  nome: string;
  telefone: string;
  tratamento_interesse: string;
  status_funil: FunilStatus;
  tag_prioridade: boolean;
  canal: 'whatsapp' | 'instagram';
  temperatura: 'quente' | 'morno' | 'frio';
  status_chat: 'aberto' | 'meu' | 'fechado';
  botActive: boolean;
  mensagens: Message[];
  foto?: string;
  resumo_ia?: string;
  created_at?: string;
  updated_at?: string;
}
