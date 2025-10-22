
// export const getUserRoleFromLocal = (): string  => {
//   return  localStorage.getItem('userRole')||"";
// };

import type { RoleType } from "../types/Enums/RoleType";
import { RoleConstants } from "../types/RoleConstants";

// export const getUserEmailFromLocal = (): string => {
//     return localStorage.getItem('userEmail') || '';
// };

// export const getUserApprovedFromLocal = (): string => {
//     return localStorage.getItem('isApproved') || '';
// };


// export const getUserNameFromLocal = (): string => {
//     return localStorage.getItem('userName') || '';
// };

// export const clearUserLocal = (): void => {
//     localStorage.clear();
// }
// export const getIsApprovedFromLocal = (): boolean => {
//     const value = localStorage.getItem("isApproved");
//     return value === "true";
// };

export const convertRoleToString = (role: RoleType | undefined): string => {
    switch (role) {
        case 1:
            return RoleConstants.USER;
        case 2:
            return RoleConstants.ADMIN;
        case 0:
        default:
            return RoleConstants.NONE;
    }
};