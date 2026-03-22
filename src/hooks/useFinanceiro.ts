import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database'

export function useFinanceiroBase() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['financeiro'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financeiro_paciente')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) return []
      return data
    }
  })

  const mutationNovaTransacao = useMutation({
    mutationFn: async (transacao: Database['public']['Tables']['financeiro_paciente']['Insert']) => {
      const { data, error } = await supabase.from('financeiro_paciente').insert([transacao]).select()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financeiro'] })
      queryClient.invalidateQueries({ queryKey: ['paciente-360'] }) // Atualiza simultaneamente histórico de conta do Paciente
    }
  })

  return { transacoes: data || [], isLoading, mutationNovaTransacao }
}
