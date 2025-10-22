import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../../services/authService';
import { RoleType } from '../../types/Enums/RoleType';
import { RoleConstants } from '../../types/RoleConstants';
import { useNavigate } from 'react-router-dom';
export interface GoogleAuthRequest {
    token: string;
}
const GoogleSignInButton: React.FC = () => {
    const [googleLogin] = useGoogleLoginMutation();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: any) => {
        const token: string = credentialResponse?.credential;
        if (!token) return;

        try {
            const request: GoogleAuthRequest = { token };
            const result = await googleLogin(request).unwrap();

            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userRole', RoleType[result.data.role].toLowerCase());
            localStorage.setItem('userEmail', result.data.email);
            localStorage.setItem('isApproved', result.data.isApproved.toString());
            localStorage.setItem('userName', result.data.firstName + " " + result.data.lastName);

            switch (result.data.role) {
                case RoleType.ADMIN:
                    navigate(`/${RoleConstants.ADMIN}/home`);
                    break;
                case RoleType.USER:
                    navigate(`/${RoleConstants.USER}/home`);
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            console.error('Google Login Failed:', error);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <GoogleLogin
                useOneTap={false}
                onSuccess={handleSuccess}
                onError={() => console.log('Google login failed')}

            />
        </div>
    );
};

export default GoogleSignInButton;
