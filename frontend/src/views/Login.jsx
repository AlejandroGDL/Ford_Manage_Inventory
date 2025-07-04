import React from 'react'

function Login() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-2xl font-bold text-primary mb-4">Iniciar Sesión</h1>
        <p className="text-muted-foreground">Bienvenido al sistema de gestión</p>
      </div>
    </div>
  )
}

export default Login