export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      clinicas: {
        Row: { id: string; nome: string; email: string; created_at: string }
        Insert: { id?: string; nome: string; email: string; created_at?: string }
        Update: { id?: string; nome?: string; email?: string; created_at?: string }
      }
      pacientes_leads: {
        Row: { id: string; clinica_id: string; nome: string; telefone: string; tratamento_interesse: string; status_funil: string; tag_prioridade: boolean; origem_lead: string; created_at: string; updated_at: string }
        Insert: { id?: string; clinica_id: string; nome: string; telefone: string; tratamento_interesse: string; status_funil: string; tag_prioridade?: boolean; origem_lead?: string; created_at?: string; updated_at?: string }
        Update: { id?: string; clinica_id?: string; nome?: string; telefone?: string; tratamento_interesse?: string; status_funil?: string; tag_prioridade?: boolean; origem_lead?: string; created_at?: string; updated_at?: string }
      }
      agendamentos: {
        Row: { id: string; paciente_id: string; data_hora: string; procedimento: string; status: 'Agendado' | 'Confirmado' | 'Realizado' | 'Cancelado'; created_at: string }
        Insert: { id?: string; paciente_id: string; data_hora: string; procedimento: string; status?: 'Agendado' | 'Confirmado' | 'Realizado' | 'Cancelado'; created_at?: string }
        Update: { id?: string; paciente_id?: string; data_hora?: string; procedimento?: string; status?: 'Agendado' | 'Confirmado' | 'Realizado' | 'Cancelado'; created_at?: string }
      }
      mensagens_logs: {
        Row: { id: string; paciente_id: string; remetente: 'ia_n8n' | 'paciente' | 'humano'; conteudo: string; timestamp: string }
        Insert: { id?: string; paciente_id: string; remetente: 'ia_n8n' | 'paciente' | 'humano'; conteudo: string; timestamp?: string }
        Update: { id?: string; paciente_id?: string; remetente?: 'ia_n8n' | 'paciente' | 'humano'; conteudo?: string; timestamp?: string }
      }
      financeiro_paciente: {
        Row: { id: string; paciente_id: string; valor: number; tipo: 'receita' | 'despesa'; status_pagamento: 'pago' | 'pendente'; created_at: string }
        Insert: { id?: string; paciente_id: string; valor: number; tipo: 'receita' | 'despesa'; status_pagamento: 'pago' | 'pendente'; created_at?: string }
        Update: { id?: string; paciente_id?: string; valor?: number; tipo?: 'receita' | 'despesa'; status_pagamento?: 'pago' | 'pendente'; created_at?: string }
      }
    }
  }
}
