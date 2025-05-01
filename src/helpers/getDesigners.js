export const getDesigners = async (supabase) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('role', 'diseñador')

  if (error) {
    console.error('Error al obtener diseñadores:', error.message)
    return []
  }

  if (!data || data.length === 0) {
    console.warn('No se encontraron diseñadores')
    return []
  }

  return data
}