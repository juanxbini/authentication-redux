
// Importar los tipos de acción LOGIN y LOGOUT desde el archivo actionTypes
import { LOGIN, LOGOUT } from './actionTypes';

// Definir dos funciones creadoras de acciones, login y logout, que devuelven objetos de acción con el tipo y la carga útil apropiados.

/** La función creadora de acciones de inicio de sesión toma un objeto de userData como argumento y devuelve un objeto de acción con el tipo establecido en LOGIN 
* y la carga útil establecida en el objeto de userData.
**/

// La función creadora de acciones de cierre de sesión no toma argumentos y devuelve un objeto de acción con el tipo establecido en LOGOUT.
// Estas funciones creadoras de acciones se exportan para que puedan ser utilizadas en otros archivos.
export const login = (userData) => ({
    type: LOGIN,
    payload: userData
});

export const logout = () => ({
    type: LOGOUT
});
