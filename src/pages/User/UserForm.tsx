import Modal from "../../components/layout/CustomModal"
import palTechLogo from "../../assets/images/paltech_logo.png";
import type { UserData } from "../../types/User/user";
import { useState, type ChangeEvent } from "react";
import { RoleType } from "../../types/Enums/RoleType";
import { useModifyUserDataMutation, usePostUserDataMutation } from "../../services/adminService";

export interface UserFormProps {
    initialUserData: UserData | null;
    onClose: () => void;
    onSubmit: () => void;
}
const UserForm = (props: UserFormProps) => {
    const { initialUserData: initialUserData, onClose, onSubmit } = props;
    const [modifyUserData] = useModifyUserDataMutation()
    const [postUserData] = usePostUserDataMutation()

    const [userForm, setUserForm] = useState<UserData>(
        initialUserData ?? {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            role: RoleType.NONE,
            passwordHash: ''
        }
    );

    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleUserFirstName = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserForm({ ...userForm, firstName: event.target.value });
    };

    const handleUserLastName = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserForm({ ...userForm, lastName: event.target.value });
    };

    const handleUserEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserForm({ ...userForm, email: event.target.value })
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserForm({ ...userForm, passwordHash: event.target.value });
    };

    const handleUserRole = (event: ChangeEvent<HTMLSelectElement>): void => {
        const roleValue = Number(event.target.value) as RoleType;
        setUserForm({ ...userForm, role: roleValue });
    }

    const handleCancelRequest = (): void => {
        onClose()
    };

    const handlePostUserForm = async (): Promise<void> => {
        try {
            await postUserData(userForm).unwrap();
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            onSubmit();
        }
    };
    const handleModifyUserForm = async (): Promise<void> => {
        try {
            await modifyUserData(userForm).unwrap();
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            onSubmit();
        }
    };

    const submitUserForm = async (): Promise<void> => {
        setErrorMessage('')
        if (!userForm.firstName || !userForm.lastName || !userForm.email || !userForm.role) {
            setHasError(true);
            return
        }
        if (initialUserData === null && !userForm.passwordHash) {
            setHasError(true);
            return
        }
        if (!initialUserData) {
            handlePostUserForm()
        }
        else {
            handleModifyUserForm()
        }
    };
    return (
        <Modal
            title={`${initialUserData ? "Modify User" : "Add New User"}`}
            logoSrc={palTechLogo}
            onSubmit={submitUserForm}
            onClose={handleCancelRequest}
        >
            <form onSubmit={submitUserForm} className="modal-container">
                <label htmlFor="first-name">First name<span className="required">*</span></label>
                <input type="text" id="first-name" placeholder="Enter first name" value={userForm.firstName} onChange={handleUserFirstName} />
                {hasError && !userForm.firstName && <span className="error-message">Field is required</span>}

                <label htmlFor="last-name">Last name<span className="required">*</span></label>
                <input type="text" id="last-name" placeholder="Enter last name" value={userForm.lastName} onChange={handleUserLastName} />
                {hasError && !userForm.lastName && <span className="error-message">Field is required</span>}

                <label htmlFor="user-email">Email<span className="required">*</span></label>
                <input type="text" id="user-email" placeholder="Enter user email" value={userForm.email} onChange={handleUserEmail} />
                {hasError && !userForm.email && <span className="error-message">Field is required</span>}
                {!initialUserData && (
                    <>
                        <label htmlFor="password">Password<span className="required">*</span></label>
                        <input type="password" id="password" placeholder="Enter password" value={userForm.passwordHash} onChange={handlePasswordChange} />
                        {hasError && !userForm.passwordHash && !initialUserData && <span className="error-message">Field is required</span>}
                    </>
                )}
                <label htmlFor="assign-role">Assign role<span className="required">*</span></label>
                <select id="assign-role" value={userForm.role} onChange={handleUserRole}>
                    <option value="">Select role</option>
                    <option value={RoleType.USER}>User</option>
                    <option value={RoleType.ADMIN}>Admin</option>
                </select>
                {hasError && !userForm.role && <span className="error-message">Field is required</span>}
                {errorMessage && <span className="error-message">{errorMessage}</span>}
            </form>
        </Modal>
    )
}
export default UserForm