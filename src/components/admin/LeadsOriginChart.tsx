"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function LeadsOriginChart({ rawData }: { rawData: { origem_lead: string }[] }) {
  // LÓGICA DE PROCESSAMENTO DO PATIENT LEAD DASHBOARD (SUPABASE)
  // Processamento estático e aglutinação do Supabase RAW Row Array
  // Group By e Contagem por origem_lead (O N8n gera isso via UTM ou WhatsApp webhook origin)

  const processData = () => {
    const counts: Record<string, number> = {}
    rawData.forEach(row => {
      const origem = row.origem_lead || 'Não Catalogada'
      counts[origem] = (counts[origem] || 0) + 1
    })

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value) // Ordena do maior para menor representação
  }

  const data = processData()

  // Paleta de cores premium para os canais
  const COLORS = ['#0095ff', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#64748b']

  return (
    <div className="h-[280px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65} // Tranforma em Rosca (Donut)
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} Leads`, "Captação"]}
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 20px -3px rgb(0 0 0 / 0.15)", fontWeight: "bold", padding: "12px" }}
            itemStyle={{ color: "#334155", fontWeight: "900" }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={40} 
            iconType="circle"
            formatter={(value) => <span className="text-[13px] font-extrabold text-slate-700 ml-1.5">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
