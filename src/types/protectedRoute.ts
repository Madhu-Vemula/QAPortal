
/**
 * @interface ProtectedRouteProps
 * @description Props for protecting routes based on user roles.
 * @property {React.ReactNode} children - Child components to render
 * @property {string} role - Required role to access the route
 */
export interface ProtectedRouteProps {
    children: React.ReactNode;
    role: string;
  }