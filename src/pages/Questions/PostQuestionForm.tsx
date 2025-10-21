import { useState, type ChangeEvent } from "react";
import Modal from "../../components/layout/CustomModal"
import { usePostQuestionMutation, usePutQuestionMutation } from "../../services/questionService";
import type { QuestionResponseData } from "../../types/Questions/QuestionPostApplicationResponse";

interface QuestionPostFormProps {
    closePostQuestionForm: () => void,
    initialData?: QuestionResponseData
}
export interface QuestionPostRequest {
    id?: number,
    title: string,
    content: string
}
const PostQuestionForm = (props: QuestionPostFormProps) => {
    const { closePostQuestionForm, initialData } = props;
    const [questionForm, setQuestionForm] = useState<QuestionPostRequest>(
        initialData ? {
            title: initialData.title,
            content: initialData.content
        } : {
            title: "",
            content: ""
        }
    )

    const [hasError, setHasError] = useState<boolean>(false)
    const [postQuestion] = usePostQuestionMutation();
    const [putQuestion] = usePutQuestionMutation();


    const postTheQuestion = async (request: QuestionPostRequest) => {
        try {
            await postQuestion(request).unwrap();
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            closePostQuestionForm();
        }
    }

    const putTheQuestion = async (request: QuestionPostRequest) => {
        try {
            await putQuestion(request).unwrap();
        }
        catch (error: any) {
            console.error(error);
        }
        finally {
            closePostQuestionForm();
        }
    }
    const handleSubmit = async () => {
        if (questionForm.content.length == 0 || questionForm.title.length == 0) { setHasError(true); return }
        const request: QuestionPostRequest = { content: questionForm.content, title: questionForm.title };
        if (initialData) {
            request.id = initialData.id;
            putTheQuestion(request)
        }
        else {
            postTheQuestion(request)
        }
    }

    const handleCancel = () => {
        closePostQuestionForm()
    }
    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionForm({ ...questionForm, content: e.target.value });
    }
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionForm({ ...questionForm, title: e.target.value });
    }

    return (
        <Modal
            title="Tell me about the question "
            onClose={handleCancel}
            onSubmit={handleSubmit}
        >
            <label htmlFor="title">Title<span className="required">*</span></label>
            <input
                type="text"
                id="title"
                name="title"
                onChange={handleTitle}
                placeholder="Enter the title"
                value={questionForm.title}
            />
            {hasError && !questionForm.title && (
                <span className="error-message">Title is required</span>
            )}
            <label htmlFor="description">Description <span className="required">*</span></label>
            <textarea
                onChange={handleContent}
                id="description"
                name="description"
                value={questionForm.content}
                placeholder="Enter the description"
                cols={20}
                rows={5}
            >

            </textarea>
            {hasError && !questionForm.content && (
                <span className="error-message">Description is required</span>
            )}

        </Modal>
    )
}
export default PostQuestionForm