import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from '../../services/authService';
import { RoleType } from '../../types/Enums/RoleType';
import { RoleConstants } from '../../types/RoleConstants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';
export interface GoogleAuthRequest {
    token: string;
}
const GoogleSignInButton: React.FC = () => {
    const [googleLogin] = useGoogleLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSuccess = async (credentialResponse: any) => {
        const token: string = credentialResponse?.credential;
        if (!token) return;

        try {
            const request: GoogleAuthRequest = { token };
            const result = await googleLogin(request).unwrap();

            dispatch(setToken(result.data.token))

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
        <div className="google-login-container">
            <GoogleLogin
                useOneTap={false}
                onSuccess={handleSuccess}
                onError={() => console.log('Google login failed')}
            />
        </div>
    );
};

export default GoogleSignInButton;
