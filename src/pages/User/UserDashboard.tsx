import { useState, type JSX } from "react";
import DashboardBlock from "../../components/layout/DashboardBlock";
import { getIsApprovedFromLocal, getUserRoleFromLocal } from "../../utils/userUtils";
import Navbar from "../../components/common/Navbar";
import AdminForm from "./AdminForm";
import { useGetAdminApplicationByUserIdQuery } from "../../services/adminService";
import Loader from "../../components/common/Loader";
import { ApplicationStatus } from "../../types/Enums/ApplicationStatus";
import QuestionForm from "./QuestionForm";
import { useGetQuestionPostApplicationQuery } from "../../services/questionService";
import { convertFirstLetterToUpperCase } from "../../utils/commonUtils";


const UserDashboard = (): JSX.Element => {
  const userRole = getUserRoleFromLocal();
  const isApproved = getIsApprovedFromLocal();
  const { data: adminApplicationResponse, isLoading: adminApplicationLoading } = useGetAdminApplicationByUserIdQuery();
  const { data: questionPostApplicationResponse, isLoading: QuestionPostApplicationLoading } = useGetQuestionPostApplicationQuery();

  const [showAdminForm, setShowAdminForm] = useState<boolean>(false);
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);

  const applyForAdmin = () => {
    setShowAdminForm(true);
  }

  const applyToPostQuestions = () => {
    setShowQuestionForm(true)
  }
  if (adminApplicationLoading || QuestionPostApplicationLoading) return <Loader />

  return (
    <>
      <Navbar />
      <DashboardBlock
        title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
      >
        <div className="button-group">
          <button
            className="button submit-btn"
            onClick={applyForAdmin}
            disabled={
              adminApplicationResponse?.data != null &&
              adminApplicationResponse.data.status !== ApplicationStatus.Rejected
            }
          >
            Upgrade to Admin
          </button>
          <button
            className="button submit-btn"
            onClick={applyToPostQuestions}
            disabled={
              questionPostApplicationResponse?.data != null &&
              (questionPostApplicationResponse.data.status === ApplicationStatus.Pending ||
              isApproved)
            }
          >
            Apply for posting questions
          </button>
        </div>
        {showAdminForm && (
          <AdminForm
            closeAdminForm={() => setShowAdminForm(false)}
          />
        )}
        {showQuestionForm && (
          <QuestionForm
            closeQuestionForm={() => setShowQuestionForm(false)}
          />
        )}
      </DashboardBlock>
    </>
  )
}
export default UserDashboard;