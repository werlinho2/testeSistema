import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(req: Request) {
  try {
    const payload = await req.json()
    // Payload Estratégico moldado para conversar de forma Híbrida com o N8N e Chatwoot
    const { actionType, telefone, nome, conteudo_mensagem, remetente, clinica_id } = payload

    // AÇÃO TÁTICA 1: N8N capturou um Lead Novo via Meta Ads ou Campanha Ativa
    if (actionType === 'NEW_LEAD') {
       const { data, error } = await supabase.from('pacientes_leads').upsert([{
         telefone,
         nome,
         clinica_id: clinica_id || '9d7f4f6e-1d54-4a46-814d-905bcd6b643a',
         status_funil: 'novo_contato',
         tratamento_interesse: payload.tratamento || 'Triagem Default',
         origem_lead: payload.origem || 'WhatsApp Webhook (N8N)'
       }], { onConflict: 'telefone' })

       if (error) throw error
       return NextResponse.json({ success: true, message: 'Lead Registrado', data })
    }

    // AÇÃO TÁTICA 2: Bot (N8N) ou Paciente enviou uma mensagem em um Fluxo Ativo
    if (actionType === 'CHAT_LOG') {
       // Puxando do UUID exato baseando-se no telefone da pessoa
       const { data: lead } = await supabase.from('pacientes_leads').select('id').eq('telefone', telefone).single()
       if (!lead) return NextResponse.json({ success: false, error: 'Lead não encontrado para registrar o LOG de Conversa 360.' }, { status: 404 })

       // Salva a mensagem no painel de Omnichannel criado no Front
       const { error } = await supabase.from('mensagens_logs').insert([{
         paciente_id: lead.id,
         remetente: remetente || 'paciente', // ia_n8n | humano
         conteudo: conteudo_mensagem || '',
       }])

       if (error) throw error
       return NextResponse.json({ success: true, message: 'Log Omnichannel Auditado com Sucesso no Patient 360' })
    }

    return NextResponse.json({ error: 'Ação Payload (actionType) não suportada.' }, { status: 400 })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
