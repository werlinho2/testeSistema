"use client"

import { useState } from "react"
import { ArrowDownRight, ArrowUpRight, DollarSign, Download, AlertCircle, X, Plus } from "lucide-react"

// @ts-ignore - Ignorando erro caso fluxo chart não exista ainda
// import { FluxoChart } from "@/components/financeiro/FluxoChart"

const INITIAL_TRANSACOES = [
  { id: 1, descricao: "Clareamento Sessão 1", paciente: "Binho Johann", data: "27/01/2026", metodo: "Dinheiro", valor: 100, tipo: "receita" },
  { id: 2, descricao: "Conta de Luz", paciente: "-", data: "26/01/2026", metodo: "Pix", valor: 100, tipo: "despesa" },
]

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState(INITIAL_TRANSACOES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'receita' | 'despesa'>('receita')
  
  const [novaTransacao, setNovaTransacao] = useState({ descricao: "", paciente: "", data: "", metodo: "Pix", valor: "" })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaTransacao.descricao || !novaTransacao.valor) return

    setTransacoes([{
      id: Date.now(),
      descricao: novaTransacao.descricao,
      paciente: novaTransacao.paciente || "-",
      data: novaTransacao.data || new Date().toLocaleDateString('pt-BR'),
      metodo: novaTransacao.metodo,
      valor: parseFloat(novaTransacao.valor.replace(',', '.')),
      tipo: modalType
    }, ...transacoes])

    setIsModalOpen(false)
    setNovaTransacao({ descricao: "", paciente: "", data: "", metodo: "Pix", valor: "" })
  }

  const openModal = (tipo: 'receita' | 'despesa') => {
    setModalType(tipo)
    setIsModalOpen(true)
  }

  const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, curr) => acc + curr.valor, 0)
  const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, curr) => acc + curr.valor, 0)
  const saldoTotal = totalReceitas - totalDespesas

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col relative h-[90vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Controle Financeiro</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Você já pode lançar Receitas e Despesas simuladas abaixo!</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => openModal('despesa')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[13px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-100 transition-all shadow-sm">
            <ArrowDownRight className="h-4 w-4" strokeWidth={3} /> Nova Despesa
          </button>
          <button onClick={() => openModal('receita')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[13px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20">
            <ArrowUpRight className="h-4 w-4" strokeWidth={3} /> Lançar Receita
          </button>
        </div>
      </div>

      {/* KPI Cards Reativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0 mt-4">
        {/* Receitas */}
        <div className="bg-[#F0FDF4] p-6 rounded-2xl border border-[#DCFCE7] shadow-sm flex items-center gap-5 relative overflow-hidden transition-all">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ArrowUpRight className="h-6 w-6" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-widest font-black text-emerald-700/80 mb-1">Receitas Lançadas</p>
            <h3 className="text-[28px] font-black text-emerald-800 leading-none">R$ {totalReceitas.toFixed(2)}</h3>
          </div>
        </div>

        {/* Despesas */}
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <ArrowDownRight className="h-6 w-6" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-widest font-black text-rose-700/80 mb-1">Despesas do Mês</p>
            <h3 className="text-[28px] font-black text-rose-800 leading-none">R$ {totalDespesas.toFixed(2)}</h3>
          </div>
        </div>

        {/* Saldo Total Líquido */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-5">
           <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0">
            <DollarSign className="h-6 w-6" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-widest font-black text-slate-400 mb-1">Saldo Atual</p>
            <h3 className="text-[28px] font-black text-white leading-none">R$ {saldoTotal.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Caixa da Tabela Inteira */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col flex-1 overflow-hidden mt-4">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[15px] font-extrabold text-slate-800">Transações Registradas (Caixa)</h3>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left border-collapse min-w-[800px]">
            <thead className="text-[11px] text-slate-400 uppercase font-black tracking-widest bg-white sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <tr>
                <th className="px-6 py-5">Descrição Original</th>
                <th className="px-6 py-5">Paciente Associado</th>
                <th className="px-6 py-5">Data da Operação</th>
                <th className="px-6 py-5">Forma / Método</th>
                <th className="px-6 py-5 text-right">Valor Líquido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transacoes.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.tipo === 'receita' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                         {t.tipo === 'receita' ? <ArrowUpRight className="w-4 h-4" strokeWidth={3}/> : <ArrowDownRight className="w-4 h-4" strokeWidth={3}/>}
                      </div>
                      <span className="font-extrabold text-slate-700 text-[14px]">{t.descricao}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-bold">{t.paciente}</td>
                  <td className="px-6 py-4 text-slate-400 font-semibold">{t.data}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md">{t.metodo}</span>
                  </td>
                  <td className={`px-6 py-4 text-right font-black text-[15px] ${t.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL de Inclusão de Despesa/Receita */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-[20px] font-extrabold text-slate-800 leading-none">Lançar {modalType === 'receita' ? 'Receita' : 'Despesa'}</h3>
                <p className="text-[12px] font-medium text-slate-400 mt-1">Alimenta os KPIs de caixa imediatamente.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" strokeWidth={3}/></button>
            </div>
            
            <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]/50">
              <form id="financeForm" onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Descrição / Motivo</label>
                  <input type="text" required value={novaTransacao.descricao} onChange={e => setNovaTransacao({...novaTransacao, descricao: e.target.value})} className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" placeholder={modalType === 'receita' ? "Ex: Pagamento Clareamento" : "Ex: Manutenção Cadeira Dentista"} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Paciente (Opcional se for Despesa Fixa)</label>
                  <input type="text" value={novaTransacao.paciente} onChange={e => setNovaTransacao({...novaTransacao, paciente: e.target.value})} className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" placeholder="Ex: Maria Luiza" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Valor Exato (R$)</label>
                    <input type="number" step="0.01" required value={novaTransacao.valor} onChange={e => setNovaTransacao({...novaTransacao, valor: e.target.value})} className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" placeholder="150" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Forma / Extrato</label>
                    <select value={novaTransacao.metodo} onChange={e => setNovaTransacao({...novaTransacao, metodo: e.target.value})} className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]">
                      <option>Pix</option><option>Cartão Crédito</option><option>Dinheiro em Espécie</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-8 py-6 border-t border-slate-100 bg-white flex items-center justify-end gap-3">
              <button type="submit" form="financeForm" className={`px-8 py-3.5 text-white rounded-xl text-[13px] font-black uppercase tracking-widest transition-colors shadow-lg ${modalType === 'receita' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30'}`}>Lançar no Caixa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
