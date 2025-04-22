export async function validateUserRole(supabase, userId, expectedRole) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !data || data.role !== expectedRole) {
    return false
  }

  return true
}