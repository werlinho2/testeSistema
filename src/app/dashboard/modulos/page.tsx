"use client"

import { ModuleCard } from "@/components/modulos/ModuleCard"
import { Bot, CalendarCheck, MessageSquareShare } from "lucide-react"

export default function ModulosPage() {
  const modulos = [
    {
      title: "Recepcionista IA",
      description: "Atendimento automático via WhatsApp 24/7 com agendamento inteligente e qualificação de leads.",
      icon: Bot,
      defaultActive: true,
    },
    {
      title: "Confirmação Anti-Faltas",
      description: "Disparos automáticos 24h antes da consulta para reduzir no-shows na sua clínica significativamente.",
      icon: CalendarCheck,
      defaultActive: false,
    },
    {
      title: "Remarketing Automático",
      description: "Recuperação de leads classificados como 'Perdidos' ou orçamentos não fechados no passado.",
      icon: MessageSquareShare,
      defaultActive: false,
    }
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Módulos do Sistema</h2>
        <p className="text-muted-foreground">Ative e desative funcionalidades do seu CRM Odontológico para os inquilinos.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((mod, idx) => (
          <ModuleCard key={idx} {...mod} />
        ))}
      </div>
    </div>
  )
}
