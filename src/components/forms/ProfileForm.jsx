import { useState } from "react";

function ProfileForm({ profile, onSave, onCancel }) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [role, setRole] = useState(profile.role);
  const [introduction, setIntroduction] = useState(profile.introduction);

  function handleSubmit(event) {
    event.preventDefault();

    if (displayName.trim().length === 0) {
      return;
    }

    const updatedProfile = {
      displayName: displayName.trim(),
      role: role.trim(),
      introduction: introduction.trim(),
    };

    onSave(updatedProfile);
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">Profile settings</p>
          <h2>Edit your information</h2>
          <p>Keep your professional introduction clear and current.</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Display name
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        </label>

        <label>
          Role
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="e.g. Software Associate"
          />
        </label>

        <label className="field-span-two">
          Short introduction
          <textarea
            value={introduction}
            onChange={(event) => setIntroduction(event.target.value)}
            rows="4"
            placeholder="Write a short professional introduction"
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" type="submit">Save profile</button>
      </div>
    </form>
  );
}

export default ProfileForm;
