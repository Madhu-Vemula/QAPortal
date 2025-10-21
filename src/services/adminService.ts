import type { AdminApplicationData } from "../types/Admin/AdminApplicationResponse";
import type { ModifyAdminStatusRequest, PendingAdmin } from "../types/Admin/PendingAdmin";
import type { ApiResponse } from "../types/ApiResponse";
import type { ModifyQuestionStatusRequest } from "../types/Questions/ModifyQuestionStatusRequest";
import type { ModifyQuestionPostRequest, PendingQuestionPost } from "../types/Questions/PendingQuestion";
import type { UserData } from "../types/User/user";
import rootApi from "./rootService";

const adminUrl = "admin";

const adminApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<ApiResponse<UserData[]>, void>({
            query: () => ({
                url: `${adminUrl}/users`,
            }),
            providesTags:['Admin']
        }),
        getAdminApplicationByUserId: builder.query<ApiResponse<AdminApplicationData>, void>({
            query: () => ({
                url: `${adminUrl}/users/admin-application`
            }),
            providesTags:['Admin']
        }),
        getPendingAdmins: builder.query<ApiResponse<PendingAdmin[]>, void>({
            query: () => ({
                url: `/${adminUrl}/pending-approvals`,
            }),
            providesTags:['Admin']
        }),
        getPendingQuestionPost: builder.query<ApiResponse<PendingQuestionPost[]>, void>({
            query: () => ({
                url: `/${adminUrl}/questions/pending-approvals`,
            }),
            providesTags:['Question']
        }),
        modifyApplication: builder.mutation<ApiResponse<PendingAdmin>, ModifyAdminStatusRequest>({
            query: (modifyAdminData) => {
                const { id, ...data } = modifyAdminData;
                return {
                    url: `/${adminUrl}/${id}/modify`,
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Admin']
        }),
        modifyQuestionPostApplication: builder.mutation<ApiResponse<PendingQuestionPost>, ModifyQuestionPostRequest>({
            query: (postQuestionData) => {
                const { id, ...data } = postQuestionData;
                return {
                    url: `/${adminUrl}/${id}/question-status-modify`,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ["Question", "Admin"]
        }),
        modifyQuestionStatus: builder.mutation<ApiResponse<null>, ModifyQuestionStatusRequest>({
            query: (modifyQuestionData) => {
                const { questionId, ...data } = modifyQuestionData
                return {
                    url: `${adminUrl}/${questionId}/modify-question`,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags:['Question']
        }),
        postUserData: builder.mutation<ApiResponse<UserData>, Omit<UserData, 'id'>>({
            query: (newUserData) => ({
                url: `${adminUrl}/users`,
                method: 'POST',
                body: newUserData
            }),
            invalidatesTags: ['Admin']
        }),
        modifyUserData: builder.mutation<ApiResponse<UserData>, UserData>({
            query: (modifyUserData) => {
                const { id, ...data } = modifyUserData
                return {
                    url: `${adminUrl}/users/${id}`,
                    method: 'PUT',
                    body: data
                }
            }, invalidatesTags: ['Admin']
        }
        ),
        deleteUser: builder.mutation<ApiResponse<null>, number>({
            query: (id) => ({
                url: `${adminUrl}/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags:['Admin']
        })
    })
})

export const {
    useGetAllUsersQuery,
    useGetPendingAdminsQuery,
    useModifyApplicationMutation,
    useGetAdminApplicationByUserIdQuery,
    useModifyQuestionPostApplicationMutation,
    useGetPendingQuestionPostQuery,
    useModifyQuestionStatusMutation,
    useModifyUserDataMutation,
    useDeleteUserMutation,
    usePostUserDataMutation
} = adminApi;