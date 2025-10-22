import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/protectedRoute";

import UnAuthorized from "../pages/Error/UnAuthorized";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { convertRoleToString } from "../utils/userUtils";

/**
 * @function ProtectedRoute
 * @description Protects a route based on the user's role stored in local storage.
 * @param {ProtectedRouteProps} param0 - Contains children components and the required role for access.
 * @returns {React.JSX.Element}
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }): React.JSX.Element => {
    const numericRole = useSelector((state: RootState) => state.auth.user?.role);
    const userRole=convertRoleToString(numericRole)
    const userEmail = useSelector((state: RootState) => state.auth.user?.email);
    if (!userEmail) return <Navigate to="/login" />;

    if (userRole !== role) return <UnAuthorized />;
    return <>{children}</>;
};

export default ProtectedRoute;
