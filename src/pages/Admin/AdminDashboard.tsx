import Navbar from "../../components/common/Navbar";
import { getUserRoleFromLocal } from "../../utils/userUtils";
import DashboardBlock from "../../components/layout/DashboardBlock";
import UsersList from "../User/UsersList";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { useState } from "react";
import UserForm from "../User/UserForm";


/**
 * @component EmployeeDashboard
 * @description Renders the employee dashboard page including profile info, leave balance, and leave history.
 * Handles conditional UI rendering based on loading states, route, and popup visibility.
 * @returns {React.JSX.Element} JSX element representing the dashboard.
 */
const AdminDashboard: React.FC = (): React.JSX.Element => {
    const userRole = getUserRoleFromLocal()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleAddUser = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                <button className="button submit-btn" onClick={() => { handleAddUser() }}>
                    Add User
                </button>
                <UsersList/>
            </DashboardBlock>
            {isModalOpen && (
                <UserForm
                    initialUserData={null}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={() => {setIsModalOpen(false)}}
                />
            )}
        </>
    );
};

export default AdminDashboard;
