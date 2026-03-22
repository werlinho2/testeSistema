"use client"

import { useState, useEffect } from "react"
import { ShieldAlert, User, Mail, Lock, Camera, Building2, MapPin, CheckCircle } from "lucide-react"

export default function PerfilPage() {
  const [user, setUser] = useState({ name: "", email: "", role: "", type: "recepcao", initials: "JP" })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
     const storedUser = localStorage.getItem("odontofav_user")
     if (storedUser) {
        try { setUser(JSON.parse(storedUser)) } catch (e) {}
     }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-4 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-[28px] font-extrabold tracking-tight text-slate-800 leading-none">Configurações de Perfil</h2>
        <p className="text-slate-500 text-sm mt-1.5 font-medium">Gerencie suas credenciais de acesso, e se for Administrador, as diretrizes da Clínica OdontoFav.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Cartão Lateral de Identidade C-Level */}
         <div className="col-span-1 border-r border-slate-100 pr-8">
            <div className="flex flex-col items-center">
               <div className={`w-32 h-32 rounded-full mb-6 border-4 shadow-xl flex items-center justify-center font-black text-4xl text-white relative overflow-hidden group ${
                  user.type === 'dev' ? 'bg-slate-900 border-slate-700' : user.type === 'admin' ? 'bg-rose-500 border-rose-200' : 'bg-[#0095ff] border-blue-200'
               }`}>
                  {user.initials}
                  <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
                     <Camera className="w-8 h-8 opacity-70"/>
                  </div>
               </div>
               
               <h3 className="text-xl font-black text-slate-800 text-center">{user.name}</h3>
               <span className={`text-[11px] uppercase tracking-widest font-black text-white px-3 py-1 rounded-full mt-2 shadow-sm ${
                  user.type === 'dev' ? 'bg-slate-800' : user.type === 'admin' ? 'bg-rose-500' : 'bg-[#0095ff]'
               }`}>{user.role}</span>
            </div>

            <div className="mt-10 space-y-4">
               {user.type === 'dev' && (
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
                     <p className="flex items-center gap-2 text-[12px] font-bold text-white uppercase tracking-widest mb-2"><ShieldAlert className="w-4 h-4 text-emerald-400"/> Status God Mode</p>
                     <p className="text-slate-400 text-[13px] leading-relaxed">Sensores de firewall ignoram este usuário. Conexão direta via SSH Master garantida.</p>
                  </div>
               )}
               {user.type === 'admin' && (
                  <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl shadow-sm">
                     <p className="flex items-center gap-2 text-[12px] font-bold text-rose-600 uppercase tracking-widest mb-2"><Building2 className="w-4 h-4"/> Dados Empresariais</p>
                     <p className="text-rose-900/60 text-[13px] leading-relaxed">Você detém as chaves administrativas para fechar caixas e excluir fichas médicas permanentemente.</p>
                  </div>
               )}
            </div>
         </div>

         {/* Formulários Ricos (Center/Right) */}
         <div className="col-span-1 md:col-span-2 space-y-8 pl-0 md:pl-4">
            
            <form onSubmit={handleSave} className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm relative">
               <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><User className="w-5 h-5 text-[#0095ff]"/> Identidade Básica</h3>
               
               <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                     <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                        <input type="text" defaultValue={user.name} className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-inner font-semibold text-[14.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail Pessoal</label>
                        <input type="email" disabled defaultValue={user.email} className="w-full px-5 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl shadow-inner font-semibold text-[14.5px] text-slate-500 cursor-not-allowed opacity-70" />
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Senha de Acesso ao ERP</label>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                        <input type="password" placeholder="•••••••••" className="w-full pl-11 pr-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-inner font-semibold text-[14.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] transition-all" />
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  {success ? (
                     <span className="flex items-center gap-1.5 text-emerald-500 font-black text-[13px] uppercase tracking-widest px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-left-2">
                        <CheckCircle className="w-4 h-4"/> Atualizado!
                     </span>
                  ) : (
                     <span className="text-slate-400 text-sm font-medium">As alterações serão criptografadas e enviadas ao Auth</span>
                  )}
                  <button type="submit" className="bg-[#0095ff] hover:bg-[#007acc] text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-[13px] shadow-lg shadow-[#0095ff]/20 hover:-translate-y-0.5 transition-all">
                     Salvar Mudanças
                  </button>
               </div>
            </form>

            {/* Configurações da Clínica Apenas Para Admins */}
            {(user.type === 'admin' || user.type === 'dev') && (
               <form className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm relative opacity-90 hover:opacity-100 transition-opacity">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><Building2 className="w-5 h-5 text-fuchsia-500"/> Matriz e Documentação Clínica</h3>
                  <div className="grid grid-cols-2 gap-5">
                     <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Razão Social Faturamento</label>
                        <input type="text" defaultValue="OdontoFav Clínica Integrada Ltda" className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-inner font-semibold text-[14.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500 transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">CNPJ Principal da Matriz</label>
                        <input type="text" defaultValue="08.123.456/0001-90" className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-inner font-semibold text-[14.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500 transition-all" />
                     </div>
                     <div className="col-span-2 space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">Endereço API Google Maps</label>
                        <div className="relative">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                           <input type="text" defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP" className="w-full pl-11 pr-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl shadow-inner font-semibold text-[14.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-500 transition-all" />
                        </div>
                     </div>
                  </div>
               </form>
            )}

         </div>
      </div>
    </div>
  )
}
