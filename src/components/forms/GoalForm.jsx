import { useState } from "react";
import {
  certificationProviderSuggestions,
  skillSuggestions,
} from "../../data/goalSuggestions";
import LogoAutocomplete from "./LogoAutocomplete";

function GoalForm({ onAdd, onCancel }) {
  const [type, setType] = useState("Skill");
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [learningResourceLink, setLearningResourceLink] = useState("");
  const [notes, setNotes] = useState("");

  const [provider, setProvider] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [earnedDate, setEarnedDate] = useState("");

  function handleTypeChange(newType) {
    setType(newType);
    setTitle("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedTitle = title.trim();

    if (cleanedTitle.length === 0) {
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: cleanedTitle,
      type: type,
      targetDate: targetDate || "No target date",
      status: "Planned",
      isPublic: isPublic,
      skillLevel: type === "Skill" ? skillLevel : "",
      learningResourceLink:
        type === "Skill" ? learningResourceLink.trim() : "",
      notes: type === "Skill" ? notes.trim() : "",
      provider: type === "Certification" ? provider.trim() : "",
      credentialId:
        type === "Certification" ? credentialId.trim() : "",
      earnedDate: type === "Certification" ? earnedDate : "",
    };

    onAdd(newGoal);
  }

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">New development item</p>
          <h2 id="goal-form-title">Add a learning goal</h2>
          <p>Choose a type and capture the details for your growth plan.</p>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onCancel}
          aria-label="Close form"
        >
          X
        </button>
      </div>

      <div className="goal-type-selector" aria-label="Goal type">
        <button
          className={type === "Skill" ? "type-option active" : "type-option"}
          type="button"
          onClick={() => handleTypeChange("Skill")}
        >
          <span className="type-option-icon">S</span>
          <span>
            <strong>Skill</strong>
            <small>Build practical capability</small>
          </span>
        </button>
        <button
          className={
            type === "Certification" ? "type-option active" : "type-option"
          }
          type="button"
          onClick={() => handleTypeChange("Certification")}
        >
          <span className="type-option-icon">C</span>
          <span>
            <strong>Certification</strong>
            <small>Track a formal credential</small>
          </span>
        </button>
      </div>

      <div className="form-grid">
        {type === "Skill" ? (
          <div className="field-span-two">
            <LogoAutocomplete
              id="skill-title"
              label="Skill name"
              value={title}
              onChange={setTitle}
              suggestions={skillSuggestions}
              placeholder="Search popular skills or enter your own"
              required
            />
          </div>
        ) : (
          <label className="field-span-two">
            Certification name
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Cloud Practitioner"
              autoFocus
              required
            />
          </label>
        )}

        <label>
          Target date
          <input
            type="date"
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
          />
        </label>

        {type === "Skill" && (
          <>
            <label>
              Skill level
              <select
                value={skillLevel}
                onChange={(event) => setSkillLevel(event.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>

            <label className="field-span-two">
              Learning resource link
              <input
                type="url"
                value={learningResourceLink}
                onChange={(event) =>
                  setLearningResourceLink(event.target.value)
                }
                placeholder="https://example.com/course"
              />
            </label>

            <label className="field-span-two">
              Notes
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows="3"
                placeholder="What do you want to learn or practise?"
              />
            </label>
          </>
        )}

        {type === "Certification" && (
          <>
            <div>
              <LogoAutocomplete
                id="certification-provider"
                label="Provider"
                value={provider}
                onChange={setProvider}
                suggestions={certificationProviderSuggestions}
                placeholder="Search providers or enter your own"
                required
              />
            </div>

            <label>
              Credential ID
              <input
                value={credentialId}
                onChange={(event) => setCredentialId(event.target.value)}
                placeholder="Optional credential ID"
              />
            </label>

            <label className="field-span-two">
              Earned date
              <input
                type="date"
                value={earnedDate}
                onChange={(event) => setEarnedDate(event.target.value)}
              />
            </label>
          </>
        )}
      </div>

      <label className="share-setting share-setting-panel">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(event) => setIsPublic(event.target.checked)}
        />
        <span>
          <strong>Show on public profile</strong>
          <small>This item will appear in your read-only profile preview.</small>
        </span>
      </label>

      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" type="submit">
          Add {type.toLowerCase()}
        </button>
      </div>
    </form>
  );
}

export default GoalForm;
