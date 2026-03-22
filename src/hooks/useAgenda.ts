import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Agendamento = Database['public']['Tables']['agendamentos']['Row']

export function useAgenda() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['agendamentos'],
    queryFn: async () => {
      // Fazendo leitura inteligente com JOIN na tabela de Pacientes para exibir Nomes na grade
      const { data, error } = await supabase
        .from('agendamentos')
        .select(`
          *,
          pacientes_leads (nome, telefone)
        `)
        .order('data_hora', { ascending: true })

      if (error) {
         console.warn("Agenda Supabase Muted: ", error)
         return []
      }
      return data
    }
  })

  // Salvar novo Agendamento Disparado a partir da Modal Visual
  const mutationAgendar = useMutation({
    mutationFn: async (novoAgendamento: Database['public']['Tables']['agendamentos']['Insert']) => {
      const { data, error } = await supabase.from('agendamentos').insert([novoAgendamento]).select()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Re-trigger do calendário invisível ao usuário 
      queryClient.invalidateQueries({ queryKey: ['agendamentos'] })
    }
  })

  return { agendamentos: data || [], isLoading, mutationAgendar }
}
