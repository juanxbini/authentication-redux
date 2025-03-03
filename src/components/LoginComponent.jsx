import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth)


    const handleLogin = () => {
        dispatch({ type: 'LOGIN_REQUEST', payload: { email, password } })
    }

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }


    return (
        <div>
            <h2>Autenticación</h2>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {isAuthenticated ? (
                <>
                    <p>Usuario {user.name} autenticado</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
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
                    <button onClick={handleLogin}>Iniciar sesión</button>
                </>
            )}
        </div>
    )
}

export default LoginComponent