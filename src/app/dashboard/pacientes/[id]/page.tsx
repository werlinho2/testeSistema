"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, FileText, Calendar, DollarSign, Activity, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

// Tipos baseados no novo schema 
type MensagemLog = { id: string; remetente: 'ia_n8n' | 'paciente' | 'dentista'; conteudo: string; timestamp: string }
type Agendamento = { id: string; data: string; procedimento: string; status: string }
type PlanoTratamento = { id: string; descricao: string; valor_total: number; status: 'pendente' | 'aprovado' | 'recusado' }
type Financeiro = { id: string; valor: number; tipo: 'receita' | 'despesa'; status_pagamento: string }

// MOCKS do Supabase para o Paciente Selecionado
const mockPacienteInfo = { id: "1", nome: "João Silva", status_funil: "Em Tratamento", tag_prioridade: true, telefone: "(11) 99999-9999", origem_lead: "Instagram" }

const mockHistoricoChat: MensagemLog[] = [
  { id: "c1", remetente: "paciente", conteudo: "Olá, gostaria de saber o valor do clareamento.", timestamp: "10:00" },
  { id: "c2", remetente: "ia_n8n", conteudo: "Olá, João! Tudo bem? O Clareamento a laser está em promoção este mês...", timestamp: "10:01" },
  { id: "c3", remetente: "paciente", conteudo: "Legal, quero agendar.", timestamp: "10:15" },
]

const mockAgendamentos: Agendamento[] = [
  { id: "a1", data: "15/01/2026", procedimento: "Limpeza Dental", status: "Concluído" },
  { id: "a2", data: "25/01/2026", procedimento: "Retorno Clareamento", status: "Agendado" },
]

const mockPlanos: PlanoTratamento[] = [
  { id: "t1", descricao: "Clareamento a Laser + Protocolo de Limpeza", valor_total: 1200.00, status: "aprovado" },
  { id: "t2", descricao: "Implante Unitário (dente 46)", valor_total: 3500.00, status: "pendente" },
]

const mockFinanceiro: Financeiro[] = [
  { id: "f1", valor: 600.00, tipo: "receita", status_pagamento: "pago" }, // entrada clareamento
  { id: "f2", valor: 600.00, tipo: "receita", status_pagamento: "pendente" }, // parcela 2
]

