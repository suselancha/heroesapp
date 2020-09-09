import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoute } from './DashboardRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';

export const AppRoute = () => {

    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <Router>
            <div>
                
                <Switch>
                    <PublicRoute 
                        exac
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated = { user.logged }
                    />
                    <PrivateRoute 
                        path="/" 
                        component={ DashboardRoute } 
                        isAuthenticated = { user.logged }
                    />
                </Switch>
            </div>
        </Router>

    )
}
