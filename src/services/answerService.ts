import type { ApiResponse } from "../types/ApiResponse";
import rootApi from "./rootService";
import type { AnswerUploadRequest } from "../pages/Answers/AnswerForm";
import type { AnswerResponse } from "../types/Answers/AnswerPostApplicationResponse";
import type { AnswerDeleteRequest } from "../pages/Answers/AnswerCard";
import type { AnswerVotePostRequest } from "../types/Answers/AnswerVotePostRequest";
import type { QuestionResponseData } from "../types/Questions/QuestionPostApplicationResponse";

const answerUrl = "answers"

const answerAPi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAnswers: builder.query<ApiResponse<AnswerResponse[]>, number>({
            query: (questionId) => ({
                url: `/questions/${questionId}/${answerUrl}`,
            }),
            providesTags:['Answer']
        }),
        getAnswer: builder.query<ApiResponse<AnswerResponse>, number>({
            query: (id) => ({
                url: `${answerUrl}/${id}`,
            }),
            providesTags:['Answer']
        }),
        getAnswerByUser: builder.query<ApiResponse<AnswerResponse[]>, void>({
            query: () => ({
                url: `${answerUrl}/userId`,
            }),
            providesTags:['Answer']
        }),
        postAnswer: builder.mutation<ApiResponse<AnswerResponse>, AnswerUploadRequest>({
            query: (data) => {
                const { questionId, ...postData } = data
                return {
                    url: `/questions/${questionId}/${answerUrl}`,
                    method: 'POST',
                    body: postData
                }
            },
            invalidatesTags: ["Answer"]
        }),
        putAnswer: builder.mutation<ApiResponse<AnswerResponse>, AnswerUploadRequest>({
            query: (data) => {
                const { answerId, ...postData } = data
                return {
                    url: `${answerUrl}/${answerId}`,
                    method: 'PUT',
                    body: postData
                }
            },
            invalidatesTags: ["Answer"]
        }),
        deleteAnswer: builder.mutation<ApiResponse<null>, AnswerDeleteRequest>({
            query: (data) => {
                const { answerId } = data
                return {
                    url: `${answerUrl}/${answerId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ["Answer"]
        }),
        postAnswerVote:builder.mutation<ApiResponse<null>,AnswerVotePostRequest>({
            query:(data)=>({
                url:`${answerUrl}/answer-vote`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Answer']
        }),
        getQuestionByAnswer: builder.query<ApiResponse<QuestionResponseData>, number>({
            query: (answerId) => ({
                url: `${answerUrl}/${answerId}/question`,
            }),
            providesTags:['Answer']
        }),
    })
})

export const {
    useGetAllAnswersQuery,
    useGetAnswerQuery,
    useGetQuestionByAnswerQuery,
    useLazyGetQuestionByAnswerQuery,
    useLazyGetAnswerQuery,
    useGetAnswerByUserQuery,
    usePostAnswerMutation,
    usePutAnswerMutation,
    useDeleteAnswerMutation,
    usePostAnswerVoteMutation
} = answerAPi;