"use client"

import { useState, useEffect } from "react"
import { Search, Plus, MoreHorizontal, X, User, HeartPulse, ShieldAlert, CheckCircle, Trash2, UserCog } from "lucide-react"

const INITIAL_EQUIPE = [
  { id: 0, nome: "Werlinho (Engenharia)", email: "dev@odontofav.com.br", cargo: "Líder de Desenvolvimento", permissao: "Acesso Total (God Mode)", icon: ShieldAlert, color: "slate" },
  { id: 1, nome: "Dra. Odonto Fav", email: "diretoria@odontofav.com.br", cargo: "Administrador / Sócio", permissao: "Acesso Total", icon: CheckCircle, color: "rose" },
  { id: 4, nome: "Alexia", email: "gerencia@odontofav.com.br", cargo: "Gerente Comercial", permissao: "Acesso Total", icon: CheckCircle, color: "fuchsia" },
  { id: 2, nome: "Fernanda Mello", email: "fernanda@odontofav.com.br", cargo: "Dentista Invisalign", permissao: "Prontuários e Agenda", icon: HeartPulse, color: "emerald" },
  { id: 3, nome: "João Paulo", email: "recepcao@odontofav.com.br", cargo: "Recepcionista Clínico", permissao: "CRM e Chat", icon: UserCog, color: "blue" }
]

const ROLE_WEIGHTS: Record<string, number> = {
  "Líder de Desenvolvimento": 100,
  "Administrador / Sócio": 80,
  "Gerente Comercial": 60,
  "Dentista Invisalign": 40,
  "Dentista Pleno": 40,
  "Recepcionista Clínico": 20,
  "Assistente Administrativo": 20,
  "Especialista (Orto)": 40
}

