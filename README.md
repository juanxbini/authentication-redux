
# Redux Authentication

Este proyecto implementa autenticación de usuario utilizando **React, Redux Toolkit y Redux Thunk**.  
La estructura del código sigue un enfoque modular para separar responsabilidades y mejorar la escalabilidad.

---

## 📁 Estructura del Proyecto
```
/src 
├── /redux # Carpeta donde se maneja Redux │ 
├── /actions # Acciones que modifican el estado global │ 
│    ├── authActions.js # Acciones para autenticación │ 
├── /reducers # Reducers que manejan el estado global │ 
│    ├── authReducer.js # Reducer para autenticación │ 
├── store.js # Configuración del Store de Redux 
├── /components # Componentes reutilizables de la aplicación 
│    ├── LoginComponent.jsx # Componente de login y logout 
├── App.jsx # Componente principal 
├── main.jsx # Punto de entrada de React y conexión con Redux
```

---

## 📝 **Explicación de la Estructura**

### **1️⃣ Carpeta `/redux` (Manejo de Estado Global)**

Redux maneja el estado global de la aplicación. Aquí encontramos tres elementos principales:  
- **Acciones (`/actions`)** → Definen los eventos que modifican el estado.  
- **Reducers (`/reducers`)** → Especifican cómo cambia el estado ante cada acción.  
- **Store (`store.js`)** → Configura el estado global de la aplicación.

---

### **2️⃣ Acciones (`/redux/actions/authActions.js`)**
Las **acciones** son funciones que generan eventos para cambiar el estado de Redux.

📄 **`authActions.js`**
```
js
import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActionTypes';

// Acción para iniciar sesión
export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post('https://api.example.com/login', credentials);
        const { user, token } = response.data;

        localStorage.setItem('token', token); // Guardamos el token en localStorage

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user, token }
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? error.response.data.message : "Error desconocido"
        });
    }
};

// Acción para cerrar sesión
export const logout = () => (dispatch) => {
    localStorage.removeItem('token'); // Eliminamos el token de localStorage
    dispatch({ type: LOGOUT });
};
```
### 📌 Explicación:

- login() envía credenciales a una API y si la autenticación es exitosa, guarda el usuario y el token en el estado.
- logout() elimina el token y restablece el estado de autenticación.

## 3️⃣ Reducer (/redux/reducers/authReducer.js)
Los **reducers** son funciones puras que actualizan el estado según la acción recibida.

📄 **`authReducer.js`**

```
js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActionTypes';

// Estado inicial del reducer
const initialState = {
    user: null, 
    token: null, 
    isAuthenticated: false, 
    loading: false, 
    error: null 
};

// Reducer que maneja las acciones de autenticación
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { 
                ...state, 
                user: action.payload.user, 
                token: action.payload.token, 
                isAuthenticated: true, 
                loading: false 
            };
        case LOGIN_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
};

export default authReducer;
```

### 📌 Explicación:
- ✔ `LOGIN_REQUEST` → Indica que la autenticación está en proceso.
- ✔ `LOGIN_SUCCESS` → Guarda el usuario y el token en el estado global.
- ✔ `LOGIN_FAILURE` → Guarda el error si la autenticación falla.
- ✔ `LOGOUT` → Reinicia el estado.

## 4️⃣ Store (/redux/store.js)
El **store** centraliza el estado global y combina los reducers.

📄 **`store.js`**
```
js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer // Reducer de autenticación
    }
});
```
### 📌 Explicación:

- `configureStore()` de Redux Toolkit simplifica la configuración del store.
- Se define authReducer para manejar la autenticación.

### 5️⃣ Conectar Redux con la Aplicación (main.jsx)
📄 **`main.jsx`**
```
js
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Provee el store de Redux a la aplicación */}
    <App />
  </Provider>
);
```
### 📌 Explicación:
- ✔ `<Provider>` permite que Redux sea accesible en todos los componentes de la app.

### 6️⃣ Componente de Login (/components/LoginComponent.jsx)
📄 **`LoginComponent.jsx`**
```
js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/actions/authActions';

function LoginComponent() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector(state => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(login({ email, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <h2>Autenticación</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {isAuthenticated ? (
                <>
                    <p>Bienvenido, {user.name}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            ) : (
                <>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Iniciar sesión</button>
                </>
            )}
        </div>
    );
}
export default LoginComponent;
```

### 📌 Explicación:
- ✔ Usa `useSelector()` para leer el estado global (auth).
- ✔ Usa `useDispatch()` para enviar acciones de **login** y **logout**.
- ✔ Renderiza el formulario o los datos del usuario según el estado global.

## 🎯 Resumen
📌 Redux permite manejar el estado de autenticación de forma global y centralizada.
📌 Las acciones (authActions.js) disparan eventos que modifican el estado.
📌 El reducer (authReducer.js) actualiza el estado según las acciones recibidas.
📌 El store (store.js) almacena el estado global.
📌 El componente LoginComponent.jsx usa useSelector y useDispatch para interactuar con Redux.