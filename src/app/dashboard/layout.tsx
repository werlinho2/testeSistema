"use client"

import { ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, ClipboardList, Briefcase, DollarSign, Settings, Bell, Search, Zap, ShieldCheck, LogOut, User as UserIcon, LayoutDashboard, Terminal, Target, Megaphone, ScrollText, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { supabase } from "@/lib/supabase"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState({
      name: "Dra. Odonto Fav",
      role: "Diretoria",
      email: "diretoria@odontofav.com.br",
      initials: "OF",
      type: "admin"
  })
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [notificacoes, setNotificacoes] = useState<any[]>([])

  const fetchNotificacoes = async () => {
     const { data } = await supabase.from('notificacoes').select('*').order('created_at', { ascending: false }).limit(10)
     if (data) setNotificacoes(data)
  }

  useEffect(() => {
     // Carregando sessão Mock do browser
     const storedUser = localStorage.getItem("odontofav_user")
     if (storedUser) {
        try { setUser(JSON.parse(storedUser)) } catch (e) {}
     }

     fetchNotificacoes()
     const channel = supabase.channel('notif-changes')
       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notificacoes' }, (payload) => {
         setNotificacoes(prev => [payload.new, ...prev].slice(0, 10))
       })
       .subscribe()

     return () => { supabase.removeChannel(channel) }
  }, [])

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Kanban", href: "/dashboard/kanban", icon: Target },
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
        const recepcaoRoutes = ['/dashboard', '/dashboard/kanban', '/dashboard/agenda', '/dashboard/pacientes', '/dashboard/atendimentos']
        items = items.filter(item => recepcaoRoutes.includes(item.href))
     }

     return items
  }

  const authorizedNavItems = getAllowedNavItems()

  return (
    <div className="flex min-h-screen bg-[#F6F8F9] text-slate-800 transition-colors">
      
      {/* Global Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-[2px] transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Inspirado no Sistema de Gestão */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-100 flex flex-col shrink-0 transition-all duration-300 ease-in-out group overflow-hidden w-[260px] lg:w-[72px] lg:hover:w-[260px] hover:shadow-2xl ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex h-20 items-center px-5 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-3 w-[220px]">
            {/* O Next.js vai carregar o logo.png que deve estar na pasta public/ do seu projeto */}
            <img 
              src="/logo.png" 
              alt="Logo OdontoFav" 
              className="h-[40px] w-auto object-contain cursor-pointer"
              onError={(e) => {
                // Fallback visual
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback de texto caso a imagem não exista */}
            <div className="hidden">
              <div className="w-8 h-8 rounded-lg bg-[#0095ff] text-white flex items-center justify-center font-black shrink-0">OF</div>
            </div>
            <div className="transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
               <h1 className="text-base font-extrabold text-slate-800 leading-none whitespace-nowrap">OdontoFav</h1>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 p-1 ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto overflow-x-hidden">
          {authorizedNavItems.map((item) => {
            const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex items-center gap-4 rounded-xl px-3.5 py-3 text-[14px] font-bold transition-all whitespace-nowrap ${
                  isActive 
                  ? "bg-[#0095ff]/10 text-[#0095ff]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="shrink-0 flex items-center justify-center">
                   <item.icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white transition-all w-full min-w-0 lg:pl-[72px]">
        {/* Top Header */}
        <header className="h-[76px] bg-white flex items-center px-4 lg:px-8 justify-between shrink-0 transition-colors gap-4">
          
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-500 hover:text-slate-800 p-1 -ml-1">
            <Menu className="w-6 h-6" />
          </button>

          {/* Global Search */}
          <div className="flex-1 max-w-xl relative group hidden sm:block">
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
            <div className="relative">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1">
                <Bell className="h-5 w-5" />
                {notificacoes.filter(n => !n.lida).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white translate-x-px -translate-y-px animate-pulse"></span>
                )}
              </button>

              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                  <div className="absolute right-0 top-full mt-3 w-80 max-w-[90vw] bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-5 py-3 border-b border-slate-50 flex justify-between items-center bg-[#F8FAFC]/50">
                      <h3 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-widest">Notificações</h3>
                      {notificacoes.filter(n => !n.lida).length > 0 && <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{notificacoes.filter(n => !n.lida).length} novas</span>}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notificacoes.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 font-medium text-[13px]">Nenhum alerta recente.</div>
                      ) : (
                        notificacoes.map(n => (
                           <div key={n.id} onClick={async () => {
                              if (!n.lida) {
                                 await supabase.from('notificacoes').update({ lida: true }).eq('id', n.id)
                                 setNotificacoes(prev => prev.map(old => old.id === n.id ? { ...old, lida: true } : old))
                              }
                           }} className={`p-4 border-b border-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.lida ? 'bg-blue-50/30' : 'opacity-70'}`}>
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.tipo === 'success' ? 'bg-emerald-100 text-emerald-500' : n.tipo === 'error' ? 'bg-rose-100 text-rose-500' : 'bg-blue-100 text-blue-500'}`}>
                               <Bell className="w-4 h-4"/>
                             </div>
                             <div>
                               <p className="text-[13px] font-bold text-slate-800 leading-tight mb-0.5">{n.titulo}</p>
                               <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{n.mensagem}</p>
                             </div>
                           </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
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
        <div className="flex-1 overflow-auto p-4 lg:p-8 pt-4">
          {children}
        </div>
      </main>
    </div>
  )
}
