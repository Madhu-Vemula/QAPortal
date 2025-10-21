import Loader from "../../components/common/Loader";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import { useGetQuestionsByUserQuery } from "../../services/questionService";
import type { QuestionResponseData } from "../../types/Questions/QuestionPostApplicationResponse";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import { getUserRoleFromLocal } from "../../utils/userUtils";
import QuestionCard from "./QuestionCard";

const MyQuestionsList = () => {
    const userRole = getUserRoleFromLocal()
    const { data: questionsByUserResponse, isLoading } = useGetQuestionsByUserQuery();
    const questionsList = questionsByUserResponse?.data || [];

    if (isLoading) return <Loader />
    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                {questionsList.length == 0 ?
                    <h3>No data found</h3>
                    :
                    (questionsList?.map((question: QuestionResponseData) => (
                        <QuestionCard
                            key={question.id}
                            showModifyButtons={true}
                            question={question}
                            isQuestionsListTab={false}
                        />
                    )))}
            </DashboardBlock>
        </>
    );
}

export default MyQuestionsList;