import type { RoleType } from "../Enums/RoleType";

export interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: RoleType;
}
