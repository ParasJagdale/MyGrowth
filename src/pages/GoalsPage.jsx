import LearningSection from "../components/goals/LearningSection";

function GoalsPage({
  eyebrow,
  title,
  description,
  goals,
  emptyMessage,
  goalActions,
  onOpenGoalForm,
}) {
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="primary-button" type="button" onClick={onOpenGoalForm}>
          <span aria-hidden="true">+</span>
          Add goal
        </button>
      </section>

      <LearningSection
        title={title}
        goals={goals}
        emptyMessage={emptyMessage}
        {...goalActions}
      />
    </div>
  );
}

export default GoalsPage;
