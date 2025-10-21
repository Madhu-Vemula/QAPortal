import type { ApplicationStatus } from "../Enums/ApplicationStatus";

export interface ModifyQuestionPostRequest {
    id?:number,
    questionStatus: number
}

export interface PendingQuestionPost {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    reason: string;
    status: ApplicationStatus;
    createdAt: Date; 
    lastModifiedAt: Date | null;
    reviewedByUserId: number | null;
}
