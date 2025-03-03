import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

// Creamos el store de Redux con el reducer de autenticación
const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;