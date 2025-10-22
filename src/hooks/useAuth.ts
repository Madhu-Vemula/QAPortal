// import { useGoogleLoginMutation } from "../services/authService";
// import type { ApiResponse } from "../types/ApiResponse";
// import { RoleType } from "../types/Enums/RoleType";
// import type { LoginCredentials } from "../types/Login/LoginCredentials";
// import type { LoginResponseData } from "../types/Login/LoginResponse";

// /**
//  * Custom authentication hook for handling user login
//  * @module useAuth
//  * @returns {Object} An object containing the loginUser function
//  * @property {Function} loginUser - Function to authenticate a user by email
//  */

// export const useAuth = () => {
//     const [loginUserMutation] = useGoogleLoginMutation();

//     const loginUser = async (credentials: LoginCredentials): Promise<LoginResponseData> => {
//         try {
//             const response: ApiResponse<LoginResponseData> = await loginUserMutation(credentials).unwrap();
//             const data = response.data;
//             sessionStorage.setItem('userRole', RoleType[data.role].toLowerCase());
//             sessionStorage.setItem('userEmail', data.email);
//             sessionStorage.setItem('token', data.token);
//             sessionStorage.setItem('isApproved', data.isApproved.toString())
//             sessionStorage.setItem('userName', data.firstName + " " + data.lastName)

//             return data;
//         } catch (error) {
//             throw error;
//         }
//     };

//     return {
//         loginUser
//     };
// };