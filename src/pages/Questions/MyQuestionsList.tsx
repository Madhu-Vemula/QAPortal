import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import { useGetQuestionsByUserQuery } from "../../services/questionService";
import type { QuestionResponseData } from "../../types/Questions/QuestionPostApplicationResponse";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import QuestionCard from "./QuestionCard";
import type { RootState } from "../../store/store";
import { convertRoleToString } from "../../utils/userUtils";

const MyQuestionsList = () => {
    const numericRole = useSelector((state: RootState) => state.auth.user?.role);
    const userRole = convertRoleToString(numericRole);
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