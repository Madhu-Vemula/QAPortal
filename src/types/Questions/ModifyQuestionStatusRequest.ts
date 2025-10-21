import type { ApplicationStatus } from "../Enums/ApplicationStatus";

export interface ModifyQuestionStatusRequest {
    questionId:number
    questionStatus: ApplicationStatus
    comments?: string
}