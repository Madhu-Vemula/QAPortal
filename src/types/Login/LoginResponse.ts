import type { RoleType } from "../Enums/RoleType";

export interface LoginResponseData { 
  firstName:string,
  lastName:string,
  email: string;
  role: RoleType,
  token: string,
  isApproved:boolean
}
