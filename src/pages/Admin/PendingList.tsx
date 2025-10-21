import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import Loader from "../../components/common/Loader";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import { useGetPendingAdminsQuery, useModifyApplicationMutation } from "../../services/adminService";
import { getUserRoleFromLocal } from "../../utils/userUtils";
import CustomTable from "../../components/layout/CustomTable";
import type { ModifyAdminStatusRequest, PendingAdmin } from "../../types/Admin/PendingAdmin";
import { getPendingAdminsColumns } from "./PendingAdminsColumns";
import Modal from "../../components/layout/CustomModal";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { mapActionTypeToNumber } from "../../utils/adminUtils";

const PendingList = () => {
    const userRole = getUserRoleFromLocal();
    const [modifyAdminApplication] = useModifyApplicationMutation();
    const { data: pendingAdminsListResponse, isLoading } = useGetPendingAdminsQuery();
    const pendingAdminList = pendingAdminsListResponse?.data || [];
    const [showPendingAdminModal, setShowPendingAdminModal] = useState<boolean>(false);
    const [actionType, setActionType] = useState<string>("");
    const [initialUserData, setInitialUserData] = useState<PendingAdmin | null>(null);

    const handleModifyPendingAdmin = useCallback((event: ChangeEvent<HTMLSelectElement>, item: PendingAdmin): void => {
        const modifyValue = event.target.value;
        setActionType(modifyValue);
        setInitialUserData(item);
        setShowPendingAdminModal(true)
    }, []);

    const memoizedPendingAdminsColumns = useMemo(() => (
        getPendingAdminsColumns(handleModifyPendingAdmin)
    ), [handleModifyPendingAdmin])

    const handleCancel = () => {
        setShowPendingAdminModal(false);
    }
    const handleSubmit = async () => {
        try {
            const requestData: ModifyAdminStatusRequest = {
                id: initialUserData?.id,
                status: mapActionTypeToNumber(actionType)
            }
            await modifyAdminApplication(requestData).unwrap();
        }
        catch (error: any) {
            console.error("Login error:", error);

        }
        finally {
            setShowPendingAdminModal(false);
        }
    }

    if (isLoading) return <Loader />

    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}>
                <CustomTable
                    data={pendingAdminList}
                    columns={memoizedPendingAdminsColumns} />
                    
            </DashboardBlock>
            {showPendingAdminModal && (
                <Modal
                    title={`Do you want to ${actionType} this admin request?`}
                    onClose={handleCancel}
                    onSubmit={handleSubmit}
                    submitText={convertFirstLetterToUpperCase(actionType)}
                    cancelText="Cancel"
                >
                    <></>
                </Modal>
            )}
        </>
    )
}
export default PendingList;