'use client'

import { useState } from 'react'
import NewProjectForm from '@/app/components/NewProjectForm'
import ProjectTable from '@/app/components/ProjectTable'
import '@/app/globals.css'

export default function ClienteContent({ email, id, projects }) {

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-red-500 font-bold bg-yellow-300">
        CLIENTE {email}
      </h1>
      <NewProjectForm userId={id} />
      <ProjectTable projects={projects} editable />
    </div>
  )
}