import { NavLink, useNavigate } from "react-router-dom";
import palTechLogoNew from "../../assets/images/paltech_logo_new.svg";
import React, { useState } from "react";
import { RoleConstants } from "../../types/RoleConstants";
import navCrossIcon from "../../assets/icons/cross-icon.png";
import navBarIcon from "../../assets/icons/nav-bar-icon.svg";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { convertRoleToString } from "../../utils/userUtils";

/** 
 * @description
 * Renders the navigation bar component.
 * Provides navigation links based on user role and handles user logout.
 * @component Navbar
 * @returns {React.JSX.Element} The rendered Navbar component.
 */
const Navbar: React.FC = (): React.JSX.Element => {
    const numericRole = useSelector((state: RootState) => state.auth.user?.role);
    const userRole = convertRoleToString(numericRole);
    const userName = useSelector((state: RootState) => state.auth.user?.firstName);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleNavBar, setToggleNavBar] = useState<boolean>(false);

    /**
     * Logs out the current user.
     * Clears user session data and navigates to the login page.
     */
    const logOutUser = (): void => {
        dispatch(logout())
        navigate("/");
    };

    const hideNavBar = (): void => {
        setToggleNavBar((prev) => !prev);
    };

    return (
        <>
            <div className={`navbar-container`}>
                <img src={palTechLogoNew} alt="company-logo-new" className="company-logo-new" />
                {!toggleNavBar && (
                    <img src={navBarIcon} alt="nav-bar" className="nav-bar-icon" onClick={hideNavBar} />
                )}
                {toggleNavBar && (
                    <img src={navCrossIcon} alt="nav-cross-icon" className="nav-bar-icon" onClick={hideNavBar} />
                )}
                <div className='nav-buttons-container'>
                    <NavLink to={`/${userRole}/home`} className="nav-link">Home</NavLink>
                    {userRole == RoleConstants.ADMIN && (
                        <>
                            <NavLink to={`/${userRole}/pending-list`} className="nav-link">Admin Approvals</NavLink>
                            <NavLink to={`/${userRole}/question-post-pending-list`} className="nav-link">Question Approvals</NavLink>
                        </>
                    )}
                    <NavLink to={`/${userRole}/questions-list`} className="nav-link">Questions</NavLink>
                    <NavLink to={`/${userRole}/my-questions`} className="nav-link">My Questions</NavLink>
                    <NavLink to={`/${userRole}/my-answers`} className="nav-link">My Answers</NavLink>

                </div>
                <div className="nav-footer">
                    <div className="nav-profile">
                        <span><b>Name: </b>{userName}</span>
                        <span><b>Role: </b>{convertFirstLetterToUpperCase(userRole)}</span>
                    </div>
                    <button type="button" title="logout" className="button logout-btn" onClick={logOutUser}>
                        Log out
                    </button>
                </div>
            </div>
            <div className={`mobile-navbar ${!toggleNavBar && 'hide-nav-bar'}`}>
                <NavLink to={`/${userRole}/home`} className="nav-link mobile-nav-link">Home</NavLink>
                {userRole == RoleConstants.ADMIN && (
                    <>
                        <NavLink to={`/${userRole}/pending-list`} className="nav-link mobile-nav-link">Admin Approvals</NavLink>
                        <NavLink to={`/${userRole}/question-post-pending-list`} className="nav-link mobile-nav-link">Question Approvals</NavLink>
                    </>
                )}
                <NavLink to={`/${userRole}/questions-list`} className="nav-link mobile-nav-link">Questions</NavLink>
                <NavLink to={`/${userRole}/my-questions`} className="nav-link mobile-nav-link">My Questions</NavLink>
                <NavLink to={`/${userRole}/my-answers`} className="nav-link mobile-nav-link">My Answers</NavLink>
                <div className="nav-logout-container">
                    <button type="button" title="logout" className="button logout-btn" onClick={() => logOutUser()}>
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
};

export default React.memo(Navbar);