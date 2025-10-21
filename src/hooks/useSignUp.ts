// import { useSignUpUserMutation } from "../services/authService";
// import type { ApiResponse } from "../types/ApiResponse";
import type { SignUpForm } from "../types/SignUp/signUpForm";
// import type { SignUpFormResponse } from "../types/SignUp/SignUpFormResponse";

export const useSignUp = () => {
    // const [signUpForm] = useSignUpUserMutation();

    const signUpUser = async (signUpFormData: SignUpForm) => {
        try {
            // const response: ApiResponse<SignUpFormResponse> = await signUpForm(signUpFormData).unwrap();
            // return response.data;
            console.log("SignUp form data:", signUpFormData);
        } catch (error) {
            throw error;
        }
    };

    return {
        signUpUser
    };
};