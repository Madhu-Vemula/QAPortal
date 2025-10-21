import type { ApplyForAdminRequest } from "../pages/User/AdminForm";
import type { ApplyForQuestionPostRequest } from "../pages/User/QuestionForm";
import type { AdminApplicationData } from "../types/Admin/AdminApplicationResponse";
import type { ApiResponse } from "../types/ApiResponse";
import type { QuestionPostApplicationResponse } from "../types/Questions/QuestionPostApplicationResponse";
import type { UserData } from "../types/User/user";
import rootApi from "./rootService";

const userUrl = "users"

const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        applyForAdmin: builder.mutation<ApiResponse<AdminApplicationData>, ApplyForAdminRequest>({
            query: (data) => ({
                url: `${userUrl}/apply-admin`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Admin']
        }),
        applyForPostQuestion: builder.mutation<ApiResponse<QuestionPostApplicationResponse>, ApplyForQuestionPostRequest>({
            query: (data) => ({
                url: `${userUrl}/apply-questions`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:['Question']
        }),
        getUserById: builder.query<ApiResponse<UserData>, number>({
            query: (id) => ({
                url: `${userUrl}/${id}`
            }),
            providesTags:['User']
        })
    })
})

export const {
    useApplyForAdminMutation,
    useApplyForPostQuestionMutation,
    useGetUserByIdQuery
} = userApi;