export async function getProjectsByRole(supabase, userId, role) {
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false })

    if (role === 'cliente')       query = query.eq('created_by', userId)
    else if (role === 'diseñador') query = query.eq('assigned_to', userId)
    // 'pm' ⇒ sin filtros

    const { data, error } = await query
    if (error) throw error
    return data
}  