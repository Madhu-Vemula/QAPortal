import LoginPage from "../pages/Anonymous/Loginpage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/Error/NotFound";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { protectedRoutes } from "./routeConfig";
import { getUserEmailFromLocal, getUserRoleFromLocal } from "../utils/userUtils";
import { RoleConstants } from "../types/RoleConstants";
import { useEffect } from "react";
/**
 * @function AppRoutes
 * @description Defines all application routes with role-based protection and corresponding components.
 * @returns {React.JSX.Element}
 */

const AppRoutes: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();
    const userEmail = getUserEmailFromLocal();
    const userRole = getUserRoleFromLocal();

    const dashboardPath =
        userRole === RoleConstants.ADMIN
            ? "/admin"
            : userRole === RoleConstants.USER
                ? "/user"
                : "/login";

    useEffect(() => {
        if (window.location.pathname === "/") {
            if (userEmail) navigate(dashboardPath, { replace: true });
            else navigate("/login", { replace: true });
        }
    }, [userEmail, userRole, navigate, dashboardPath]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    userEmail ? (
                        <Navigate to={dashboardPath} replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route
                path="/login"
                element={
                    userEmail ? (
                        <Navigate to={dashboardPath} replace />
                    ) : (
                        <LoginPage />
                    )
                }
            />

            {protectedRoutes.map(({ path, role, routes }) => (
                <Route path={`/${path}`} key={path}>
                    {routes.map(({ path: subPath, element }) => (
                        <Route
                            key={subPath}
                            path={subPath}
                            element={
                                <ProtectedRoute role={role}>
                                    {element}
                                </ProtectedRoute>
                            }
                        />
                    ))}
                </Route>
            ))}

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default AppRoutes;
