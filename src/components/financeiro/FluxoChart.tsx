"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { name: "30/12", receitas: 0, despesas: 0 },
  { name: "01/01", receitas: 0, despesas: 0 },
  { name: "03/01", receitas: 0, despesas: 0 },
  { name: "05/01", receitas: 0, despesas: 0 },
  { name: "07/01", receitas: 0, despesas: 0 },
  { name: "09/01", receitas: 0, despesas: 0 },
  { name: "11/01", receitas: 0, despesas: 0 },
  { name: "13/01", receitas: 0, despesas: 0 },
  { name: "15/01", receitas: 0, despesas: 0 },
  { name: "17/01", receitas: 0, despesas: 0 },
  { name: "19/01", receitas: 0, despesas: 0 },
  { name: "21/01", receitas: 0, despesas: 0 },
  { name: "23/01", receitas: 0, despesas: 0 },
  { name: "25/01", receitas: 0, despesas: 0 },
  { name: "26/01", receitas: 0, despesas: 100 },
  { name: "27/01", receitas: 100, despesas: 0 },
]

export function FluxoChart() {
  return (
    <div className="h-[280px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#94a3b8" }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            tickFormatter={(value) => `R$${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
            labelStyle={{ fontWeight: "bold", color: "#64748b", marginBottom: "4px" }}
          />
          <Area 
            type="monotone" 
            dataKey="receitas" 
            stroke="#22c55e" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorReceitas)" 
          />
          <Area 
            type="monotone" 
            dataKey="despesas" 
            stroke="#ef4444" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorDespesas)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
