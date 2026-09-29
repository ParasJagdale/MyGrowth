import { initialGoals } from "./initialData";

const GOALS_VERSION_KEY = "mygrowth-goals-version";
const CURRENT_GOALS_VERSION = "2026-09-featured-goals-v1";

function isLegacyAzureCertification(goal) {
  const isCertification = goal.type === "Certification";
  const isOldAzureTitle =
    goal.title === "Azure Fundamentals" ||
    goal.title === "Azure AI Fundamentals";

  return isCertification && isOldAzureTitle;
}

function goalAlreadyExists(goals, title) {
  for (let index = 0; index < goals.length; index += 1) {
    if (goals[index].title === title) {
      return true;
    }
  }

  return false;
}

function migrateGoals(savedGoals) {
  if (Array.isArray(savedGoals) === false) {
    return initialGoals;
  }

  const savedVersion = localStorage.getItem(GOALS_VERSION_KEY);

  if (savedVersion === CURRENT_GOALS_VERSION) {
    return savedGoals;
  }

  const migratedGoals = [];

  for (let index = 0; index < savedGoals.length; index += 1) {
    const currentGoal = savedGoals[index];

    if (isLegacyAzureCertification(currentGoal) === false) {
      migratedGoals.push(currentGoal);
    }
  }

  for (let index = 0; index < initialGoals.length; index += 1) {
    const defaultGoal = initialGoals[index];

    if (goalAlreadyExists(migratedGoals, defaultGoal.title) === false) {
      migratedGoals.push(defaultGoal);
    }
  }

  localStorage.setItem(GOALS_VERSION_KEY, CURRENT_GOALS_VERSION);

  return migratedGoals;
}

export default migrateGoals;