export default function EquipePage() {
  const [membros, setMembros] = useState(INITIAL_EQUIPE)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newMembro, setNewMembro] = useState({ nome: "", email: "", cargo: "Dentista Pleno" })
  
  const [currentUserWeight, setCurrentUserWeight] = useState(0)

  // Hard Security Check
  useEffect(() => {
     const st = localStorage.getItem("odontofav_user")
     if (st) {
        const parsed = JSON.parse(st)
        if (parsed.type === 'dev' || parsed.cargo === 'Líder de Desenvolvimento') setCurrentUserWeight(100)
        else if (parsed.cargo === 'Administrador / Sócio' || parsed.type === 'admin') setCurrentUserWeight(80)
        else if (parsed.cargo === 'Gerente Comercial' || parsed.type === 'gerente') setCurrentUserWeight(60)
        else setCurrentUserWeight(20)
     } else {
        // Fallback p/ o mockup: assume god mode (Líder) se não estiver logado
        setCurrentUserWeight(100) 
     }
  }, [])

  const filteredMembros = membros.filter(m => m.nome.toLowerCase().includes(searchTerm.toLowerCase()) || m.cargo.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAdd = (e: React.FormEvent) => {
     e.preventDefault()
     if (!newMembro.nome || !newMembro.email) return
     const obj = {
        id: Date.now(),
        nome: newMembro.nome,
        email: newMembro.email,
        cargo: newMembro.cargo,
        permissao: "Nova Conta Restrita",
        icon: User,
        color: "slate"
     }
     setMembros([...membros, obj])
     setNewMembro({ nome: "", email: "", cargo: "Dentista Pleno" })
     setIsModalOpen(false)
  }

  const handleRemove = (membro: any) => {
     const targetWeight = ROLE_WEIGHTS[membro.cargo] || 20;
     if (currentUserWeight <= targetWeight && currentUserWeight !== 100) {
        return alert("Acesso Negado: Seu nível hierárquico é menor ou igual ao deste colaborador. Você não tem permissão de remoção.")
     }
     if (membro.id === 0) return alert("Erro Crítico de Sistema: Impossível remover o Arquiteto de Software.")
     setMembros(membros.filter(m => m.id !== membro.id))
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col relative h-[90vh] overflow-hidden pr-2 pb-4">
      {/* Header Central */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mt-2 pl-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Gestão de Equipes (RH)</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Controle os acessos, cargos e credenciais da plataforma para sua equipe médica e comercial.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 font-bold" />
            <input 
              type="text" 
              placeholder="Buscar colaborador..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] shadow-sm transition-all bg-white w-[220px]"
            />
          </div>
          <button onClick={()=>setIsModalOpen(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-[13px] uppercase tracking-widest font-black transition-transform shadow-lg shadow-[#0095ff]/20 hover:-translate-y-0.5">
            <Plus className="h-4 w-4" strokeWidth={3} /> Add Membro
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 flex flex-col flex-1 overflow-hidden shadow-sm mx-2">
        <div className="p-5 border-b border-slate-100 bg-[#F8FAFC]/50 flex justify-between items-center shrink-0">
            <h3 className="text-[15px] font-extrabold text-slate-800">Colaboradores Autenticáveis ({filteredMembros.length})</h3>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left border-collapse min-w-[800px]">
            <thead className="text-[11px] text-slate-400 uppercase font-black tracking-widest bg-white sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <tr>
                <th className="px-8 py-5 border-b border-slate-100">Nome Oficial do Acesso</th>
                <th className="px-6 py-5 border-b border-slate-100">E-mail SSO</th>
                <th className="px-6 py-5 border-b border-slate-100">Cargo Efetivo</th>
                <th className="px-6 py-5 border-b border-slate-100">Tipo de Permissões</th>
                <th className="px-8 py-5 border-b border-slate-100 text-right">Manutenção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMembros.map((membro) => (
                <tr key={membro.id} className="hover:bg-[#F8FAFC]/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-sm border ${
                        membro.color === 'slate' ? 'bg-slate-900 text-white border-slate-800' :
                        membro.color === 'rose' ? 'bg-rose-50 border-rose-200 text-rose-500' :
                        membro.color === 'fuchsia' ? 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-500' :
                        membro.color === 'emerald' ? 'bg-emerald-50 border-emerald-200 text-emerald-500' :
                        'bg-blue-50 border-blue-200 text-blue-500'
                      }`}>
                        {membro.nome.charAt(0)}{membro.nome.split(" ")[1]?.charAt(0) || ''}
                      </div>
                      <span className="font-extrabold text-[14.5px] text-slate-800 group-hover:text-[#0095ff] transition-colors">{membro.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-semibold">{membro.email}</td>
                  <td className="px-6 py-5 text-slate-700 font-extrabold">{membro.cargo}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      membro.color === 'slate' ? 'bg-slate-900 text-white' :
                      membro.color === 'rose' ? 'bg-rose-500 text-white' :
                      membro.color === 'fuchsia' ? 'bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200' :
                      membro.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                      'bg-blue-50 text-blue-600 border border-blue-200'
                    }`}>
                      <membro.icon className="w-3 h-3" /> {membro.permissao}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      {(currentUserWeight > (ROLE_WEIGHTS[membro.cargo] || 20) || currentUserWeight === 100) ? (
                        <button onClick={()=>handleRemove(membro)} className="p-2 text-rose-400 hover:text-rose-600 bg-white border border-slate-200 hover:bg-rose-50 rounded-lg shadow-sm transition-all" title="Remover Usuário">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="p-2 text-slate-300 pointer-events-none" title="Acesso Negado"><ShieldAlert className="w-4 h-4" /></span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-[#F8FAFC]">
                   <h3 className="text-xl font-extrabold text-slate-800">Convidar à Base</h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:bg-white p-2 rounded-full"><X className="w-5 h-5"/></button>
               </div>
               <form onSubmit={handleAdd} className="p-8 space-y-5">
                   <div className="space-y-2">
                       <label className="text-[11px] font-black tracking-widest uppercase text-slate-500 ml-1">Nome de Apresentação</label>
                       <input autoFocus required type="text" value={newMembro.nome} onChange={e=>setNewMembro({...newMembro, nome: e.target.value})} className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none" placeholder="Ex: Dr. Roberto Marques" />
                   </div>
                   <div className="space-y-2">
                       <label className="text-[11px] font-black tracking-widest uppercase text-slate-500 ml-1">E-mail Autenticador</label>
                       <input required type="email" value={newMembro.email} onChange={e=>setNewMembro({...newMembro, email: e.target.value})} className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none" placeholder="medico@odontofav.com.br" />
                   </div>
                   <div className="space-y-2">
                       <label className="text-[11px] font-black tracking-widest uppercase text-slate-500 ml-1">Cargo Comercial</label>
                       <select value={newMembro.cargo} onChange={e=>setNewMembro({...newMembro, cargo: e.target.value})} className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none">
                          {currentUserWeight >= 100 && <option>Líder de Desenvolvimento</option>}
                          {currentUserWeight >= 80 && <option>Administrador / Sócio</option>}
                          {currentUserWeight >= 60 && <option>Gerente Comercial</option>}
                          <option>Dentista Pleno</option>
                          <option>Especialista (Orto)</option>
                          <option>Assistente Administrativo</option>
                       </select>
                   </div>
                   <button type="submit" className="w-full bg-[#0095ff] hover:bg-[#007acc] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-lg shadow-[#0095ff]/20 mt-4 hover:-translate-y-0.5 transition-all">
                       Cadastrar Usuário
                   </button>
               </form>
           </div>
        </div>
      )}
    </div>
  )
}
