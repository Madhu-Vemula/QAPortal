import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/protectedRoute";
import { getUserEmailFromLocal, getUserRoleFromLocal } from "../utils/userUtils";
import UnAuthorized from "../pages/Error/UnAuthorized";
/**
 * @function ProtectedRoute
 * @description Protects a route based on the user's role stored in local storage.
 * @param {ProtectedRouteProps} param0 - Contains children components and the required role for access.
 * @returns {React.JSX.Element}
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }): React.JSX.Element => {
    const userEmail = getUserEmailFromLocal()
    const userRole = getUserRoleFromLocal()
    if (!userEmail) return <Navigate to="/login" />;

    if (userRole !== role) return <UnAuthorized />;
    return <>{children}</>;
};

export default ProtectedRoute;
