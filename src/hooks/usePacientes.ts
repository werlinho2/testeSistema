import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Paciente = Database['public']['Tables']['pacientes_leads']['Row']

// Hook Master: Busca e lista base de Leads / Kanban
export function usePacientes() {
  const queryClient = useQueryClient()

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['pacientes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pacientes_leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
         console.warn("Supabase fetch error. Is the .env configured?", error)
         return [] // Retorna array vazio resiliente para não quebrar UI Mocks se o .ENV estiver zerado
      }
      return data as Paciente[]
    }
  })

  // Mutação para Alterar Status no Funil (Arrastar no Kanban)
  const mutationUpdateStatus = useMutation({
    mutationFn: async ({ id, status_funil }: { id: string, status_funil: string }) => {
      const { data, error } = await supabase.from('pacientes_leads').update({ status_funil }).eq('id', id).select()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] }) // Invalida o cache renderizando o Kanban instantaneamente
    }
  })

  return { pacientes: data || [], isLoading, isError, mutationUpdateStatus }
}

// Hook secundário: Patient 360 Aglutinador
export function usePaciente360(id: string) {
  return useQuery({
    queryKey: ['paciente-360', id],
    queryFn: async () => {
      if (!id) return null
      
      // Chamadas paralelas Otimizadas ao Banco
      const [pRes, logsRes, agendaRes, finRes] = await Promise.all([
        supabase.from('pacientes_leads').select('*').eq('id', id).single(),
        supabase.from('mensagens_logs').select('*').eq('paciente_id', id).order('timestamp', { ascending: true }),
        supabase.from('agendamentos').select('*').eq('paciente_id', id).order('data_hora', { ascending: false }),
        supabase.from('financeiro_paciente').select('*').eq('paciente_id', id)
      ])
      
      return { 
        paciente: pRes.data, 
        logs: logsRes.data || [], 
        agendamentos: agendaRes.data || [], 
        financeiro: finRes.data || [] 
      }
    },
    enabled: !!id
  })
}
