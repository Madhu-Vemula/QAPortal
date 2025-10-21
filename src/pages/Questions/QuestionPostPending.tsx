import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import Loader from "../../components/common/Loader";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import {  useGetPendingQuestionPostQuery, useModifyQuestionPostApplicationMutation } from "../../services/adminService";
import { getUserRoleFromLocal } from "../../utils/userUtils";
import CustomTable from "../../components/layout/CustomTable";
import Modal from "../../components/layout/CustomModal";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { mapActionTypeToNumber } from "../../utils/adminUtils";
import type { ModifyQuestionPostRequest, PendingQuestionPost } from "../../types/Questions/PendingQuestion";
import { getPendingQuestionPostColumns } from "./PendingQuestionPostColumns";

const QuestionPostPending = () => {
    const userRole = getUserRoleFromLocal();
    const [modifyQuestionPostApplication] = useModifyQuestionPostApplicationMutation();
    const { data: pendingQuestionPostResponse, isLoading } = useGetPendingQuestionPostQuery();
    const pendingQuestionPostList = pendingQuestionPostResponse?.data || [];
    const [showPendingQuestionPostModal, setShowPendingQuestionPostModal] = useState<boolean>(false);
    const [actionType, setActionType] = useState<string>("");
    const [initialQuestionPostData, setInitialQuestionPostData] = useState<PendingQuestionPost | null>(null);

    const handleModifyPendingQuestionPost = useCallback((event: ChangeEvent<HTMLSelectElement>, item: PendingQuestionPost): void => {
        const modifyValue = event.target.value;
        setActionType(modifyValue);
        setInitialQuestionPostData(item);
        setShowPendingQuestionPostModal(true)
    }, []);

    const memoizedPendingQuestionPostColumns = useMemo(() => (
        getPendingQuestionPostColumns(handleModifyPendingQuestionPost)
    ), [handleModifyPendingQuestionPost])

    const handleCancel = () => {
        setShowPendingQuestionPostModal(false);
    }
    const handleSubmit = async () => {
        try {
            const requestData: ModifyQuestionPostRequest = {
                id: initialQuestionPostData?.id,
                questionStatus: mapActionTypeToNumber(actionType)
            } 
            await modifyQuestionPostApplication(requestData).unwrap();
        }
        catch (error: any) {
            console.error("Login error:", error);

        }
        finally {
            setShowPendingQuestionPostModal(false);
        }
    }

    if (isLoading) return <Loader />

    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}>
                <CustomTable
                    data={pendingQuestionPostList}
                    columns={memoizedPendingQuestionPostColumns} />
                    
            </DashboardBlock>
            {showPendingQuestionPostModal && (
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
export default QuestionPostPending;