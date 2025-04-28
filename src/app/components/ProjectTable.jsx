'use client'
import { useState } from 'react'
import { supabase } from '../services/supabaseClient'

export default function ProjectTable({ projects, editable, assignable, designers }) {
  const [rows, setRows] = useState(projects)

  /* --- acciones directas con el SDK --- */
  const deleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id)
    setRows(rows.filter(p => p.id !== id))
  }

  const assignDesigner = async (id, designerId) => {
    await supabase.from('projects').update({ assigned_to: designerId }).eq('id', id)
    setRows(rows.map(p => p.id === id ? { ...p, assigned_to: designerId } : p))
  }

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2">Título</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Archivos</th>
            {assignable && <th className="p-2">Asignar</th>}
            {editable   && <th className="p-2">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {rows.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.description}</td>
              <td className="p-2">{p.files?.length ?? 0}</td>

              {assignable && (
                <td className="p-2">
                  <select
                    className="border rounded p-1"
                    defaultValue={p.assigned_to ?? ''}
                    onChange={e => assignDesigner(p.id, e.target.value)}
                  >
                    <option value="">—</option>
                    {designers.map(d => (
                      <option key={d.id} value={d.id}>{d.name ?? d.email}</option>
                    ))}
                  </select>
                </td>
              )}

              {editable && (
                <td className="p-2 space-x-2">
                  {/* Botón Borrar por simplicidad */}
                  <button
                    className="text-red-600"
                    onClick={() => deleteProject(p.id)}
                  >
                    Borrar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}