export const metadata = {
  title: 'Grayola App',
  description: 'Gestión de proyectos de diseño',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
