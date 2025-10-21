import { useState, type ChangeEvent } from "react";
import Modal from "../../components/layout/CustomModal";
import { useApplyForPostQuestionMutation } from "../../services/userService";

interface QuestionFormProps {
    closeQuestionForm: () => void
}
export interface ApplyForQuestionPostRequest {
    reason: string
}
const QuestionForm = (props: QuestionFormProps) => {
    const { closeQuestionForm } = props;

    const [reason, setReason] = useState<string>("")
    const [hasError, setHasError] = useState<boolean>(false);
    const [applyForPostQuestionAdmin] = useApplyForPostQuestionMutation();
    
    const handleSubmit = async () => {
        if (reason.length == 0) setHasError(true);
        const request: ApplyForQuestionPostRequest = { reason: reason };
        try {

            await applyForPostQuestionAdmin(request).unwrap();
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            closeQuestionForm();
        }

    }
    const handleCancel = () => {
        closeQuestionForm()
    }
    const handleReasonText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReason(e.target.value);
    }
    return (
        <Modal
            title="Why do you want to apply for posting Question? mention reason.."
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
export default QuestionForm;
