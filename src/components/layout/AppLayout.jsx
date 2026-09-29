import { Outlet } from "react-router-dom";
import GoalForm from "../forms/GoalForm";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppLayout({
  profile,
  isGoalFormOpen,
  onOpenGoalForm,
  onCloseGoalForm,
  onAddGoal,
}) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-workspace">
        <TopBar profile={profile} onOpenGoalForm={onOpenGoalForm} />

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {isGoalFormOpen && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="goal-form-title"
          >
            <GoalForm onAdd={onAddGoal} onCancel={onCloseGoalForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AppLayout;
