"use client"

import { useState, useEffect } from "react"
import { Cpu, Zap, Activity, MessageCircle, Send, Plus, Fingerprint, Network, ShieldCheck, X, Search, GitMerge, FileJson, ArrowRight, Instagram, Target, ShieldAlert } from "lucide-react"

export default function AutomacoesPage() {
  const [onlineStatus, setOnlineStatus] = useState({ wp: true, ig: false, mcp: false })
  const [setupModal, setSetupModal] = useState<'wp' | 'ig' | 'mcp' | null>(null)
  
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isDev, setIsDev] = useState<boolean | null>(null)

  useEffect(() => {
     // Hard Security Check
     const st = localStorage.getItem("odontofav_user")
     if (st && JSON.parse(st).type === "dev") {
        setIsDev(true)
     } else {
        setIsDev(false)
     }
  }, [])

  const handleSaveSetup = (e: React.FormEvent) => {
    e.preventDefault()
    if (setupModal) {
       setOnlineStatus({ ...onlineStatus, [setupModal]: true })
       setSetupModal(null)
       setWebhookUrl("")
    }
  }

  if (isDev === null) return <div className="p-12 text-center text-[#0095ff] font-extrabold uppercase tracking-widest text-[11px] animate-pulse">Autorizando Endpoints...</div>

  if (!isDev) return (
     <div className="flex flex-col items-center justify-center h-[70vh] bg-white rounded-[40px] border border-slate-100/50 shadow-[0_2px_20px_rgba(0,0,0,0.03)] mx-auto max-w-2xl mt-12 p-10">
        <div className="w-24 h-24 rounded-full bg-rose-50 border-4 border-white shadow-lg flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border border-rose-100 z-0"></div>
            <ShieldAlert className="w-10 h-10 text-rose-500 relative z-10"/>
        </div>
        <h2 className="text-[34px] font-black text-slate-800 mb-2 tracking-tight">Autorização Recusada</h2>
        <p className="text-slate-500 font-medium text-center px-4 leading-relaxed mb-10 text-[15px]">
          Esta central de integrações controla o tráfego da API Neural, chaves JWT Globais e fluxos N8n. Por razões severas de Segurança da Informação, os gatilhos foram restringidos exclusivamente ao <b>Cargo Desencriptador (Dev)</b>.
        </p>
        <span className="flex items-center gap-2 text-[10px] bg-slate-900 shadow-md text-white font-black uppercase tracking-widest px-5 py-2.5 rounded-xl border border-slate-800">
           <Fingerprint className="w-3 h-3 text-rose-500"/> Escudo God Mode (Nível 5)
        </span>
     </div>
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col relative h-[90vh] overflow-y-auto pr-4 pb-12">
      {/* Header Central */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mt-2">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Hub de Integrações Dev</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Ligue as pontes do Sistema (Chatwoot, Meta e Model Context Protocol) manipulando os Webhooks abaixo.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-[13px] uppercase tracking-widest font-black transition-all shadow-lg shadow-[#0095ff]/20 hover:-translate-y-0.5">
            <Plus className="h-4 w-4" strokeWidth={3} /> Gerar Token API
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* N8N WhatsApp Automations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col group relative overflow-hidden transition-all hover:border-emerald-500/30 hover:shadow-emerald-500/10 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4">
            {onlineStatus.wp ? (
               <span className="flex items-center gap-1.5 text-[9px] uppercase font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> ONLINE</span>
            ) : (
               <span className="flex items-center gap-1.5 text-[9px] uppercase font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 rounded-full bg-amber-500"/> OFFLINE</span>
            )}
          </div>
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 shadow-sm">
            <MessageCircle className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <h3 className="text-[18px] font-extrabold text-slate-800 mb-2">WhatsApp Engine (N8N)</h3>
          <p className="text-[13px] text-slate-500 font-medium mb-5 leading-relaxed">
            Fluxo operante. Lida com perguntas primárias utilizando árvore de respostas programada do Chatwoot no seu chip oficial.
          </p>
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
             {onlineStatus.wp ? (
                <span className="text-[11px] font-bold text-slate-400">Status Gateway: <span className="text-emerald-500">Rodando</span></span>
             ) : (
                <span className="text-[11px] font-bold text-slate-400">Status Gateway: <span className="text-rose-500">Parado</span></span>
             )}
            <button onClick={() => setSetupModal('wp')} className="text-[12px] uppercase font-black text-[#0095ff] hover:underline">Setup Chaves</button>
          </div>
        </div>

        {/* N8N Instagram Direct */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col group relative overflow-hidden transition-all hover:border-fuchsia-500/30 hover:shadow-fuchsia-500/10 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4">
             {onlineStatus.ig ? (
               <span className="flex items-center gap-1.5 text-[9px] uppercase font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> ONLINE</span>
            ) : (
               <span className="flex items-center gap-1.5 text-[9px] uppercase font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full"><div className="w-2 h-2 rounded-full bg-amber-500"/> OFFLINE</span>
            )}
          </div>
          <div className="w-14 h-14 bg-gradient-to-tr from-yellow-100 via-fuchsia-100 to-purple-100 border border-fuchsia-200 rounded-2xl flex items-center justify-center text-fuchsia-600 mb-5 shadow-sm">
            <Send className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <h3 className="text-[18px] font-extrabold text-slate-800 mb-2">Instagram Direct Sync</h3>
          <p className="text-[13px] text-slate-500 font-medium mb-5 leading-relaxed">
            Conecte a conta do Instagram. Mensagens vindas do canal Orgânico/Stories cairão em tempo real no módulo Omnichannel.
          </p>
          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            {onlineStatus.ig ? (
                <span className="text-[11px] font-bold text-slate-400">Meta Conectado: <span className="text-fuchsia-500">Ativo</span></span>
             ) : (
                <span className="text-[11px] font-bold text-slate-400">Intervenção: <span className="text-amber-500">Aguardando</span></span>
             )}
            <button onClick={() => setSetupModal('ig')} className="text-[12px] uppercase font-black text-fuchsia-500 hover:underline">Autenticar APP</button>
          </div>
        </div>

        {/* Integração MCP Avançada */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col group relative overflow-hidden transition-all hover:shadow-indigo-500/20 hover:-translate-y-1">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#0095ff] opacity-10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="absolute top-0 right-0 p-4 z-10">
            {onlineStatus.mcp ? (
               <span className="flex items-center gap-1.5 text-[9px] uppercase font-black text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/> CONECTADO</span>
            ) : (
               <span className="flex items-center gap-1.5 text-[9px] uppercase font-black text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 px-2 py-0.5 rounded-full"><Zap className="w-3 h-3 text-indigo-400 fill-indigo-400"/> DESCONECTADO</span>
            )}
          </div>
          <div className="w-14 h-14 bg-indigo-500/20 border border-indigo-500/40 rounded-2xl flex items-center justify-center text-indigo-400 mb-5 shadow-inner backdrop-blur-sm relative z-10">
            <Cpu className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <h3 className="text-[18px] font-extrabold text-white mb-2 relative z-10">Modelo MCP de IA</h3>
          <p className="text-[13px] text-slate-400 font-medium mb-5 leading-relaxed relative z-10">
            Interface Contextual. Libere o cérebro da OpenAI/Claude sobre a base RAG e regras de negócio cadastradas nos Serviços do CRM.
          </p>
          <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between relative z-10">
            {onlineStatus.mcp ? (
               <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400"/> Token Ativo Seguro</span>
            ) : (
               <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><Fingerprint className="w-3.5 h-3.5"/> Access Token: <span className="text-white blur-[3px] select-none">•••••••••••••</span></span>
            )}
            <button onClick={() => setSetupModal('mcp')} className="text-[12px] uppercase font-black text-[#0095ff] hover:text-indigo-300 transition-colors">GERAR CHAVE</button>
          </div>
        </div>
      </div>

      {/* Fluxogramas Integrados Demandados pelo Usuario */}
      <div className="mt-8 border-t border-slate-200 pt-8 shrink-0 pb-10">
        <h3 className="text-[20px] font-extrabold text-slate-800 mb-1 flex items-center gap-2">
          <Network className="w-6 h-6 text-[#0095ff]" />
          Visualização de Fluxos Ativos (Pipelines)
        </h3>
        <p className="text-slate-500 text-sm font-medium mb-6">Mapeamento dinâmico de todas as automações transitando dados no ERP hoje.</p>
        
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[11px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Ponto de Entrada (Trigger)</th>
                <th className="px-6 py-4">Camada Lógica Intermediária</th>
                <th className="px-6 py-4">Alvo Final (Sistem / BD)</th>
                <th className="px-6 py-4 text-right">Status da Execução</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[13.5px] font-semibold text-slate-700">
              
              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-5 flex items-center gap-3">
                   <div className="w-9 h-9 bg-fuchsia-50 text-fuchsia-500 rounded-lg flex items-center justify-center border border-fuchsia-100"><Send className="w-4 h-4"/></div>
                   <span className="font-extrabold text-slate-800">Direct Instagram Recebido</span>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-wider border border-amber-200">N8n Webhook</span>
                     <ArrowRight className="w-3 h-3 text-slate-300"/>
                     <span className="text-[12px] text-slate-500 font-bold">Distribuição de Intenção RAG</span>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-md flex items-center justify-center border border-blue-100"><MessageCircle className="w-3.5 h-3.5"/></div>
                     <span className="text-[13px] font-bold text-slate-600">Omnichannel Inbox</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                   <span className="text-emerald-500 font-black text-[11px] uppercase tracking-widest flex items-center justify-end gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Em Operação Real</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-5 flex items-center gap-3">
                   <div className="w-9 h-9 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center border border-emerald-100"><MessageCircle className="w-4 h-4"/></div>
                   <span className="font-extrabold text-slate-800">Nova Mensagem WhatsApp</span>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-wider border border-indigo-200 flex items-center gap-1"><Cpu className="w-3 h-3"/> Agente MCP</span>
                     <ArrowRight className="w-3 h-3 text-slate-300"/>
                     <span className="text-[12px] text-slate-500 font-bold">Consulta VectorDB</span>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-slate-800 text-white rounded-md flex items-center justify-center"><FileJson className="w-3.5 h-3.5"/></div>
                     <span className="text-[13px] font-bold text-slate-600">Supabase API (Resumo Clínico)</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                   <span className="text-amber-500 font-black text-[11px] uppercase tracking-widest flex items-center justify-end gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"/> Calibrando Chaves</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-5 flex items-center gap-3">
                   <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center border border-blue-100"><Target className="w-4 h-4"/></div>
                   <span className="font-extrabold text-slate-800">Lead Clicou em Anúncio ADS</span>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-wider border border-amber-200 flex items-center gap-1"><GitMerge className="w-3 h-3"/> Meta Ads Sync</span>
                   </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-rose-50 text-rose-500 rounded-md flex items-center justify-center border border-rose-100"><Activity className="w-3.5 h-3.5"/></div>
                     <span className="text-[13px] font-bold text-slate-600">Inserido no Kanban (CRM)</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                   <span className="text-emerald-500 font-black text-[11px] uppercase tracking-widest flex items-center justify-end gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Em Operação Real</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Reativo Universal */}
      {setupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSetupModal(null)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
             <div className="p-8 pb-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="text-lg font-black text-slate-800">
                  {setupModal === 'wp' ? 'Ambiente N8n (WhatsApp)' : setupModal === 'ig' ? 'Sincronizar Meta App' : 'Token Contextual (MCP)'}
               </h3>
               <button onClick={() => setSetupModal(null)} className="text-slate-400 hover:text-slate-600 bg-white shadow-sm p-2 rounded-full"><X className="w-4 h-4"/></button>
             </div>
             
             <div className="p-8 pb-10">
                <form onSubmit={handleSaveSetup} className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[11px] uppercase tracking-widest font-black text-slate-500 pl-1">
                       {setupModal === 'mcp' ? 'Supabase JWT Bearer' : 'URL Gatilho (Production)'}
                     </label>
                     <input 
                       type="text" 
                       required
                       value={webhookUrl}
                       onChange={e => setWebhookUrl(e.target.value)}
                       placeholder={setupModal === 'mcp' ? "eyJhbGciOiJIUzI1NiI..." : "http://localhost:5678/webhook/..."} 
                       className="w-full px-5 py-4 bg-slate-50 border border-slate-200 shadow-inner rounded-2xl text-[14px] font-bold text-slate-800 focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff] outline-none transition-all" 
                     />
                   </div>
                   {setupModal === 'mcp' && (
                     <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-[13px] text-indigo-700 font-medium">
                       Esta chave dá acesso irrestrito ao agente de IA (OpenAI/Anthropic) ler protocolos locais e agendar fluxos no calendário.
                     </div>
                   )}
                   <button type="submit" className={`w-full py-4 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-lg transition-transform hover:-translate-y-0.5 mt-2 ${
                     setupModal === 'wp' ? 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600' : 
                     setupModal === 'ig' ? 'bg-gradient-to-tr from-fuchsia-500 to-rose-500 shadow-fuchsia-500/20 hover:opacity-90' : 
                     'bg-[#0095ff] shadow-[#0095ff]/20 hover:bg-[#007acc]'
                   }`}>
                     {setupModal === 'ig' ? 'Conectar Graph API Meta' : 'Vincular Webhook'}
                   </button>
                </form>
             </div>
          </div>
        </div>
      )}

    </div>
  )
}
