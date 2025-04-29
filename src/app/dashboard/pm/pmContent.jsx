'use client'

import { useState } from 'react'
import '@/app/globals.css'

export default function PmContent({ email }) {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <h1 className="text-4xl text-red-500 font-bold bg-yellow-300">
        Pm {email}
      </h1>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Clicks: {count}
      </button>
    </div>
  )
}