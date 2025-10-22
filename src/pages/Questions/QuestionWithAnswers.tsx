import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import { useGetQuestionQuery } from "../../services/questionService";
import QuestionCard from "./QuestionCard";
import Loader from "../../components/common/Loader";
import { useState } from "react";
import AnswerForm from "../Answers/AnswerForm";
import { useGetAllAnswersQuery } from "../../services/answerService";
import AnswerCard from "../Answers/AnswerCard";
import type { AnswerResponse } from "../../types/Answers/AnswerPostApplicationResponse";
import { ApplicationStatus } from "../../types/Enums/ApplicationStatus";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertRoleToString } from "../../utils/userUtils";

const QuestionWithAnswers = () => {
  const numericRole = useSelector((state: RootState) => state.auth.user?.role);
          const userRole = convertRoleToString(numericRole);
      const isApproved=useSelector((state:RootState)=>state.auth.user?.isApproved);
    const { id } = useParams<{ id: string }>();
    const parsedQuestionId = parseInt(id ?? "");
    const { data: questionResponse } = useGetQuestionQuery(parsedQuestionId);
    const { data: answersResponse } = useGetAllAnswersQuery(parsedQuestionId);
    const answersList = answersResponse?.data;
    const question = questionResponse?.data;
    const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false);

    const handleAnsweringQuestion = () => {
        setShowAnswerForm(true)
    }

    if (!question || !answersList) return <Loader />
    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}>
                <>
                    {isApproved && (
                        <button
                            className="button submit-btn"
                            onClick={handleAnsweringQuestion}
                        >
                            Post your answer
                        </button>)}

                    <QuestionCard
                        showModifyButtons={false}
                        question={question}
                        isQuestionsListTab={false}
                    />
                    {question.status === ApplicationStatus.Approved && (
                        <>
                            <h2>Replied answers</h2>
                            {answersList.length === 0 ? (
                                <h3>No data found</h3>
                            ) : (
                                answersList.map((answer: AnswerResponse) => (
                                    <AnswerCard
                                        key={answer.id}
                                        showModifyButtons={false}
                                        answer={answer}
                                        myAnswersTab={false}
                                    />
                                ))
                            )}
                        </>
                    )}

                </>
                {showAnswerForm && (
                    <AnswerForm
                        closePostAnswerForm={() => setShowAnswerForm(false)}
                        questionId={parsedQuestionId}
                    />
                )}
            </DashboardBlock>
        </>
    )
}
export default QuestionWithAnswers;