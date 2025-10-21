import { useState, type ChangeEvent } from "react";
import Modal from "../../components/layout/CustomModal";
import { useApplyForAdminMutation } from "../../services/userService";

interface AdminFormProps {
    closeAdminForm: () => void
}
export interface ApplyForAdminRequest {
    reason: string
}
const AdminForm = (props: AdminFormProps) => {
    const { closeAdminForm } = props;

    const [reason, setReason] = useState<string>("")
    const [hasError, setHasError] = useState<boolean>(false);
    const [applyForAdmin] = useApplyForAdminMutation();
    
    const handleSubmit = async () => {
        if (reason.length == 0) setHasError(true);
        const request: ApplyForAdminRequest = { reason: reason };
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
