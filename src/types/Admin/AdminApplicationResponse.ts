import type { ApplicationStatus } from "../Enums/ApplicationStatus";

export interface AdminApplicationData {
    id: number,
    userId: number,
    reason: string,
    status: ApplicationStatus,
    appliedAt: string,
    reviewedAt: string,
    reviewedByUserId: string
}
