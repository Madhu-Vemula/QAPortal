import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import Navbar from "../../components/common/Navbar";
import DashboardBlock from "../../components/layout/DashboardBlock";
import { useGetAnswerByUserQuery } from "../../services/answerService";
import type { AnswerResponse } from "../../types/Answers/AnswerPostApplicationResponse";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";
import AnswerCard from "./AnswerCard";
import type { RootState } from "../../store/store";
import { convertRoleToString } from "../../utils/userUtils";


const MyAnswersList = () => {
const numericRole = useSelector((state: RootState) => state.auth.user?.role);
        const userRole = convertRoleToString(numericRole);
    const { data: answersByUserResponse, isLoading } = useGetAnswerByUserQuery();
    const answersList = answersByUserResponse?.data || [];

    if (isLoading) return <Loader />
    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                {answersList.length == 0 ?
                    <h3>No data found</h3>
                    :
                    (answersList?.map((answer: AnswerResponse) => (
                        <AnswerCard
                            key={answer.id}
                            showModifyButtons={true}
                            answer={answer}
                            myAnswersTab={true}
                        />
                    )))}
            </DashboardBlock>
        </>
    );
}

export default MyAnswersList;