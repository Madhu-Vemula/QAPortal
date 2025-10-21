import type { RoleType } from "../Enums/RoleType";

export interface UserData {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  role: RoleType;
  passwordHash: string;
}