export default function Patient360Page({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'chat' | 'clinico' | 'tratamentos' | 'financeiro'>('clinico')

  // Cálculos financeiros (Simulando processamento do Supabase)
  const totalPago = mockFinanceiro.filter(f => f.status_pagamento === 'pago').reduce((acc, curr) => acc + curr.valor, 0)
  const totalPendente = mockFinanceiro.filter(f => f.status_pagamento === 'pendente').reduce((acc, curr) => acc + curr.valor, 0)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Voltar e Header Principal */}
      <div>
        <Link href="/dashboard/pacientes" className="inline-flex items-center text-sm font-extrabold text-[#0095ff] hover:text-[#007acc] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={3} /> Centro de Pacientes
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-5">
            <div className="w-[72px] h-[72px] rounded-full bg-[#0095ff]/10 flex items-center justify-center text-[#0095ff] font-extrabold text-2xl uppercase border border-[#0095ff]/20">
              {mockPacienteInfo.nome.charAt(0)}{mockPacienteInfo.nome.split(" ")[1]?.charAt(0) || ''}
            </div>
            <div>
              <h1 className="text-[24px] font-black text-slate-800 flex items-center gap-3 leading-none">
                {mockPacienteInfo.nome}
                {mockPacienteInfo.tag_prioridade && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest font-extrabold">VIP / High-Ticket</span>
                )}
              </h1>
              <div className="flex items-center gap-4 mt-2.5">
                <p className="text-sm font-semibold text-slate-500">{mockPacienteInfo.telefone}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <p className="text-sm font-semibold text-slate-500 flex gap-1">Origem: <span className="text-[#0095ff] font-extrabold">{mockPacienteInfo.origem_lead}</span></p>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-[#0095ff]/10 text-[#0095ff] border border-[#0095ff]/20 uppercase tracking-widest">
                  Funil: {mockPacienteInfo.status_funil}
                </span>
                <span className="text-xs font-semibold text-slate-400">ID: {params.id}</span>
              </div>
            </div>
          </div>
          <button className="px-5 py-3 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-sm font-bold shadow-md shadow-[#0095ff]/20 transition-colors">
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex space-x-2 border-b border-slate-200">
        <button onClick={() => setActiveTab('clinico')} className={`px-4 py-3 text-[13px] uppercase tracking-wider font-extrabold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'clinico' ? 'border-[#0095ff] text-[#0095ff]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><Activity className="w-4 h-4" strokeWidth={2.5}/> Histórico Clínico</button>
        <button onClick={() => setActiveTab('tratamentos')} className={`px-4 py-3 text-[13px] uppercase tracking-wider font-extrabold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'tratamentos' ? 'border-[#0095ff] text-[#0095ff]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><FileText className="w-4 h-4" strokeWidth={2.5}/> Planos de Tratamento</button>
        <button onClick={() => setActiveTab('financeiro')} className={`px-4 py-3 text-[13px] uppercase tracking-wider font-extrabold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'financeiro' ? 'border-[#0095ff] text-[#0095ff]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><DollarSign className="w-4 h-4" strokeWidth={2.5}/> Financeiro</button>
        <button onClick={() => setActiveTab('chat')} className={`px-4 py-3 text-[13px] uppercase tracking-wider font-extrabold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'chat' ? 'border-[#0095ff] text-[#0095ff]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}><MessageCircle className="w-4 h-4" strokeWidth={2.5}/> Logs (N8N)</button>
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        
        {/* MODULO 1: CLINICO / AGENDAMENTOS */}
        {activeTab === 'clinico' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-800 mb-8 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#0095ff]" strokeWidth={2.5}/> Linha do Tempo de Atendimentos</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {mockAgendamentos.map((ag) => (
                <div key={ag.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#0095ff] text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Calendar className="w-4 h-4" strokeWidth={2.5}/>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-slate-800 text-[15px]">{ag.procedimento}</span>
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full ${ag.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 'bg-[#0095ff]/10 text-[#0095ff]'}`}>{ag.status}</span>
                    </div>
                    <time className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {ag.data}</time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULO 2: PLANOS DE TRATAMENTO */}
        {activeTab === 'tratamentos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPlanos.map(plano => (
              <div key={plano.id} className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      plano.status === 'aprovado' ? 'bg-emerald-100 text-emerald-700' :
                      plano.status === 'recusado' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {plano.status === 'aprovado' && <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.5}/>}
                      {plano.status === 'recusado' && <XCircle className="w-3.5 h-3.5" strokeWidth={2.5}/>}
                      {plano.status === 'pendente' && <Clock className="w-3.5 h-3.5" strokeWidth={2.5}/>}
                      {plano.status}
                    </span>
                    <button className="text-[#0095ff] text-[13px] font-extrabold hover:underline">Ver Proposta (PDF)</button>
                  </div>
                  <h4 className="text-slate-800 font-extrabold text-[17px] mb-2 leading-tight">{plano.descricao}</h4>
                </div>
                <div className="mt-8 pt-5 border-t border-slate-100 flex justify-between items-end">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Valor Planejado</span>
                  <span className="text-2xl font-black text-slate-800">R$ {plano.valor_total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODULO 3: FINANCEIRO */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-center">
                  <p className="text-[12px] uppercase tracking-wider font-extrabold text-slate-500 mb-1.5">Total Movimentado</p>
                  <h3 className="text-[32px] font-black text-slate-800 leading-none">R$ {(totalPago + totalPendente).toFixed(2)}</h3>
               </div>
               <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                  <p className="text-[12px] uppercase tracking-wider font-extrabold text-emerald-600/80 mb-1.5">Pago / Recebido</p>
                  <h3 className="text-[32px] font-black text-emerald-700 leading-none">R$ {totalPago.toFixed(2)}</h3>
               </div>
               <div className="bg-[#FFFBEB] border border-[#FEF3C7] p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                  <p className="text-[12px] uppercase tracking-wider font-extrabold text-amber-600/80 mb-1.5">A Receber</p>
                  <h3 className="text-[32px] font-black text-amber-700 leading-none">R$ {totalPendente.toFixed(2)}</h3>
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm mt-6">
               <p className="text-slate-500 font-semibold mb-4 text-sm">Resumo de Extrato isolado entrará aqui lendo a tabela <code>financeiro_paciente</code>.</p>
            </div>
          </div>
        )}

        {/* MODULO 4: CHAT n8n */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-[540px] flex flex-col relative">
            <div className="p-5 border-b border-slate-100 bg-[#F8FAFC]">
              <h3 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-[#0095ff]" strokeWidth={2.5}/> 
                Histórico ConversationLog (Webhooks N8N)
              </h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-opacity-10 bg-cover bg-blend-soft-light" style={{ backgroundColor: 'rgba(240, 245, 248, 0.95)'}}>
              {mockHistoricoChat.map(msg => (
                <div key={msg.id} className={`flex ${msg.remetente === 'ia_n8n' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    msg.remetente === 'ia_n8n' ? 'bg-[#0095ff] text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}>
                    <p className="text-[15px] font-medium leading-relaxed">{msg.conteudo}</p>
                    <span className={`text-[10px] mt-2 block font-extrabold tracking-widest uppercase ${msg.remetente === 'ia_n8n' ? 'text-white/80 text-right' : 'text-slate-400'}`}>
                      {msg.timestamp} • {msg.remetente === 'ia_n8n' ? 'Assistente Hub' : 'Paciente Lead'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-white border-t border-slate-100">
              <input type="text" placeholder="Assumir o controle humano da IA e enviar mensagem via WhatsApp..." className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] transition-all" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
