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
import FilterContainer from "../../components/common/FilterContainer";
import { useEffect, useMemo, useState } from "react";

const buildAnswerTree = (answers: AnswerResponse[]) => {
    const map = new Map<number, AnswerResponse & { replies: AnswerResponse[] }>();
    const roots: (AnswerResponse & { replies: AnswerResponse[] })[] = [];

    answers.forEach(ans => {
        map.set(ans.id, { ...ans, replies: [] });
    });

    answers.forEach(ans => {
        const node = map.get(ans.id)!;
        if (ans.parentId) {
            const parent = map.get(ans.parentId);
            if (parent) {
                parent.replies.push(node);
            } else {
                roots.push(node);
            }
        } else {
            roots.push(node);
        }
    });

    return roots;
};

const MyAnswersList = () => {
    const numericRole = useSelector((state: RootState) => state.auth.user?.role);
    const userRole = convertRoleToString(numericRole);
    const { data: answersByUserResponse, isLoading } = useGetAnswerByUserQuery();
    const answersList = useMemo(() => answersByUserResponse?.data || [], [answersByUserResponse]);
    const [filteredAnswers, setFilteredAnswers] = useState<AnswerResponse[]>(answersList);
    const answerTree = buildAnswerTree(filteredAnswers);
    useEffect(() => {
        // update filtered answers when the source list changes
        setFilteredAnswers(answersList);
    }, [answersList]);

    if (isLoading) return <Loader />
    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                <FilterContainer>
                    <input type="text" placeholder="Search answers..." onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const filteredAnswers = answersList?.filter((answer) =>
                            answer.content.toLowerCase().includes(searchTerm)
                        );
                        setFilteredAnswers(filteredAnswers);
                    }} />
                </FilterContainer>
                {filteredAnswers.length == 0 ?
                    <h3>No data found</h3>
                    :
                    answerTree.map((answer) => (
                        <AnswerCard
                            key={answer.id}
                            showModifyButtons={true}
                            answer={answer}
                            myAnswersTab={true}
                            depth={0}
                        />
                    ))}
            </DashboardBlock>
        </>
    );
}

export default MyAnswersList;