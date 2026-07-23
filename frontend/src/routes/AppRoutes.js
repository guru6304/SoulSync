import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/auth/Login/LoginPage';
import RegisterPage from '../pages/auth/Register/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;