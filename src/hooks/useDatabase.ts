import type { Item } from '@/types'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://co8ioji5g6hfi0gtjq5g.baseapi.memfiredb.com'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiZXhwIjozMjg5MjAxNDg2LCJpYXQiOjE3MTI0MDE0ODYsImlzcyI6InN1cGFiYXNlIn0.x2s_acCimrb0WUrj_innJ2_NLSJL4m72ncseqsZBP7Y'
const supabase = createClient(supabaseUrl, supabaseKey)

function getAll(): Promise<Item[]> {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.from('tsd').select('*')
    error ? reject(error) : resolve(data)
  })
}

function add(value: Item) {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.from('tsd').insert([value]).select()
    error ? reject(error) : resolve(data)
  })
}

export default () => ({
  getAll,
  add,
})
