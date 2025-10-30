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
import FilterContainer from "../../components/common/FilterContainer";
import { useEffect, useMemo, useState } from "react";
import { ApplicationStatus } from "../../types/Enums/ApplicationStatus";

const MyQuestionsList = () => {
    const numericRole = useSelector((state: RootState) => state.auth.user?.role);
    const userRole = convertRoleToString(numericRole);
    const { data: questionsByUserResponse, isLoading } = useGetQuestionsByUserQuery();
    const questionsList = useMemo(() => questionsByUserResponse?.data || [], [questionsByUserResponse]);

    // const questionsList = questionsByUserResponse?.data || [];
    const [filteredQuestionsList, setFilteredQuestionsList] = useState<QuestionResponseData[]>(questionsList);
    useEffect(() => {
        setFilteredQuestionsList(questionsList)
    }, [questionsList])
    if (isLoading) return <Loader />
    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                <FilterContainer>
                    <div>
                        <select onChange={(e) => {
                            const statusFilter = e.target.value;
                            if (statusFilter === "All") {
                                setFilteredQuestionsList(questionsList);
                            } else {
                                const filteredQuestions = questionsList?.filter((question) => question.status.toString() === statusFilter);
                                setFilteredQuestionsList(filteredQuestions);
                            }
                        }}>
                            <option value="All">All</option>
                            <option value={ApplicationStatus.Pending}>Pending</option>
                            <option value={ApplicationStatus.Approved}>Approved</option>
                            <option value={ApplicationStatus.Rejected}>Rejected</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Search questions..." onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const filteredQuestions = questionsList?.filter((question) =>
                            question.title.toLowerCase().includes(searchTerm) ||
                            question.content.toLowerCase().includes(searchTerm)
                        );
                        setFilteredQuestionsList(filteredQuestions);
                    }} />
                </FilterContainer>
                {filteredQuestionsList.length == 0 ?
                    <h3>No data found</h3>
                    :
                    (filteredQuestionsList?.map((question: QuestionResponseData) => (
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