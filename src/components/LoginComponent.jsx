import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { login } from '../redux/actions/authActions'

const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth)
    /*
     * useSelector es un hook de React-Redux 
     * que permite acceder al estado global del store 
     * en cualquier componente funcional.
     */ 

    
    // Manejador de inicio de sesión
    const handleLogin = () => {
        // Llamamos a la acción login con los datos del usuario
        dispatch(login({ email, password }))
    }

    // Manejador de cierre de sesión
    const handleLogout = () => {
        // Llamamos a la acción logout
        dispatch(logout())
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