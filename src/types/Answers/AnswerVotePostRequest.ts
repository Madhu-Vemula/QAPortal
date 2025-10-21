import type { VoteType } from "../Enums/VoteType";

export interface AnswerVotePostRequest {
    voteType: VoteType,
    answerId: number
}