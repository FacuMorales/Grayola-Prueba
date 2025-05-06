'use client'
import { useState } from 'react'
import { supabase } from '@/app/services/supabaseClient'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'

export default function NewProjectForm({ userId, setProjects, setSection }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [files, setFiles] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const toastId = toast.loading('Creando proyecto...')
  
    try {
      // 1. subir archivos
      const urls = []
      for (const file of files) {
        const path = `${userId}/${uuid()}-${file.name}`
        const { data, error } = await supabase
          .storage.from('project-files').upload(path, file)
  
        if (error) throw error
        urls.push(data.path)
      }
  
      // 2. insertar proyecto
      const {data: inserted, error: insertError } = await supabase.from('projects').insert({
        title, description: desc, files: urls, created_by: userId
      })
      .select()
  
      if (insertError) throw insertError
  
      setTitle('')
      setDesc('')
      setFiles([])
      setProjects(prev => [...prev, inserted[0]])
      setSection("projects")
  
      toast.success('Proyecto creado exitosamente!', { id: toastId })
    } catch (err) {
      console.error(err)
      toast.error('Ocurrió un error. Intenta nuevamente.', { id: toastId })
    }
  }
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Crear nuevo proyecto
      </h2>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600 text-sm font-semibold">Título</label>
        <input
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="Ej: Rediseño de página web"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600 text-sm font-semibold">Descripción</label>
        <textarea
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none h-32"
          placeholder="Agrega detalles importantes..."
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600 text-sm font-semibold">Archivos</label>
        <input
          type="file"
          multiple
          onChange={e => setFiles([...e.target.files])}
          className="text-sm text-gray-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg transition cursor-pointer"
      >
        Crear proyecto
      </button>
    </form>
  )
}
