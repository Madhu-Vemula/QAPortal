import { useEffect, useState } from "react";
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
import { ApplicationStatus } from "../../types/Enums/ApplicationStatus";
import type { QuestionResponseData } from "../../types/Questions/QuestionPostApplicationResponse";
import { RoleConstants } from "../../types/RoleConstants";
import FilterContainer from "../../components/common/FilterContainer";

const QuestionsList = () => {
    const numericRole = useSelector((state: RootState) => state.auth.user?.role);
    const userRole = convertRoleToString(numericRole);
    const isApproved = useSelector((state: RootState) => state.auth.user?.isApproved);
    const [showPostQuestionForm, setShowPostQuestionForm] = useState<boolean>(false);
    const { data: allQuestionsListResponse, isLoading } = useGetAllQuestionsQuery();
    const allQuestionsList = allQuestionsListResponse?.data;
    const [filteredQuestionsList, setFilteredQuestionsList] = useState<QuestionResponseData[] | undefined>(undefined);
    useEffect(() => {
        if (userRole == RoleConstants.USER) {
            const filteredQuestions = allQuestionsList?.filter((question) => question.status === ApplicationStatus.Approved);
            setFilteredQuestionsList(filteredQuestions)
        }
        else setFilteredQuestionsList(allQuestionsList)
    }, [allQuestionsList, setFilteredQuestionsList, ApplicationStatus])

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
                    <>
                        <FilterContainer>
                            <div>
                                <select onChange={(e) => {
                                    const statusFilter = e.target.value;
                                    if (statusFilter === "All") {
                                        setFilteredQuestionsList(allQuestionsList);
                                    }
                                    else {
                                        const filteredQuestions = allQuestionsList?.filter((question) =>
                                            question.status.toString() === statusFilter
                                        );
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
                                const filteredQuestions = allQuestionsList?.filter((question) =>
                                    question.title.toLowerCase().includes(searchTerm) ||
                                    question.content.toLowerCase().includes(searchTerm)
                                );
                                setFilteredQuestionsList(filteredQuestions);
                            }} />
                        </FilterContainer>
                    </>
                </>
                {filteredQuestionsList?.length === 0 && (
                    <h3>No questions available.</h3>
                )}
                {filteredQuestionsList?.map((question) => (
                    <QuestionCard
                        key={question.id}
                        showModifyButtons={false}
                        question={question}
                        isQuestionsListTab={true}
                    />
                ))}
            </DashboardBlock >
            {showPostQuestionForm && (
                <PostQuestionForm
                    closePostQuestionForm={() => setShowPostQuestionForm(false)}
                />
            )
            }
        </>
    )
}
export default QuestionsList;