import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { useGetUserByIdQuery } from "../../services/userService";
import type { AnswerResponse } from "../../types/Answers/AnswerPostApplicationResponse";
import AnswerForm from "./AnswerForm";
import { useDeleteAnswerMutation, useLazyGetQuestionByAnswerQuery, useLazyGetReplyByAnswerQuery, usePostAnswerVoteMutation } from "../../services/answerService";
import Modal from "../../components/layout/CustomModal";
import { VoteType } from "../../types/Enums/VoteType";
import upVoteIcon from "../../assets/icons/upvote-icon.svg";
import downVoteIcon from "../../assets/icons/downvote-icon.svg";

interface AnswerCardProps {
    answer: AnswerResponse & { replies?: AnswerResponse[] };
    showModifyButtons: boolean;
    myAnswersTab: boolean;
    depth?: number;
}
export interface AnswerDeleteRequest {
    answerId: number
}
const AnswerCard = ({ answer, showModifyButtons, myAnswersTab, depth = 0 }: AnswerCardProps) => {
    const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
    const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState(false);
    const { data: userDataResponse, isLoading } = useGetUserByIdQuery(answer.userId);
    const [postAnswerVote] = usePostAnswerVoteMutation()
    const [deleteAnswer] = useDeleteAnswerMutation();
    const [triggerGetReplies, { data: repliesData }] = useLazyGetReplyByAnswerQuery();
    const [triggerGetQuestionByAnswer, { data: questionData }] = useLazyGetQuestionByAnswerQuery();
    const userData = userDataResponse?.data;
    const indent = depth * 20;

    useEffect(() => {
        if (myAnswersTab && !showAnswerForm && !isLoading && userData) {
            triggerGetQuestionByAnswer(answer.id);
        }
    }, [myAnswersTab, showAnswerForm, isLoading, userData, answer.id, triggerGetQuestionByAnswer]);

    const handleEditAnswer = () => setShowAnswerForm(true)

    const handleDeleteAnswer = () => setShowDeleteConfirmation(true)
    const deleteTheAnswer = async () => {
        try {
            const request: AnswerDeleteRequest = { answerId: answer.id }
            await deleteAnswer(request).unwrap();
        }
        catch (error: any) {
            console.error(error.message)
        }
        finally {
            setShowDeleteConfirmation(false)
        }
    }

    const handleAnswerVote = async (type: VoteType) => {
        try {
            const payload = {
                voteType: type,
                answerId: answer.id,
            };

            await postAnswerVote(payload).unwrap();

        } catch (error) {
            console.error("Vote failed:", error);
        }
    }

    if (isLoading) return (
        <Loader />
    );


    return (
        <div style={{ marginLeft: `${indent}px` }}>
            <div className="card">
                {myAnswersTab && (
                    <div className="card-header">
                        <h2 className="card-title">{questionData?.data.title}</h2>
                    </div>
                )}
                <p className="card-content">{answer.content}</p>

                <div className="card-footer">
                    <div className="card-meta">
                        <span className="card-date">
                            {new Date(answer.createdAt).toLocaleDateString()}
                        </span>
                        <div className="meta-right-column">
                            <span className="user-info">
                                Replied by: {userData?.firstName || userData?.lastName ? `${userData?.firstName} ${userData?.lastName}` : "Deleted User"}
                            </span>
                        </div>
                    </div>

                    {!myAnswersTab && (
                        <>
                            <div className="vote-container">
                                <button className="vote-button upvote" onClick={() => handleAnswerVote(VoteType.Upvote)}>
                                    <img src={upVoteIcon} alt="upvote-icon" />
                                    <span className="vote-count">{answer.upvoteCount}</span>
                                </button>

                                <button className="vote-button downvote" onClick={() => handleAnswerVote(VoteType.Downvote)}>
                                    <img src={downVoteIcon} alt="downvote-icon" />
                                    <span className="vote-count">{answer.downvoteCount}</span>
                                </button>
                                <button className="button reply-btn" onClick={() => setShowReplyForm(true)}>Reply</button>
                            </div>
                            <span className="show-replies" onClick={() => {
                                setShowReplies(!showReplies);
                                if (!showReplies) {
                                    triggerGetReplies(answer.id);
                                }
                            }}>Show Replies</span>
                        </>
                    )}
                </div>
            </div>

            {showModifyButtons && (
                <div className="button-group">
                    <button className="button submit-btn" onClick={handleEditAnswer}>Edit</button>
                    <button className="button remove-btn" onClick={handleDeleteAnswer}>Delete</button>
                </div>

            )}
            {showAnswerForm && (
                <AnswerForm
                    closePostAnswerForm={() => setShowAnswerForm(false)}
                    initialData={answer}
                    questionId={answer.questionId}
                />
            )}
            {showDeleteConfirmation && (
                <Modal
                    title="Do you want to delete the answer??"
                    onClose={() => setShowDeleteConfirmation(false)}
                    onSubmit={() => deleteTheAnswer()}
                >
                    <></>
                </Modal>
            )}
            {showReplyForm && (
                <AnswerForm
                    closePostAnswerForm={() => setShowReplyForm(false)}
                    questionId={answer.questionId}
                    answerId={answer.id}
                />
            )}
            {showReplies && (
                <>
                    {!repliesData ? (
                        <Loader />
                    ) : repliesData.data.length === 0 ? (
                        <h3>No replies yet.</h3>
                    ) : (
                        repliesData.data.map((reply: AnswerResponse) => (
                            <AnswerCard
                                key={reply.id}
                                answer={reply}
                                showModifyButtons={false}
                                myAnswersTab={myAnswersTab}
                                depth={depth + 1}
                            />
                        ))
                    )}
                </>
            )}

        </div>
    )
}

export default AnswerCard;