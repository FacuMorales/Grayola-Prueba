import { Toaster } from 'react-hot-toast'

export default async function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  )
}
