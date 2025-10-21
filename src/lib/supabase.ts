import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Property {
  id: number
  title: string
  type: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  description: string
  active: boolean
  created_at?: string
  updated_at?: string
}