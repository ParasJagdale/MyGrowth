import DashboardHeader from "../components/layout/DashboardHeader";
import SummaryCards from "../components/layout/SummaryCards";
import LearningSection from "../components/goals/LearningSection";
import { createSummaryCards } from "../utils/goalHelpers";

function OverviewPage({ profile, goals, onOpenGoalForm, goalActions }) {
  const summaryCards = createSummaryCards(goals);
  const recentGoals = goals.slice(0, 5);

  return (
    <div className="page-stack">
      <DashboardHeader profile={profile} onOpenGoalForm={onOpenGoalForm} />
      <SummaryCards cards={summaryCards} />
      <LearningSection
        title="Priority goals"
        goals={recentGoals}
        emptyMessage="Create your first goal to see progress on the dashboard."
        {...goalActions}
      />
    </div>
  );
}

export default OverviewPage;
