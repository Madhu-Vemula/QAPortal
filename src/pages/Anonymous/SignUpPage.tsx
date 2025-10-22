// import { type ChangeEvent, useEffect, useState } from "react";
// import palTechLogo from "../../assets/images/paltech_logo.png";
// import palTechCover from "../../assets/images/paltech_cover.jpeg";
// import { useNavigate } from "react-router-dom";
// import { ErrorMessages } from "../../utils/errorUtils";
// import { getUserRoleFromLocal } from "../../utils/userUtils";
// import type { SignUpForm } from "../../types/SignUp/signUpForm";
// import { RoleType } from "../../types/Enums/RoleType";
// import { useSignUp } from "../../hooks/useSignUp";

// /**
//  * @component Login
//  * @description Renders the login form for user authentication.
//  */
// const SignUpPage: React.FC = (): React.JSX.Element => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userRole = getUserRoleFromLocal();
//         if (userRole) {
//             navigate(`/${userRole}/home`);
//         }
//     }, [navigate]);

//     const [signUpForm, setSignUpForm] = useState<SignUpForm>({
//         firstName: "",
//         lastName: "",
//         email: "",
//         passwordHash: "",
//         role: RoleType.NONE
//     });
//     const [hasError, setHasError] = useState<boolean>(false);
//     const [errorMessage, setErrorMessage] = useState<string>("");
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const { signUpUser } = useSignUp();

//     /**
//      * @function handleOnSubmit
//      * @description Handles login form submission.
//      */
//     const handleOnSubmit = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
//         event.preventDefault();
//         setErrorMessage("");
//         setHasError(false);

//         if (!signUpForm.email ||
//             !signUpForm.firstName ||
//             !signUpForm.lastName ||
//             !signUpForm.passwordHash ||
//             signUpForm.role == RoleType.NONE) {
//             setHasError(true);
//             setErrorMessage(ErrorMessages.RequiredFields.REQUIRED_FIELDS);
//             return;
//         }

//         setIsLoading(true);

//         try {
//             await signUpUser(signUpForm);
//             navigate("/")
//         } catch (error: any) {
//             console.error("Login error:", error);

//             if (error.response?.status === 401) {
//                 setErrorMessage(ErrorMessages.SignUpForm.INVALID_CREDENTIALS);
//             } else if (error.response?.status === 404) {
//                 setErrorMessage(ErrorMessages.CatchError);
//             } else {
//                 setErrorMessage(ErrorMessages.NetworkError.NETWORK_ERROR);
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };
//     const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const firstNameValue = event.target.value;
//         setSignUpForm({ ...signUpForm, firstName: firstNameValue });
//         setErrorMessage("");
//     };
//     const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const lastNameValue = event.target.value;
//         setSignUpForm({ ...signUpForm, lastName: lastNameValue });
//         setErrorMessage("");
//     };

//     const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const emailValue = event.target.value;
//         setSignUpForm({ ...signUpForm, email: emailValue });
//         setErrorMessage("");
//     };

//     const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
//         const roleValue = Number(event.target.value) as RoleType;
//         setSignUpForm({ ...signUpForm, role: roleValue });
//         setErrorMessage("");
//     };

//     const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const passwordValue = event.target.value;
//         setSignUpForm({ ...signUpForm, passwordHash: passwordValue });
//         setErrorMessage("");
//     };

//     return (
//         <div className="login-container">
//             <img src={palTechCover} alt="company-cover-image" className="company-cover-image" />
//             <div className="form-wrapper">
//                 <form onSubmit={handleOnSubmit} className="form-container login-form">
//                     <div className="form-header">
//                         <img src={palTechLogo} alt="company-logo" className="company-logo" />
//                         <h1>Sign Up</h1>
//                     </div>
//                     <label htmlFor="first-name">FirstName<span className="required">*</span></label>
//                     <input
//                         type="text"
//                         id="first-name"
//                         name="first-name"
//                         value={signUpForm.firstName}
//                         onChange={handleFirstNameChange}
//                         placeholder="Enter your first name"
//                         disabled={isLoading}
//                         className={hasError && !signUpForm.email ? "error" : ""}
//                     />
//                     {hasError && !signUpForm.firstName && (
//                         <span className="error-message">First Name is required</span>
//                     )}

//                     <label htmlFor="last-name">LastName<span className="required">*</span></label>
//                     <input
//                         type="text"
//                         id="last-name"
//                         name="last-name"
//                         value={signUpForm.lastName}
//                         onChange={handleLastNameChange}
//                         placeholder="Enter your last name"
//                         disabled={isLoading}
//                         className={hasError && !signUpForm.email ? "error" : ""}
//                     />
//                     {hasError && !signUpForm.lastName && (
//                         <span className="error-message">Last name is required</span>
//                     )}

//                     <label htmlFor="email">Email<span className="required">*</span></label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={signUpForm.email}
//                         onChange={handleEmailChange}
//                         placeholder="Enter your email"
//                         disabled={isLoading}
//                         className={hasError && !signUpForm.email ? "error" : ""}
//                     />
//                     {hasError && !signUpForm.email && (
//                         <span className="error-message">Email is required</span>
//                     )}

//                     <label htmlFor="assign-role">Assign Role<span className="required">*</span></label>
//                     <select
//                         id="assign-role"
//                         value={signUpForm.role}
//                         onChange={handleRoleChange}
//                         className={hasError && !signUpForm.email ? "error" : ""}
//                     >
//                         <option value="">Select role</option>
//                         <option value={RoleType.USER}>User</option>
//                         <option value={RoleType.ADMIN}>Admin</option>
//                     </select>
//                     {hasError && !signUpForm.role && (
//                         <span className="error-message">Role is required</span>
//                     )}


//                     <label htmlFor="password">Password<span className="required">*</span></label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={signUpForm.passwordHash}
//                         onChange={handlePasswordChange}
//                         placeholder="Enter your password"
//                         disabled={isLoading}
//                         className={hasError && !signUpForm.passwordHash ? "error" : ""}
//                     />
//                     {hasError && !signUpForm.passwordHash && (
//                         <span className="error-message">Password is required</span>
//                     )}

//                     <button
//                         type="submit"
//                         className="button submit-btn"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Logging in..." : "Submit"}
//                     </button>

//                     {errorMessage && <span className="error-message">{errorMessage}</span>}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;