import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/authActionType";

// Estado inicial
const initialState = {
    user: null, // Usuario autenticado
    token: localStorage.getItem('token'), // Token de autenticación
    isAuthenticated: false, // Flag de autenticación
    loading: false,     // Flag de carga
    error: null        // Flag de error
}

// Reducer de autenticación que maneja las acciones de login y logout
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export default authReducer;