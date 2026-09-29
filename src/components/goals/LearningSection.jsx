import GoalCard from "./GoalCard";

function LearningSection({
  title,
  goals,
  emptyMessage = "No goals to display.",
  onTitleSave,
  onStatusChange,
  onVisibilityChange,
  onDelete,
}) {
  return (
    <section className="learning-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Active development</p>
          <h2>{title}</h2>
        </div>
        <span className="count-badge">{goals.length} goals</span>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">+</span>
          <h3>Start building your plan</h3>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="goal-list">
          {goals.map((goal) => (
            <GoalCard
              goal={goal}
              onTitleSave={onTitleSave}
              onStatusChange={onStatusChange}
              onVisibilityChange={onVisibilityChange}
              onDelete={onDelete}
              key={goal.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default LearningSection;
