'use client'
import { useState } from 'react'
import { supabase } from '@/app/services/supabaseClient'
import { v4 as uuid } from 'uuid'

export default function NewProjectForm({ userId }) {
  const [title, setTitle] = useState('')
  const [desc,  setDesc ] = useState('')
  const [files, setFiles] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. subir archivos
    const urls = []
    for (const file of files) {
      const path = `${userId}/${uuid()}-${file.name}`
      const { data, error } = await supabase
        .storage.from('project-files').upload(path, file)
      if (error) console.error(error)
      else urls.push(data.path)
    }

    // 2. insertar proyecto
    await supabase.from('projects').insert({
      title, description: desc, files: urls, created_by: userId
    })

    setTitle(''); setDesc(''); setFiles([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="font-bold">Nuevo proyecto</h2>
      <input
        className="border p-2 w-full"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Descripción"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        onChange={e => setFiles([...e.target.files])}
      />
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Crear
      </button>
    </form>
  )
}