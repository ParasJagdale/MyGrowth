import GoalNameEditor from "./GoalNameEditor";

function GoalCard({
  goal,
  onTitleSave,
  onStatusChange,
  onVisibilityChange,
  onDelete,
}) {
  return (
    <article className="goal-card">
      <div className="goal-main">
        <div className="goal-card-labels">
          <span className={`goal-type ${goal.type.toLowerCase()}`}>
            {goal.type}
          </span>
          <span className="goal-date">Target: {goal.targetDate}</span>
        </div>

        <GoalNameEditor goal={goal} onSave={onTitleSave} />

        <div className="goal-details">
          {goal.type === "Skill" && (
            <>
              <span><strong>Level</strong>{goal.skillLevel || "Not set"}</span>
              <span>
                <strong>Resource</strong>
                {goal.learningResourceLink ? (
                  <a
                    className="goal-resource-link"
                    href={goal.learningResourceLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open resource
                  </a>
                ) : (
                  goal.learningResource || "Not added"
                )}
              </span>
              {goal.notes && <span><strong>Notes</strong>{goal.notes}</span>}
            </>
          )}

          {goal.type === "Certification" && (
            <>
              <span className="locked-detail">
                <strong>Provider - Locked</strong>
                {goal.provider || "Not added"}
              </span>
              <span className="locked-detail">
                <strong>Credential ID - Locked</strong>
                {goal.credentialId || "Not provided"}
              </span>
              {goal.earnedDate && <span><strong>Earned</strong>{goal.earnedDate}</span>}
            </>
          )}
        </div>

        <label className="share-setting">
          <input
            type="checkbox"
            checked={goal.isPublic === true}
            onChange={(event) =>
              onVisibilityChange(goal.id, event.target.checked)
            }
          />
          Share on public profile
        </label>
      </div>

      <div className="goal-actions">
        <select
          className={`goal-status status-${goal.status.toLowerCase().replace(" ", "-")}`}
          value={goal.status}
          onChange={(event) => onStatusChange(goal.id, event.target.value)}
          aria-label={`Update status for ${goal.title}`}
        >
          <option>Planned</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <button
          className="goal-delete"
          type="button"
          onClick={() => onDelete(goal.id, goal.title)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default GoalCard;
