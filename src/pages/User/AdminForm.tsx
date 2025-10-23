import { useState, type ChangeEvent } from "react";
import Modal from "../../components/layout/CustomModal";
import { useApplyForAdminMutation } from "../../services/userService";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface AdminFormProps {
    closeAdminForm: () => void
}
export interface ApplyForAdminRequest {
    userId: number,
    reason: string
}
const AdminForm = (props: AdminFormProps) => {
    const { closeAdminForm } = props;
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [reason, setReason] = useState<string>("")
    const [hasError, setHasError] = useState<boolean>(false);
    const [applyForAdmin] = useApplyForAdminMutation();

    const handleSubmit = async () => {
        if (reason.length == 0) setHasError(true);
        if(!userId){
            return;
        }
        const request: ApplyForAdminRequest = { userId, reason };
        try {

            await applyForAdmin(request).unwrap();
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            closeAdminForm();
        }

    }
    const handleCancel = () => {
        closeAdminForm()
    }
    const handleReasonText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReason(e.target.value);
    }
    return (
        <Modal
            title="Why do you want to apply for admin? mention reason.."
            onSubmit={handleSubmit}
            onClose={handleCancel}
        >
            <>
                <textarea
                    onChange={handleReasonText}
                    value={reason}
                >

                </textarea>
                {hasError && !reason && (
                    <span className="error-message">Reason is required</span>
                )}
            </>
        </Modal>
    )
}
export default AdminForm;
