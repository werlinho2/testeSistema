"use client"

import { useState } from "react"
import { Search, Plus, X, User } from "lucide-react"
import { useRouter } from "next/navigation"

const INITIAL_MOCK_PACIENTES = [
  { id: "1", nome: "João Silva", contato: "(11) 99999-9999", convenio: "Particular", ultimaConsulta: "15/01/2026", status: "Em Tratamento", pacienteType: "VIP" },
  { id: "2", nome: "Maria Oliveira", contato: "(11) 98888-8888", convenio: "Unimed", ultimaConsulta: "10/12/2025", status: "Alta", pacienteType: "Base" },
  { id: "3", nome: "Carlos Souza", contato: "(11) 97777-7777", convenio: "Bradesco Saúde", ultimaConsulta: "05/01/2026", status: "Orçado", pacienteType: "Base" },
  { id: "4", nome: "Lúcia Almeida", contato: "(11) 96666-6666", convenio: "Particular", ultimaConsulta: "Hoje", status: "Primeira Vez", pacienteType: "Base" }
]

export default function PacientesPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pacientes, setPacientes] = useState(INITIAL_MOCK_PACIENTES)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [newPaciente, setNewPaciente] = useState({ nome: "", contato: "", convenio: "Particular" })

  const filtered = pacientes.filter(p => {
    return p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || p.contato.includes(searchTerm)
  })

  const handleAddPaciente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPaciente.nome) return
    const newId = (pacientes.length + 1).toString()
    setPacientes([{
      id: newId,
      nome: newPaciente.nome,
      contato: newPaciente.contato || "(00) 00000-0000",
      convenio: newPaciente.convenio,
      ultimaConsulta: "Adicionado Agora",
      status: "Cadastrado",
      pacienteType: "Base"
    }, ...pacientes])
    setNewPaciente({ nome: "", contato: "", convenio: "Particular" })
    setIsModalOpen(false) 
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[90vh] flex flex-col relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mt-2 px-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Arquivo Físico (Pacientes)</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Esta matriz engloba dados concretos e faturamento. A gestão termal do lead ocorre no Atendimento.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 font-bold" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] transition-all bg-white w-[260px]"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-[13px] uppercase tracking-widest font-black transition-transform shadow-lg shadow-[#0095ff]/20 hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Abri Ficha Física
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col flex-1 overflow-hidden mx-2">
        <div className="p-6 border-b border-slate-100 bg-[#F8FAFC]/50 flex justify-between items-center shrink-0">
            <h3 className="text-[15px] font-extrabold text-slate-800 flex items-center gap-2"><User className="w-4 h-4 text-[#0095ff]"/> Prontuários Clinicamente Ativos</h3>
            <span className="text-[10px] font-black px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-md uppercase tracking-widest shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">{filtered.length} Fichas Encontradas</span>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left border-collapse min-w-[900px]">
            <thead className="text-[11px] text-slate-400 uppercase font-black tracking-widest bg-white sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <tr>
                <th className="px-8 py-5 border-b border-slate-100">Nome Oficial</th>
                <th className="px-6 py-5 border-b border-slate-100">Contato Fixo</th>
                <th className="px-6 py-5 border-b border-slate-100">Custo do Tratamento</th>
                <th className="px-6 py-5 border-b border-slate-100">Conduta Clínica Atual</th>
                <th className="px-8 py-5 border-b border-slate-100 text-right">Controles 360</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((paciente) => (
                <tr key={paciente.id} onClick={() => router.push(`/dashboard/pacientes/${paciente.id}`)} className="hover:bg-[#F8FAFC]/80 transition-colors group cursor-pointer relative">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0095ff]/10 flex items-center justify-center text-[#0095ff] font-black text-sm uppercase shadow-sm border border-[#0095ff]/20">
                        {paciente.nome.charAt(0)}{paciente.nome.split(" ")[1]?.charAt(0) || ''}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 group-hover:text-[#0095ff] transition-colors text-[14.5px] leading-none mb-1.5">{paciente.nome}</span>
                        {paciente.pacienteType === "VIP" ? (
                          <span className="text-[9px] uppercase font-black text-amber-500 tracking-widest w-max bg-amber-50 border border-amber-200 px-2 rounded-sm py-0.5">OdontoFav Premium</span>
                        ) : <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest w-max">Dados Standard</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-semibold">{paciente.contato}</td>
                  <td className="px-6 py-4 text-slate-500 font-bold">{paciente.convenio}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-sm">
                      {paciente.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#0095ff] hover:text-white transition-colors p-2.5 text-[10px] font-black tracking-widest uppercase bg-white border border-slate-200 rounded-lg hover:bg-[#0095ff] hover:border-[#0095ff] shadow-sm">
                          Prontuário 360
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Nenhum CPF associado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col slide-in-from-right duration-300 border-l border-slate-100">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-[20px] font-extrabold text-slate-800 leading-none mb-1">Inserir Paciente Clínico</h3>
                <p className="text-[12px] font-bold text-slate-400">Essa tela não manipula Ads/Marketing.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2.5 rounded-full transition-colors"><X className="h-4 w-4" strokeWidth={2.5}/></button>
            </div>
            
            <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]/50">
              <form id="pacienteForm" onSubmit={handleAddPaciente} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Nome Oficial do Paciente (RG) *</label>
                  <input type="text" required value={newPaciente.nome} onChange={(e) => setNewPaciente({ ...newPaciente, nome: e.target.value })} className="w-full px-4 py-4 bg-white border border-slate-200 shadow-sm rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none" placeholder="Ex: João Antônio Souza Mello" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Telefone / Contato</label>
                  <input type="text" required value={newPaciente.contato} onChange={(e) => setNewPaciente({ ...newPaciente, contato: e.target.value })} className="w-full px-4 py-4 bg-white border border-slate-200 shadow-sm rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none" placeholder="(11) 99999-9999" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Convênio Monetário</label>
                  <select value={newPaciente.convenio} onChange={(e) => setNewPaciente({ ...newPaciente, convenio: e.target.value })} className="w-full px-4 py-4 bg-white border border-slate-200 shadow-sm rounded-xl text-[14.5px] font-bold text-slate-800 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none">
                    <option>Particular (Dinheiro/Cartão)</option><option>Unimed Seguros</option><option>Bradesco Top</option><option>SulAmérica Especial</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="px-8 py-6 border-t border-slate-100 bg-white flex items-center justify-end gap-3 shrink-0">
              <button type="submit" form="pacienteForm" className="w-full py-4 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-[13px] font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-lg shadow-[#0095ff]/30">
                Lançar ao Arquivo Geral
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
