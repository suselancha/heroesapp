import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    //Propiedades
    isAuthenticated,
    component: Component, //El componente, lo renombro con Mayuscula sino lo toma como un html
    ...rest //resto de propiedades
}) => {
    return (
        <Route { ...rest }
            component={ (props) => (
                ( !isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/" /> )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
