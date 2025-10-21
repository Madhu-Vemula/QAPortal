import type { ApplicationStatus } from "../Enums/ApplicationStatus";

export interface ModifyAdminStatusRequest {
    id?: number ,
    status: number
}

export interface PendingAdmin {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    role: string;
    reason: string;
    status: ApplicationStatus;
    createdAt: Date; 
    lastModifiedAt: Date | null;
    reviewedByUserId: number | null;
}
