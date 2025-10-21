import type { QuestionStatus } from "../Enums/QuestionsStatus";

export interface ModifyQuestionStatusRequest {
    questionId:number
    questionStatus: QuestionStatus
    comments?: string
}