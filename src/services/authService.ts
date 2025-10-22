import type { ApiResponse } from "../types/ApiResponse";
// import type { LoginCredentials } from "../types/Login/LoginCredentials";
import type { LoginResponseData } from "../types/Login/LoginResponse";
// import type { SignUpForm } from "../types/SignUp/signUpForm";
// import type { SignUpFormResponse } from "../types/SignUp/SignUpFormResponse";
import type { GoogleAuthRequest } from "../pages/Anonymous/GoogleSignInButton";
import rootApi from "./rootService";

const authUrl = "auth"


export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `${authUrl}/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${authUrl}/login`,
        method: 'POST',
        body,
      }),
    }),
    googleLogin: builder.mutation<ApiResponse<LoginResponseData>, GoogleAuthRequest>({
      query: (request) => ({
        url: `${authUrl}/google`,
        method: 'POST',
        body: request,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGoogleLoginMutation } = authApi;


// const authApi = rootApi.injectEndpoints({
//     endpoints: (builder) => ({
//         /**
//        * @description Login user with email and password.
//        * @param {LoginCredentials} credentials - The login credentials.
//        * @returns {LoginResponse} The login response with user data.
//        */
//         loginUser: builder.mutation<ApiResponse<LoginResponseData>, LoginCredentials>({
//             query: (credentials) => ({
//                 url: `${authUrl}/login`,
//                 method: 'POST',
//                 body: credentials
//             }),
//             invalidatesTags: ["User"]
//         }),
//         signUpUser: builder.mutation<ApiResponse<SignUpFormResponse>, SignUpForm>({
//             query: (credentials) => ({
//                 url: `${authUrl}/register`,
//                 method: 'POST',
//                 body: credentials
//             }),
//             invalidatesTags: ["User"]
//         })
//     })
// })

// export const { useLoginUserMutation,
//     useSignUpUserMutation } = authApi;