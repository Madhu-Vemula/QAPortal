import { useMemo, useState } from "react";
import CustomTable from "../../components/layout/CustomTable";
import type { UserData } from "../../types/User/user"
import { getUsersColumns } from "./usersColumns";
import type { ColumnDefinition } from "../../types/customTableProps";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../services/adminService";
import Loader from "../../components/common/Loader";
import UserForm from "./UserForm";
import Modal from "../../components/layout/CustomModal";


const UsersList = () => {
    const { data: userListResponse, isLoading } = useGetAllUsersQuery();
    const usersList = userListResponse?.data || [];
    const [showEditUserForm, setShowEditUserForm] = useState<boolean>(false);
    const [showDeleteUserForm, setShowDeleteUserForm] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [deleteUser] = useDeleteUserMutation()

    const handleEditUser = (user: UserData) => {
        setShowEditUserForm(true)
        setSelectedUser(user)
    }

    const handleDeleteUser = (user: UserData) => {
        setShowDeleteUserForm(true)
        setSelectedUser(user)
    }
    const handleSubmitDeleteUser = async () => {
        if (selectedUser == null || !selectedUser?.id) {
            alert('User not found')
            return
        }
        try {
            await deleteUser(selectedUser?.id).unwrap();

        } catch (error: any) {
            console.log(error)
        }
        finally {
            setShowDeleteUserForm(false)
        }
    }

    const memoizedUsersColumns: ColumnDefinition<UserData>[] = useMemo(() => (
        getUsersColumns(handleEditUser, handleDeleteUser)
    ), [])
    if (isLoading) return <Loader />

    return (
        <>
            <CustomTable
                data={usersList}
                columns={memoizedUsersColumns} />
            {showEditUserForm && (
                <UserForm
                    initialUserData={selectedUser}
                    onClose={() => setShowEditUserForm(false)}
                    onSubmit={() => setShowEditUserForm(false)}
                />
            )}
            {showDeleteUserForm && (
                <Modal
                    title="Do you want to delete user?"
                    onClose={() => setShowDeleteUserForm(false)}
                    onSubmit={() => handleSubmitDeleteUser()}
                    submitText="Ok"
                >
                    <></>
                </Modal>
            )}
        </>
    )
}
export default UsersList;