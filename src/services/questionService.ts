import type { QuestionPostRequest } from "../pages/Questions/PostQuestionForm";
import type { QuestionDeleteRequest } from "../pages/Questions/QuestionCard";
import type { ApiResponse } from "../types/ApiResponse";
import type { PendingQuestionPost } from "../types/Questions/PendingQuestion";
import type { QuestionResponseData } from "../types/Questions/QuestionPostApplicationResponse";
import rootApi from "./rootService";

const questionUrl = "questions"

const questionAPi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuestions: builder.query<ApiResponse<QuestionResponseData[]>, void>({
            query: () => ({
                url: `${questionUrl}`,
            }),
            providesTags: ['Question']
        }),
        getQuestion: builder.query<ApiResponse<QuestionResponseData>, number>({
            query: (id) => ({
                url: `${questionUrl}/${id}`,
            }),
            providesTags: ['Question']
        }),
        postQuestion: builder.mutation<ApiResponse<QuestionResponseData>, QuestionPostRequest>({
            query: (data) => ({
                url: `${questionUrl}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Question"]
        }),
        putQuestion: builder.mutation<ApiResponse<QuestionResponseData>, QuestionPostRequest>({
            query: (data) => {
                const { id, ...putData } = data
                return {
                    url: `${questionUrl}/${id}`,
                    method: 'PUT',
                    body: putData
                }
            },
            invalidatesTags: ["Question"]
        }),
        getQuestionPostApplication: builder.query<ApiResponse<PendingQuestionPost>, void>({
            query: () => ({
                url: `${questionUrl}/question-post-application`
            }),
            providesTags: ['Question']
        }),
        getQuestionsByUser: builder.query<ApiResponse<QuestionResponseData[]>, void>({
            query: () => ({
                url: `${questionUrl}/questions-user`
            }),
            providesTags: ['Question']
        }),
        deleteQuestion: builder.mutation<ApiResponse<null>, QuestionDeleteRequest>({
            query: (data) => {
                const { questionId } = data
                return {
                    url: `${questionUrl}/${questionId}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ["Question"]
        }),
        increaseViewCount: builder.mutation<ApiResponse<null>, number>({
            query: (questionId) => ({
                url: `${questionUrl}/${questionId}/increase-view-count`,
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ['Question']
        })
    })
})

export const {
    useGetAllQuestionsQuery,
    useGetQuestionQuery,
    useLazyGetQuestionQuery,
    usePostQuestionMutation,
    useGetQuestionPostApplicationQuery,
    useGetQuestionsByUserQuery,
    usePutQuestionMutation,
    useDeleteQuestionMutation,
    useIncreaseViewCountMutation
} = questionAPi;