import { useState } from "react";

function GoalNameEditor({ goal, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(goal.title);

  function handleEditClick() {
    setTitle(goal.title);
    setIsEditing(true);
  }

  function handleCancel() {
    setTitle(goal.title);
    setIsEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();

    const cleanedTitle = title.trim();

    if (cleanedTitle.length === 0) {
      return;
    }

    onSave(goal.id, cleanedTitle);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <form className="goal-name-editor" onSubmit={handleSave}>
        <label htmlFor={`goal-title-${goal.id}`}>Goal name</label>
        <input
          id={`goal-title-${goal.id}`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="goal-title-area">
      <h3>{goal.title}</h3>
      <button type="button" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
}

export default GoalNameEditor;
