"use client"

import { ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, ClipboardList, Briefcase, DollarSign, Settings, Bell, Search, Zap, ShieldCheck, LogOut, User as UserIcon, LayoutDashboard, Terminal, Target, Megaphone, ScrollText } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [user, setUser] = useState({
      name: "Dra. Odonto Fav",
      role: "Diretoria",
      email: "diretoria@odontofav.com.br",
      initials: "OF",
      type: "admin"
  })

  useEffect(() => {
     // Carregando sessão Mock do browser criada na página de Login
     const storedUser = localStorage.getItem("odontofav_user")
     if (storedUser) {
        try { setUser(JSON.parse(storedUser)) } catch (e) {}
     }
  }, [])

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Pipeline CRM", href: "/dashboard/crm", icon: Target },
    { name: "Campanhas (Ads)", href: "/dashboard/campanhas", icon: Megaphone },
    { name: "Agenda", href: "/dashboard/agenda", icon: Calendar },
    { name: "Pacientes", href: "/dashboard/pacientes", icon: Users },
    { name: "Atendimentos", href: "/dashboard/atendimentos", icon: ClipboardList },
    { name: "Serviços/RAG", href: "/dashboard/servicos", icon: Briefcase },
    { name: "Financeiro", href: "/dashboard/financeiro", icon: DollarSign },
    { name: "Automações / MCP", href: "/dashboard/automacoes", icon: Zap },
    { name: "Time de Gestão", href: "/dashboard/equipe", icon: ShieldCheck },
    { name: "Auditoria de Logs", href: "/dashboard/logs", icon: ScrollText },
  ]

  // Filtro Magnético de Acessos RBAC
  const getAllowedNavItems = () => {
     let items = navItems
     
     // Apenas God Mode (Willy) toca no Backend IA/N8n
     if (user.type !== 'dev') {
        items = items.filter(item => item.href !== '/dashboard/automacoes')
     }
     
     // Recepção não visualiza Caixas Fechadas ou Engenharia (Logs/Ads/Financeiro)
     if (user.type === 'recepcao') {
        const recepcaoRoutes = ['/dashboard', '/dashboard/crm', '/dashboard/agenda', '/dashboard/pacientes', '/dashboard/atendimentos']
        items = items.filter(item => recepcaoRoutes.includes(item.href))
     }

     return items
  }

  const authorizedNavItems = getAllowedNavItems()

  return (
    <div className="flex min-h-screen bg-[#F6F8F9] text-slate-800 transition-colors">
      {/* Sidebar Inspirado no Sistema de Gestão */}
      <aside className="w-[260px] bg-[#F7F9F8] border-r border-[#E6EBE8] flex flex-col shrink-0 transition-colors">
        <div className="flex h-20 items-center px-6 border-b border-[#E6EBE8]">
          <div className="flex items-center gap-3">
            {/* O Next.js vai carregar o logo.png que deve estar na pasta public/ do seu projeto */}
            <img 
              src="/logo.png" 
              alt="Logo OdontoFav" 
              className="h-[60px] w-auto object-contain"
              onError={(e) => {
                // Fallback visual caso o arquivo logo.png ainda não esteja salvo na pasta public
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback de texto caso a imagem não exista */}
            <div className="hidden">
              <h1 className="text-base font-extrabold text-slate-800 leading-none">OdontoFav</h1>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Gestão Clínica</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1.5 flex-1">
          {authorizedNavItems.map((item) => {
            const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                  isActive 
                  ? "bg-[#0095ff] text-white shadow-md shadow-[#0095ff]/20" 
                  : "text-slate-600 hover:bg-[#EDF2F0] hover:text-slate-900"
                }`}
              >
                <item.icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white rounded-tl-2xl border-t border-l border-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] transition-colors">
        {/* Top Header */}
        <header className="h-[76px] bg-white flex items-center px-8 justify-between shrink-0 transition-colors">
          {/* Global Search */}
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-[#0095ff] transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar pacientes..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 transition-shadow focus:bg-white"
            />
          </div>
          
          {/* Header Actions / User */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <ThemeToggle />
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white translate-x-0.5 -translate-y-0.5"></span>
            </button>
            <div className="relative border-l border-slate-100 pl-6">
              <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 cursor-pointer group">
                 <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-[#0095ff] transition-colors">{user.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full mt-0.5 shadow-sm flex items-center gap-1 ${user.type === 'dev' ? 'text-white bg-slate-800' : user.type === 'admin' ? 'text-rose-600 bg-rose-50 border border-rose-100' : 'text-blue-600 bg-blue-50 border border-blue-100'}`}>
                      {user.type === 'dev' && <Terminal className="w-3 h-3"/>}
                      {user.type === 'admin' && <ShieldCheck className="w-3 h-3"/>}
                      {user.type === 'recepcao' && <UserIcon className="w-3 h-3"/>}
                      {user.role}
                    </span>
                 </div>
                 <div className={`w-10 h-10 rounded-full text-white overflow-hidden border-2 border-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] group-hover:border-slate-400 transition-all flex items-center justify-center font-black ${user.type === 'dev' ? 'bg-slate-900' : user.type === 'admin' ? 'bg-rose-500' : 'bg-[#0095ff]'}`}>
                    {user.initials}
                 </div>
              </div>
              
              {/* Dropdown Activable */}
              {isDropdownOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                   <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                     <div className="px-4 py-3 border-b border-slate-50">
                       <p className="text-[13px] font-extrabold text-slate-800">{user.name}</p>
                       <p className="text-[11px] font-medium text-slate-400">{user.email}</p>
                     </div>
                     <div className="px-2 py-2">
                       <Link href="/dashboard/perfil" className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                         <UserIcon className="w-4 h-4"/> Configurações do Perfil
                       </Link>
                       <Link href="/dashboard/automacoes" className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                         <Settings className="w-4 h-4"/> Webhooks Globais
                       </Link>
                     </div>
                     <div className="px-2 pt-2 border-t border-slate-50">
                       <Link href="/" className="flex items-center gap-2 px-3 py-2 text-[13px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                         <LogOut className="w-4 h-4"/> Desconectar
                       </Link>
                     </div>
                   </div>
                 </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Space */}
        <div className="flex-1 overflow-auto p-8 pt-4">
          {children}
        </div>
      </main>
    </div>
  )
}
