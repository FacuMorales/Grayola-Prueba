'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { supabase } from '../services/supabaseClient'

export default function ProjectTable({ projects, editable, assignable, designers = [] }) {
  const [cards, setCards] = useState(projects)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedDesigners, setSelectedDesigners] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')


  const deleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id)
    setCards(cards.filter(p => p.id !== id))
  }

  const openAssignModal = (project) => {
    setSelectedProject(project)
    setSelectedDesigners(project.assigned_to ?? [])
    setIsOpen(true)
  }

  const openEditModal = (project) => {
    setSelectedProject(project)
    setEditTitle(project.title)
    setEditDescription(project.description ?? '')
    setIsEditOpen(true)
  }  

  const toggleDesigner = (id) => {
    setSelectedDesigners(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const saveAssignment = async () => {
    await supabase.from('projects').update({ assigned_to: selectedDesigners }).eq('id', selectedProject.id)
    setCards(cards.map(p => p.id === selectedProject.id ? { ...p, assigned_to: selectedDesigners } : p))
    setIsOpen(false)
  }

  const saveEdit = async () => {
    const updates = {
      title: editTitle,
      description: editDescription
    }
  
    await supabase.from('projects').update(updates).eq('id', selectedProject.id)
  
    setCards(cards.map(p =>
      p.id === selectedProject.id ? { ...p, ...updates } : p
    ))
  
    setIsEditOpen(false)
  }
  

  const getDesignerNames = (ids = []) => {
    if (!ids) return;
    const names = designers
      .filter(d => ids.includes(d.id))
      .map(d => d.name ?? d.email)
    return names.join(', ')
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cards.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{p.description}</p>
              <p className="text-gray-500 text-xs mb-3">Archivos: {p.files?.length ?? 0}</p>

              {(
                <span className="block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
                  Diseñadores: {getDesignerNames(p.assigned_to) ?? "Sin diseñadores asignados"}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              {assignable && (
                <button
                  className="w-full bg-indigo-500 text-white rounded-md p-2 text-sm hover:bg-indigo-600 transition"
                  onClick={() => openAssignModal(p)}
                >
                  Asignar diseñadores
                </button>
              )}

              {assignable && (
                <button
                  className="w-full bg-blue-500 text-white rounded-md p-2 text-sm hover:bg-blue-600 transition"
                  onClick={() => openEditModal(p)}
                >
                  Editar proyecto
                </button>
              )}

              {editable && (
                <button
                  className="w-full text-red-500 border border-red-200 rounded-md p-2 text-sm hover:bg-red-50 transition"
                  onClick={() => deleteProject(p.id)}
                >
                  Borrar proyecto
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal seleccionar diseñadores */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <Dialog.Title className="text-lg font-bold text-gray-700">Asignar diseñadores</Dialog.Title>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {designers.map(d => (
                <label key={d.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedDesigners.includes(d.id)}
                    onChange={() => toggleDesigner(d.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  {d.name ?? d.email}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={saveAssignment}
                className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 text-sm"
              >
                Guardar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal editar */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <Dialog.Title className="text-lg font-bold text-gray-700">Editar proyecto</Dialog.Title>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700 font-medium">
                Título
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 w-full border rounded-md p-2 text-sm"
                />
              </label>

              <label className="block text-sm text-gray-700 font-medium">
                Descripción
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  className="mt-1 w-full border rounded-md p-2 text-sm"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 text-sm"
              >
                Guardar cambios
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

    </>
  )
}
