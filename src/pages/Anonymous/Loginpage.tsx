// import { type ChangeEvent, useEffect, useState } from "react";
import palTechLogo from "../../assets/images/paltech_logo.png";
import palTechCover from "../../assets/images/paltech_cover.jpeg";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { RoleType } from "../../types/Enums/RoleType";
// import { ErrorMessages } from "../../utils/errorUtils";
// import { getUserRoleFromLocal } from "../../utils/userUtils";
// import type { LoginCredentials } from "../../types/Login/LoginCredentials";
// import type { LoginResponseData } from "../../types/Login/LoginResponse";
// import { RoleConstants } from "../../types/RoleConstants";
import GoogleSignInButton from "./GoogleSignInButton";

/**
 * @component Login
 * @description Renders the login form for user authentication.
 */
const LoginPage: React.FC = (): React.JSX.Element => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const userRole = getUserRoleFromLocal();
    //     if (userRole) {
    //         navigate(`/${userRole}/home`);
    //     }
    // }, [navigate]);

    // const [loginForm, setLoginForm] = useState<LoginCredentials>({
    //     email: "",
    //     passwordHash: ""
    // });
    // const [hasError, setHasError] = useState<boolean>(false);
    // const [errorMessage, setErrorMessage] = useState<string>("");
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { loginUser } = useAuth();

    /**
     * @function handleOnSubmit
     * @description Handles login form submission.
     */
    // const handleOnSubmit = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
    //     event.preventDefault();
    //     setErrorMessage("");
    //     setHasError(false);

    //     if (!loginForm.email || !loginForm.passwordHash) {
    //         setHasError(true);
    //         setErrorMessage(ErrorMessages.RequiredFields.REQUIRED_FIELDS);
    //         return;
    //     }

    //     setIsLoading(true);

    //     try {
    //         const data: LoginResponseData = await loginUser(loginForm);
    //         if (data) {

    //             switch (data.role) {
    //                 case RoleType.ADMIN:
    //                     navigate(`/${RoleConstants.ADMIN}`);
    //                     break;
    //                 case RoleType.USER:
    //                     navigate(`/${RoleConstants.USER}`);
    //                     break;
    //                 default:
    //                     setErrorMessage(ErrorMessages.LoginForm.INVALID_ROLE);
    //             }
    //         } else {
    //             setErrorMessage(ErrorMessages.LoginForm.INVALID_CREDENTIALS);
    //         }
    //     } catch (error: any) {
    //         console.error("Login error:", error);

    //         if (error.response?.status === 401) {
    //             setErrorMessage(ErrorMessages.LoginForm.INVALID_CREDENTIALS);
    //         } else if (error.response?.status === 404) {
    //             setErrorMessage(ErrorMessages.LoginForm.USER_NOT_FOUND);
    //         } else {
    //             setErrorMessage(ErrorMessages.NetworkError.NETWORK_ERROR);
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //     const emailValue = event.target.value;
    //     setLoginForm({ ...loginForm, email: emailValue });
    //     setErrorMessage("");
    // };

    // const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //     const passwordHashValue = event.target.value;
    //     setLoginForm({ ...loginForm, passwordHash: passwordHashValue });
    //     setErrorMessage("");
    // };

    return (
        // <div className="login-container">
        //     <img src={palTechCover} alt="company-cover-image" className="company-cover-image" />
        //     <div className="form-wrapper">
        //         <form onSubmit={handleOnSubmit} className="form-container login-form">
        //             <div className="form-header">
        //                 <img src={palTechLogo} alt="company-logo" className="company-logo" />
        //                 <h1>Login</h1>
        //             </div>

        //             <label htmlFor="email">Email<span className="required">*</span></label>
        //             <input
        //                 type="email"
        //                 id="email"
        //                 name="email"
        //                 value={loginForm.email}
        //                 onChange={handleEmailChange}
        //                 placeholder="Enter your email"
        //                 disabled={isLoading}
        //                 className={hasError && !loginForm.email ? "error" : ""}
        //             />
        //             {hasError && !loginForm.email && (
        //                 <span className="error-message">Email is required</span>
        //             )}

        //             <label htmlFor="passwordHash">Password<span className="required">*</span></label>
        //             <input
        //                 type="password"
        //                 id="passwordHash"
        //                 name="passwordHash"
        //                 value={loginForm.passwordHash}
        //                 onChange={handlePasswordChange}
        //                 placeholder="Enter your password"
        //                 disabled={isLoading}
        //                 className={hasError && !loginForm.passwordHash ? "error" : ""}
        //             />
        //             {hasError && !loginForm.passwordHash && (
        //                 <span className="error-message">Password is required</span>
        //             )}

        //             <button
        //                 type="submit"
        //                 className="button submit-btn"
        //                 disabled={isLoading}
        //             >
        //                 {isLoading ? "Logging in..." : "Submit"}
        //             </button>
        //             <Link to="/signup"><span>No account signup</span></Link>

        //             {errorMessage && <span className="error-message">{errorMessage}</span>}
        //         </form>
        //     </div>
        // </div>
        <div className="login-container">
            <img src={palTechCover} alt="company-cover-image" className="company-cover-image" />
            <div className="form-wrapper">
                <div className="form-container login-form">
                    <div className="form-header">
                        <img src={palTechLogo} alt="company-logo" className="company-logo" />
                        <h1>Login</h1>
                    </div>
                    <GoogleSignInButton />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;