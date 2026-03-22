"use client"

import { useState } from "react"
import { Switch } from "../ui/Switch"
import { LucideIcon } from "lucide-react"

interface ModuleCardProps {
  title: string
  description: string
  icon: LucideIcon
  defaultActive?: boolean
}

export function ModuleCard({ title, description, icon: Icon, defaultActive = false }: ModuleCardProps) {
  const [active, setActive] = useState(defaultActive)

  return (
    <div className={`flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-300 ${
      active ? "border-primary/40 bg-primary/5" : "bg-card text-card-foreground"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <Switch checked={active} onCheckedChange={setActive} />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
        <span className={active ? "text-primary font-medium" : "text-muted-foreground"}>
          {active ? "Módulo Ativo" : "Módulo Inativo"}
        </span>
      </div>
    </div>
  )
}
