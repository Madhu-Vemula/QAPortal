import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import PostQuestionForm from "./PostQuestionForm";
import { useGetAllQuestionsQuery } from "../../services/questionService";
import Loader from "../../components/common/Loader";
import QuestionCard from "./QuestionCard";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertRoleToString } from "../../utils/userUtils";


const QuestionsList = () => {
const numericRole = useSelector((state: RootState) => state.auth.user?.role);
        const userRole = convertRoleToString(numericRole);
      const isApproved=useSelector((state:RootState)=>state.auth.user?.isApproved);
    const [showPostQuestionForm, setShowPostQuestionForm] = useState<boolean>(false);
    const { data: allQuestionsListResponse, isLoading } = useGetAllQuestionsQuery();
    const allQuestionsList = allQuestionsListResponse?.data;
    const postAQuestion = () => {
        setShowPostQuestionForm(true)
    }
    if (isLoading) return <Loader />

    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                <>
                    {isApproved && (
                        <button
                            className="button submit-btn"
                            onClick={postAQuestion}
                        >
                            Post Question
                        </button>
                    )}
                    {allQuestionsList?.length === 0 && (
                        <h3>No questions available.</h3>
                    )}
                    {allQuestionsList?.map((question) => (
                        <QuestionCard
                            key={question.id}
                            showModifyButtons={false}
                            question={question}
                            isQuestionsListTab={true}
                        />
                    ))}
                </>
            </DashboardBlock>
            {showPostQuestionForm && (
                <PostQuestionForm
                    closePostQuestionForm={() => setShowPostQuestionForm(false)}
                />
            )}
        </>
    )
}
export default QuestionsList;