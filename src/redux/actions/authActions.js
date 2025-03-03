import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActionType';

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST }); // Iniciamos la petición
    try{
    // Hacemos la petición a la API
    const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
    
    // Extraemos los datos de la respuesta
    const { token, user } = response.data;

    // Guardamos el token en el localStorage
    localStorage.setItem('token', token);

    // Enviamos acción de éxito con los datos obtenidos
    dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: { user, token } 
    });

    }catch(error){
        // Enviamos acción de error con el mensaje de error
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token'); // Eliminamos el token del localStorage
    dispatch({ type: LOGOUT }); // Enviamos la acción de logout
}