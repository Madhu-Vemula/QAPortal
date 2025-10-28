import { useState, type ChangeEvent } from "react"
import Modal from "../../components/layout/CustomModal"
import { usePostAnswerMutation, usePutAnswerMutation } from "../../services/answerService"
import type { AnswerResponse } from "../../types/Answers/AnswerPostApplicationResponse"

interface AnswerPostFormProps {
    questionId: number,
    closePostAnswerForm: () => void,
    initialData?: AnswerResponse,
    answerId?: number
}

export interface AnswerUploadRequest {
    answerId?: number,
    content: string,
    questionId?: number,
}


const AnswerForm = (props: AnswerPostFormProps) => {
    const { closePostAnswerForm, questionId, initialData, answerId } = props;
    const [answerForm, setAnswerForm] = useState<AnswerUploadRequest>(
        initialData ? {
            answerId: initialData.id,
            content: initialData.content
        } : {
            questionId: questionId,
            content: ""
        }
    )
    const [hasError, setHasError] = useState<boolean>(false)
    const [postAnswer] = usePostAnswerMutation();
    const [putAnswer] = usePutAnswerMutation()


    const handleCancel = () => {
        closePostAnswerForm()
    }
    const postTheAnswer = async () => {
        const request: AnswerUploadRequest = { content: answerForm.content, questionId, answerId: answerId };
        try {

           await postAnswer(request).unwrap();
           
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            closePostAnswerForm();
        }
    }
    const putTheAnswer = async () => {
        const request: AnswerUploadRequest = { content: answerForm.content, answerId: initialData?.id ?? parseInt("") };
        try {
            await putAnswer(request).unwrap();
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            closePostAnswerForm();
        }
    }
    const handleSubmit = async () => {
        if (answerForm.content.length == 0) {
            setHasError(true);
            return;
        }
        if (initialData) {
            putTheAnswer();
        }
        else {
            postTheAnswer();
        }
    }
    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswerForm({ ...answerForm, content: e.target.value });
    }
    return (
        <Modal
            title="Provide your answer"
            onClose={handleCancel}
            onSubmit={handleSubmit}>
            <textarea
                onChange={handleDescription}
                id="description"
                name="description"
                value={answerForm.content}
                placeholder="Enter the description"
                cols={30}
                rows={10}
            >

            </textarea>
            {hasError && !answerForm.content && (
                <span className="error-message">Description is required</span>
            )}

        </Modal>
    )
}
export default AnswerForm