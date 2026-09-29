import { useState } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import { defaultProfile, initialGoals } from "./data/initialData";
import migrateGoals from "./data/migrateGoals";
import useLocalStorage from "./hooks/useLocalStorage";
import GoalsPage from "./pages/GoalsPage";
import OverviewPage from "./pages/OverviewPage";
import ProfilePage from "./pages/ProfilePage";
import { getGoalsByType } from "./utils/goalHelpers";

function App() {
  const [goals, setGoals] = useLocalStorage(
    "mygrowth-goals",
    initialGoals,
    migrateGoals,
  );
  const [profile, setProfile] = useLocalStorage(
    "mygrowth-profile",
    defaultProfile,
  );
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);

  function handleAddGoal(newGoal) {
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setIsGoalFormOpen(false);
  }

  function handleProfileSave(updatedProfile) {
    setProfile(updatedProfile);
  }

  function handleResetGoals() {
    const userConfirmed = window.confirm(
      "Reset all goals to the original demo data? Your current goals will be replaced.",
    );

    if (userConfirmed === false) {
      return;
    }

    setGoals(initialGoals);
  }

  function updateGoal(goalId, changedFields) {
    setGoals((currentGoals) => {
      const updatedGoals = [];

      for (let index = 0; index < currentGoals.length; index += 1) {
        const currentGoal = currentGoals[index];

        if (currentGoal.id === goalId) {
          updatedGoals.push({ ...currentGoal, ...changedFields });
        } else {
          updatedGoals.push(currentGoal);
        }
      }

      return updatedGoals;
    });
  }

  function handleStatusChange(goalId, newStatus) {
    updateGoal(goalId, { status: newStatus });
  }

  function handlePublicVisibilityChange(goalId, shouldShare) {
    updateGoal(goalId, { isPublic: shouldShare });
  }

  function handleGoalTitleSave(goalId, newTitle) {
    updateGoal(goalId, { title: newTitle });
  }

  function handleDeleteGoal(goalId, goalTitle) {
    const userConfirmed = window.confirm(
      "Remove " + goalTitle + " from your learning plan?",
    );

    if (userConfirmed === false) {
      return;
    }

    setGoals((currentGoals) => {
      const remainingGoals = [];

      for (let index = 0; index < currentGoals.length; index += 1) {
        if (currentGoals[index].id !== goalId) {
          remainingGoals.push(currentGoals[index]);
        }
      }

      return remainingGoals;
    });
  }

  const goalActions = {
    onTitleSave: handleGoalTitleSave,
    onStatusChange: handleStatusChange,
    onVisibilityChange: handlePublicVisibilityChange,
    onDelete: handleDeleteGoal,
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              profile={profile}
              isGoalFormOpen={isGoalFormOpen}
              onOpenGoalForm={() => setIsGoalFormOpen(true)}
              onCloseGoalForm={() => setIsGoalFormOpen(false)}
              onAddGoal={handleAddGoal}
            />
          }
        >
          <Route
            index
            element={
              <OverviewPage
                profile={profile}
                goals={goals}
                onOpenGoalForm={() => setIsGoalFormOpen(true)}
                goalActions={goalActions}
              />
            }
          />
          <Route
            path="skills"
            element={
              <GoalsPage
                eyebrow="Capability development"
                title="My skills"
                description="Track the practical capabilities you are building and keep your learning momentum visible."
                goals={getGoalsByType(goals, "Skill")}
                emptyMessage="No skills yet. Add your first skill to start your development plan."
                goalActions={goalActions}
                onOpenGoalForm={() => setIsGoalFormOpen(true)}
              />
            }
          />
          <Route
            path="certifications"
            element={
              <GoalsPage
                eyebrow="Professional credentials"
                title="My certifications"
                description="Organize planned and completed certifications, providers, and credential details."
                goals={getGoalsByType(goals, "Certification")}
                emptyMessage="No certifications yet. Add a certification to begin tracking it."
                goalActions={goalActions}
                onOpenGoalForm={() => setIsGoalFormOpen(true)}
              />
            }
          />
          <Route
            path="plan"
            element={
              <GoalsPage
                eyebrow="Your development roadmap"
                title="Learning plan"
                description="Review every skill and certification in one focused workspace."
                goals={goals}
                emptyMessage="Your learning plan is empty. Add a goal to get started."
                goalActions={goalActions}
                onOpenGoalForm={() => setIsGoalFormOpen(true)}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProfilePage
                profile={profile}
                goals={goals}
                onSaveProfile={handleProfileSave}
                onResetGoals={handleResetGoals}
              />
            }
          />
          <Route path="public-profile" element={<Navigate to="/profile" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
