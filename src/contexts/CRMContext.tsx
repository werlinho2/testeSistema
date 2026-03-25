'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lead, FunilStatus, Message } from '@/types'
import { supabase } from '@/lib/supabase'

interface CRMContextType {
  leads: Lead[];
  updateLeadStatus: (id: string, status: FunilStatus) => void;
  updateLeadChatStatus: (id: string, status: 'aberto' | 'meu' | 'fechado') => void;
  toggleBot: (id: string, active: boolean) => void;
  addMessage: (id: string, msg: Omit<Message, 'id' | 'time'>) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

export function CRMProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([])

  // Função central para buscar os dados de 'dados_cliente' e 'n8n_chat_histories'
  const fetchSupaData = async () => {
    try {
      // 1. Busca os clientes
      const { data: clientesData, error: errClientes } = await supabase
        .from('dados_cliente')
        .select('*')
        .order('created_at', { ascending: false });

      if (errClientes) throw errClientes;

      // 2. Busca as conversas
      const { data: msgsData, error: errMsgs } = await supabase
        .from('n8n_chat_histories')
        .select('*')
        .order('id', { ascending: true }); // garante a ordem das mensagens

      if (errMsgs) throw errMsgs;

      // 3. Monta o Array de Leads unindo as duas tabelas
      const mountedLeads: Lead[] = (clientesData || []).map(cli => {
        
        // Filtra as mensagens pelo Telefone (session_id geralmente tem @s.whatsapp.net ou afins)
        // Precisamos garantir que encontre "contém" o número, já que o n8n sufixa com @s.whatsapp.net
        const unformattedPhone = cli.telefone?.replace(/\D/g, '') || ''
        
        const myChatHistory = (msgsData || []).filter(m => 
          m.session_id && unformattedPhone && m.session_id.includes(unformattedPhone)
        )

        const mappedMessages: Message[] = myChatHistory.map(m => {
          let parsedMsg = m.message;
          if (typeof m.message === 'string') {
            try { parsedMsg = JSON.parse(m.message) } catch(e){}
          }
          
          let senderType: 'paciente' | 'humano' | 'ia_n8n' = 'paciente'
          if (parsedMsg?.type === 'ai') senderType = 'ia_n8n'
          if (parsedMsg?.type === 'human_agent') senderType = 'humano' // fallback se usarmos
          if (parsedMsg?.additional_kwargs?.sender === 'agent') senderType = 'humano' // Nossa marcação para o FrontEnd

          let contentText = parsedMsg?.content || ''
          
          // Tratar content se for um JSON aninhado (ex: output.mensagem)
          if (typeof contentText === 'string' && contentText.startsWith('{')) {
             try {
                const inner = JSON.parse(contentText)
                if (inner.output && inner.output.mensagem) {
                  contentText = inner.output.mensagem
                }
             } catch(e){}
          } else if (typeof contentText === 'string' && contentText.includes('Conteúdo da mensagem:')) {
             // Limpar a sujeira que o n8n injeta na System Message do humano (Data, WhatsApp do cliente, etc)
             const splitted = contentText.split('Conteúdo da mensagem:');
             if (splitted.length > 1) {
               contentText = splitted[1].trim();
             }
          }

          return {
            id: m.id,
            text: contentText,
            sender: senderType,
            time: "Agora" // n8n_chat_histories às vezes não salva timestamp visível na raiz, podemos mockar ou usar um campo
          }
        })

        return {
          id: String(cli.id),
          clinica_id: 'c1',
          nome: cli.nomewpp || cli.nome || 'Sem Nome',
          telefone: cli.telefone || '',
          tratamento_interesse: cli.tratamento_interesse || '',
          status_funil: (cli.status_funil as FunilStatus) || 'novo_lead',
          tag_prioridade: cli.temperatura === 'quente',
          canal: cli.canal || 'whatsapp',
          temperatura: cli.temperatura || 'frio',
          status_chat: cli.status_chat || 'aberto',
          botActive: cli.bot_active !== false,
          foto: cli.foto || undefined,
          resumo_ia: cli.resumo_ia || undefined,
          mensagens: mappedMessages
        }
      })

      setLeads(mountedLeads)
    } catch (err) {
      console.error("Erro ao buscar dados do Supabase:", err)
    }
  }

