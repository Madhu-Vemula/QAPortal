export interface AnswerResponse {
    id: number,
    content: string,
    createdAt: string,
    modifiedAt?: string,
    questionId: number,
    userId: number,
    upvoteCount: number,
    downvoteCount: number,
    parentId: number;
    replies?: AnswerResponse[];
}
