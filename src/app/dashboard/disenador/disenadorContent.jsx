'use client'
import ProjectTable from '@/app/components/ProjectTable'
import { useState } from 'react'
import {
  Home,
  Folder,
  Menu,
  ChevronLeft,
} from 'lucide-react'

export default function DiseñadorContent({ email, id, projects, designers }) {
  const [section, setSection] = useState('home')
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { id: 'home', label: 'Inicio', icon: <Home size={20} /> },
    { id: 'projects', label: 'Proyectos', icon: <Folder size={20} /> },
  ]

  return (
    <div className="flex h-full overflow-hidden bg-gradient-to-br from-yellow-100 via-cyan-200 to-gray-200">
      {/* Sidebar */}
      <aside
        className={`bg-[#D06CFF] shadow-lg p-4 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          {!collapsed && (
            <h2 className="text-2xl font-bold text-gray-800">Gestión</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-gray-600 hover:text-black"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 transition-colors ${
                section === item.id ? 'bg-gray-200 font-bold' : ''
              }`}
            >
              {item.icon}
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="mt-auto text-xs text-gray-500 pt-8 border-t text-center">
          {!collapsed && email}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-auto">
        {section === 'home' && (
          <div className="text-center mt-20">
            <h1 className="text-4xl font-extrabold text-gray-700 mb-4">
              Bienvenido a tu panel, diseñador 👋
            </h1>
            <p className="text-lg text-gray-600">
              Desde aquí podés gestionar tus proyectos fácilmente.
            </p>
          </div>
        )}

        {section === 'projects' && (
          <div className="max-w-4xl mx-auto">
            <ProjectTable projects={projects} designers={designers} />
          </div>
        )}
      </main>
    </div>
  )
}
