import { useNavigate } from "react-router-dom";
import type { QuestionResponseData } from "../../types/Questions/QuestionPostApplicationResponse"
import { useGetUserByIdQuery } from "../../services/userService";
import Loader from "../../components/common/Loader";
import { useState, type ChangeEvent } from "react";
import PostQuestionForm from "./PostQuestionForm";
import Modal from "../../components/layout/CustomModal";
import { useDeleteQuestionMutation, useIncreaseViewCountMutation } from "../../services/questionService";
import { useModifyQuestionStatusMutation } from "../../services/adminService";
import type { ModifyQuestionStatusRequest } from "../../types/Questions/ModifyQuestionStatusRequest";
import { getStatusClass, getStatusLabel } from "../../utils/commonUtils";
import { ApplicationStatus } from "../../types/Enums/ApplicationStatus";

interface QuestionCardProps {
    question: QuestionResponseData,
    showModifyButtons: boolean,
    isQuestionsListTab: boolean
}
export interface QuestionDeleteRequest {
    questionId: number
}

const QuestionCard = (props: QuestionCardProps) => {
    const { question, showModifyButtons, isQuestionsListTab } = props;
    const [rejectQuestionDescription, setRejectQuestionDescription] = useState<string>("");
    const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
    const [showApproveQuestionForm, setShowApproveQuestionForm] = useState<boolean>(false)
    const [showRejectQuestionForm, setShowRejectQuestionForm] = useState<boolean>(false)
    const { data: userDataResponse, isLoading } = useGetUserByIdQuery(question.userId);
    const [deleteQuestion] = useDeleteQuestionMutation();
    const [modifyQuestionStatus] = useModifyQuestionStatusMutation();
    const [increaseViewCount] = useIncreaseViewCountMutation();
    const userData = userDataResponse?.data;
    const navigate = useNavigate();

    const openSpecificQuestion = (questionId: number) => {
        navigate(`${questionId}`);
        increaseViewCount(questionId);
    }
    const handleEditQuestion = () => setShowQuestionForm(true)

    const handleDeleteQuestion = () => setShowDeleteConfirmation(true);
    const handleApproveQuestion = () => setShowApproveQuestionForm(true);
    const handleRejectQuestion = () => setShowRejectQuestionForm(true);

    const deleteTheAnswer = async () => {
        try {
            const request: QuestionDeleteRequest = { questionId: question.id }
            await deleteQuestion(request).unwrap();
        }
        catch (error: any) {
            console.error(error.message)
        }
        finally {
            setShowDeleteConfirmation(false)
        }
    }
    const handleRejectDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setRejectQuestionDescription(event.target.value)
    }
    const handleSubmitApproveQuestion = async () => {
        const request: ModifyQuestionStatusRequest = { questionStatus: ApplicationStatus.Approved, questionId: question.id };
        try {
            await modifyQuestionStatus(request).unwrap();
        } catch (error: any) {
            console.log(error)
        }
        finally {
            setShowApproveQuestionForm(false)
        }
    }
    const handleSubmitRejectQuestion = async () => {
        const request: ModifyQuestionStatusRequest = {
            questionStatus: ApplicationStatus.Rejected,
            questionId: question.id,
            comments: rejectQuestionDescription
        };
        try {
            await modifyQuestionStatus(request).unwrap();
        } catch (error: any) {
            console.log(error)
        }
        finally {
            setShowRejectQuestionForm(false)
        }
    }
    if (isLoading) return <Loader />

    return (
        <>
            <div
                className="card"
                onClick={() => openSpecificQuestion(question.id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${question.title}`}
            >
                <div className="card-header">
                    <h2 className="card-title">{question.title}</h2>

                    <span
                        className={`card-status ${getStatusClass(question.status)}`}
                        title={question.status === ApplicationStatus.Rejected ? question.comments || "Rejected" : getStatusLabel(question.status)}
                    >
                        {getStatusLabel(question.status)}
                    </span>
                </div>

                <p className="card-content">{question.content}</p>

                <div className="card-footer">
                    <div className="card-meta">
                        <span className="card-date">
                            {new Date(question.createdAt).toLocaleDateString()}
                        </span>

                        <div className="meta-right-column">
                            <span className="badge">
                                {question.viewCount} view{question.viewCount !== 1 ? 's' : ''}
                            </span>
                            <span className="user-info">
                                Posted by: {userData?.firstName || userData?.lastName ? `${userData?.firstName} ${userData?.lastName}` : "Deleted User"}
                            </span>
                        </div>
                    </div>
                </div>

                {question.status === ApplicationStatus.Rejected && (
                    <div className="rejection-box">
                        <strong>Rejection Reason:</strong>
                        <p>{question.comments || "No reason provided"}</p>
                    </div>
                )}
            </div>

            {showModifyButtons && (
                <div className="button-group">
                    <button className="button edit-btn" onClick={handleEditQuestion}>Edit</button>
                    <button className="button remove-btn" onClick={handleDeleteQuestion}>Delete</button>
                </div>

            )}
            {((question.status == ApplicationStatus.Pending || question.status == ApplicationStatus.None)
                && isQuestionsListTab) && (
                    <div className="button-group">
                        <button className="button submit-btn" onClick={handleApproveQuestion}>Approve</button>
                        <button className="button remove-btn" onClick={handleRejectQuestion}>Reject</button>
                    </div>
                )}
            {showQuestionForm && (
                <PostQuestionForm
                    closePostQuestionForm={() => setShowQuestionForm(false)}
                    initialData={question}
                />
            )}
            {showDeleteConfirmation && (
                <Modal
                    title="Do you want to delete the question??"
                    onClose={() => setShowDeleteConfirmation(false)}
                    onSubmit={() => deleteTheAnswer()}
                    submitText="Ok"
                >
                    <></>
                </Modal>
            )}
            {showApproveQuestionForm && (
                <Modal
                    title="Do you want to approve the question?"
                    onClose={() => setShowApproveQuestionForm(false)}
                    onSubmit={() => handleSubmitApproveQuestion()}
                >
                    <></>
                </Modal>
            )}
            {showRejectQuestionForm && (
                <Modal
                    title="Do you want to reject the question?"
                    onClose={() => setShowRejectQuestionForm(false)}
                    onSubmit={() => handleSubmitRejectQuestion()}
                >
                    <>
                        <textarea
                            placeholder="Describe your rejection reason.."
                            value={rejectQuestionDescription}
                            onChange={handleRejectDescription}>
                        </textarea>
                    </>
                </Modal>
            )}
        </>
    )
}

export default QuestionCard;