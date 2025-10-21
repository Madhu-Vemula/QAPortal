
export const getUserRoleFromLocal = (): string  => {
  return  localStorage.getItem('userRole')||"";
};

export const getUserEmailFromLocal = (): string => {
    return localStorage.getItem('userEmail') || '';
};

export const getUserApprovedFromLocal = (): string => {
    return localStorage.getItem('isApproved') || '';
};


export const getUserNameFromLocal = (): string => {
    return localStorage.getItem('userName') || '';
};

export const clearUserLocal = (): void => {
    localStorage.clear();
}
export const getIsApprovedFromLocal = (): boolean => {
    const value = localStorage.getItem("isApproved");
    return value === "true";
};