"use client"

import { useState } from "react"
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Plus, X, Calendar as CalendarIcon, Clock, User } from "lucide-react"

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const MOCK_EVENTS = [
  { id: 1, title: "Limpeza - João Silva", start: new Date(2026, 0, 15, 9, 0), end: new Date(2026, 0, 15, 10, 0), type: "consulta" },
  { id: 2, title: "Avaliação - Maria O.", start: new Date(2026, 0, 16, 14, 30), end: new Date(2026, 0, 16, 15, 30), type: "avaliacao" },
  { id: 3, title: "Canal - Ana Santos", start: new Date(2026, 0, 20, 16, 0), end: new Date(2026, 0, 20, 18, 0), type: "procedimento" },
]

export default function AgendaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState(MOCK_EVENTS)
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "09:00" })

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.date) return

    const [year, month, day] = newEvent.date.split('-')
    const [hours, minutes] = newEvent.time.split(':')
    const start = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes))
    const end = new Date(start.getTime() + 60 * 60 * 1000) // Default 1 hour 

    // State Update UI: Agora a Agenda Funciona arrastando/criando evento!
    setEvents([...events, { id: Date.now(), title: newEvent.title, start, end, type: "consulta" }])
    setIsModalOpen(false)
    setNewEvent({ title: "", date: "", time: "09:00" })
  }

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#0095ff' 
    if (event.type === 'avaliacao') backgroundColor = '#f59e0b'
    if (event.type === 'procedimento') backgroundColor = '#10b981'

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.95,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '2px 6px'
      }
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[90vh] flex flex-col relative overflow-hidden">
      {/* Header Dinâmico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-[25px] font-extrabold tracking-tight text-slate-800 leading-none">Agenda Interativa da Clínica</h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Motor de Calendário Ativado! Clique no botão "+" ou em um dia vázio na grade para Agendar as consultas diretamente na View.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-[#0095ff]/20 hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Calendário 100% Funcional React-Big-Calendar */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 overflow-hidden p-6 [&_.rbc-today]:bg-[#0095ff]/5 [&_.rbc-header]:py-2 [&_.rbc-header]:font-extrabold [&_.rbc-header]:text-slate-500 [&_.rbc-event]:shadow-sm">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', fontFamily: 'inherit', border: 'none' }}
          culture="pt-BR"
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Relatório Mensal"
          }}
          eventPropGetter={eventStyleGetter}
          popup
          selectable
          onSelectSlot={(slotInfo) => {
            setNewEvent({ ...newEvent, date: format(slotInfo.start, 'yyyy-MM-dd') })
            setIsModalOpen(true)
          }}
        />
      </div>

      {/* Slide-over de Agendamento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
              <div>
                <h3 className="text-[20px] font-extrabold text-slate-800 leading-none">Agendar Consulta</h3>
                <p className="text-[12px] font-medium text-slate-400 mt-1">O evento entrará auto-magicamente na grade visual.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2.5 rounded-full transition-colors">
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]/50">
              <form id="agendaForm" onSubmit={handleAddEvent} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[12px] uppercase tracking-wider font-extrabold text-slate-600 flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Título / Paciente Principal</label>
                  <input 
                    type="text" 
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] rounded-xl text-[14px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" 
                    placeholder="Ex: Dra. Marta - Cirurgia João Silva" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase tracking-wider font-extrabold text-slate-600 flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5"/> Data Atribuída</label>
                    <input 
                      type="date" 
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 shadow-sm rounded-xl text-[14px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase tracking-wider font-extrabold text-slate-600 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Horário Inicial</label>
                    <input 
                      type="time" 
                      required
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 shadow-sm rounded-xl text-[14px] font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0095ff]/30 focus:border-[#0095ff]" 
                    />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-8 py-6 border-t border-slate-100 bg-white flex items-center justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-widest text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                Cancelar e Fechar
              </button>
              <button type="submit" form="agendaForm" className="px-7 py-3.5 bg-[#0095ff] hover:bg-[#007acc] text-white rounded-xl text-[13px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-[#0095ff]/30">
                Lançar na Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
