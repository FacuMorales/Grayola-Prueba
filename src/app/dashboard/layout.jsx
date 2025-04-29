import Header from '../components/Header'
import '@/app/globals.css'

export const metadata = { title: 'Dashboard | Grayola' }

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </section>
  )
}