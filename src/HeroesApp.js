import React, { useReducer, useEffect } from 'react'
import { AppRoute } from './routers/AppRoute'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'


//Leer el storage
//Si existe devuelve datos, sino logged: false
const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const HeroesApp = () => {
    
    const [ user, dispatch ] = useReducer(authReducer, {}, init);

    //Cada vez q cambie el  usuario dispara la accion
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])
        
    return (
        <AuthContext.Provider value= {{ user, dispatch }}>
            <AppRoute />
        </AuthContext.Provider>
        
    )
}