  // Effect Initial Load & Realtime Subscriptions
  useEffect(() => {
    fetchSupaData()

    // Inscrever em atualizações do BD
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dados_cliente' }, (payload) => {
        console.log('Realtime dados_cliente:', payload)
        fetchSupaData() // Refetch simples para manter sincronia
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'n8n_chat_histories' }, (payload) => {
        console.log('Realtime n8n_chat_histories:', payload)
        fetchSupaData() // Refetch simples para exibir a nova mensagem
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Modificadores de Estado (agora salvam no Supabase também!)
  const updateLeadStatus = async (id: string, status: FunilStatus) => {
    // 1. Atualiza visual logo na tela
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status_funil: status } : l))
    
    // 2. Manda pro banco
    await supabase.from('dados_cliente').update({ status_funil: status }).eq('id', id)
  }

  const updateLeadChatStatus = async (id: string, status: 'aberto' | 'meu' | 'fechado') => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status_chat: status } : l))
    await supabase.from('dados_cliente').update({ status_chat: status }).eq('id', id)
  }

  const toggleBot = async (id: string, active: boolean) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, botActive: active } : l))
    await supabase.from('dados_cliente').update({ bot_active: active }).eq('id', id)
  }

  const addMessage = async (id: string, msg: Omit<Message, 'id' | 'time'>) => {
    const activeLead = leads.find(l => l.id === id)
    if (!activeLead) return

    // 1. Desliga bot pro frontend imediatamente
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status_chat: l.status_chat === 'aberto' ? 'meu' : l.status_chat,
          botActive: false,
          mensagens: [...l.mensagens, { ...msg, id: Date.now(), time: "Agora" }]
        }
      }
      return l
    }))

    // 2. Desliga no banco
    await supabase.from('dados_cliente').update({ 
      status_chat: activeLead.status_chat === 'aberto' ? 'meu' : activeLead.status_chat,
      bot_active: false 
    }).eq('id', id)

    // 3. Insere a mensagem na n8n_chat_histories
    // Isso é meio tricky porque a session_id tem que ser igual a do histórico!
    // Como a "session_id" padrão do n8n salva "5511999999999@s.whatsapp.net", vamos reconstruir:
    const unformattedPhone = activeLead.telefone.replace(/\D/g, '')
    const session_id = unformattedPhone + "@s.whatsapp.net"

    const messageJson = {
      type: "human", // Vamos enganar o RAG e injetar como human_agent ou human, depende de como o seu n8n processa
      content: msg.text,
      additional_kwargs: { sender: "agent" }
    }

    await supabase.from('n8n_chat_histories').insert({
      session_id,
      message: messageJson
    })

    // 4. Bater no Webhook do n8n para ele enviar pra Evolution API
    try {
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "http://localhost:5678/webhook/dc350357-9d2e-45ac-ac21-dff66ccb81ee"
      // Aqui usamos a URL diretamente também para fugir do cache do Next.js
      if (n8nWebhookUrl) {
         fetch(n8nWebhookUrl, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             action: "send_human_message",
             session_id: session_id,
             text: msg.text,
             sender_name: "Atendente" // Nome de quem assumiu
           })
         }).catch(console.error)
      } else {
         console.warn("Faltando URL do Webhook do n8n para disparar a msg pro WhatsApp.")
      }
    } catch (err) {}
  }

  return (
    <CRMContext.Provider value={{ leads, updateLeadStatus, updateLeadChatStatus, toggleBot, addMessage }}>
      {children}
    </CRMContext.Provider>
  )
}

export function useCRMContext() {
  const context = useContext(CRMContext)
  if (!context) {
    throw new Error('useCRMContext must be used within a CRMProvider')
  }
  return context
}
