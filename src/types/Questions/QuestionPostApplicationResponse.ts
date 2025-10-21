

import type { ApplicationStatus } from "../Enums/ApplicationStatus";

export interface QuestionPostApplicationResponse {
    id: number,
    userId: number,
    reason: string,
    status: ApplicationStatus,
    appliedAt: string,
    reviewedAt?: string,
    reviewedByUserId?: number
}

export interface QuestionResponseData {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    modifiedAt?: string,
    isClosed: boolean
    viewCount: number,
    userId: number,
    status:ApplicationStatus,
    comments?:string
}
