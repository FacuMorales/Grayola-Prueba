import Header from '../components/Header'
import '@/app/globals.css'

export const metadata = { title: 'Dashboard | Grayola' }

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-yellow-100 via-cyan-200 to-gray-200">
        {children}
      </div>
    </section>
  )
}