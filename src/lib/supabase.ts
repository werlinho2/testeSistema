import { createClient } from '@supabase/supabase-js'

/**
 * CLIENTE SUPABASE FRONT-END COMPARTILHADO ⚡
 * Essa engrenagem servirá de ponte direta das Action Server-Side e do React Client
 * para o Data Warehouse de Produção Oficial recém criado.
 * 
 * INSTRUÇÕES PARA O DEV:
 * 1. Renomeie o arquivo `.env.local.example` para `.env.local`
 * 2. Cole a URL de Produção do Supabase: NEXT_PUBLIC_SUPABASE_URL
 * 3. Cole a Anon Public API Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sua-url-de-producao.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sua-chave-anon-gigantesca'

// Força um warning robusto no painel node caso operem o SaaS sem injetar a Infra nas Váriáveis de SO.
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn("⚠️ ALERTA ARQUITETURAL: NEXT_PUBLIC_SUPABASE_URL Não foi estipulado no Arquivo .env! A Nuvem está desativada.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
