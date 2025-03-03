import React from 'react'

const LoginComponent = () => {
  return (
    <div>
        <h2>Autenticación</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {isAuthenticated ? (
            <>
                <p>Usuario autenticado</p>
                <button onClick={logout}>Cerrar sesión</button>
            </>
        ) : (
            <>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={login}>Iniciar sesión</button>
            </>
        )}
    </div>
  )
}

export default LoginComponent