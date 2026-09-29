export function getVisibleGoals(goals, selectedPage) {
  const visibleGoals = [];

  for (let index = 0; index < goals.length; index += 1) {
    const currentGoal = goals[index];
    let shouldIncludeGoal = true;

    if (selectedPage === "My Skills" && currentGoal.type !== "Skill") {
      shouldIncludeGoal = false;
    }

    if (
      selectedPage === "Certifications" &&
      currentGoal.type !== "Certification"
    ) {
      shouldIncludeGoal = false;
    }

    if (
      selectedPage === "Public Profile" &&
      currentGoal.isPublic !== true
    ) {
      shouldIncludeGoal = false;
    }

    if (shouldIncludeGoal === true) {
      visibleGoals.push(currentGoal);
    }
  }

  return visibleGoals;
}

export function getSectionTitle(selectedPage) {
  if (selectedPage === "My Skills") {
    return "My skills";
  }

  if (selectedPage === "Certifications") {
    return "My certifications";
  }

  return "My learning plan";
}

export function getGoalsByType(goals, goalType) {
  const matchingGoals = [];

  for (let index = 0; index < goals.length; index += 1) {
    if (goals[index].type === goalType) {
      matchingGoals.push(goals[index]);
    }
  }

  return matchingGoals;
}

export function getPublicGoals(goals) {
  const publicGoals = [];

  for (let index = 0; index < goals.length; index += 1) {
    if (goals[index].isPublic === true) {
      publicGoals.push(goals[index]);
    }
  }

  return publicGoals;
}

export function createSummaryCards(goals) {
  let completedCertifications = 0;
  let goalsInProgress = 0;
  let skillsDeveloping = 0;

  for (let index = 0; index < goals.length; index += 1) {
    const currentGoal = goals[index];

    if (
      currentGoal.type === "Certification" &&
      currentGoal.status === "Completed"
    ) {
      completedCertifications += 1;
    }

    if (currentGoal.status === "In progress") {
      goalsInProgress += 1;
    }

    if (
      currentGoal.type === "Skill" &&
      currentGoal.status === "In progress"
    ) {
      skillsDeveloping += 1;
    }
  }

  return [
    { label: "Certifications completed", value: completedCertifications },
    { label: "In progress", value: goalsInProgress },
    { label: "Skills developing", value: skillsDeveloping },
  ];
}
