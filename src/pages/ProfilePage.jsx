import { useState } from "react";
import ProfileForm from "../components/forms/ProfileForm";
import PublicProfile from "../components/profile/PublicProfile";
import { getPublicGoals } from "../utils/goalHelpers";

function getInitials(displayName) {
  const nameParts = displayName.trim().split(" ");
  const firstInitial = nameParts[0]?.charAt(0) || "U";
  const lastInitial = nameParts.length > 1 ? nameParts.at(-1).charAt(0) : "";

  return (firstInitial + lastInitial).toUpperCase();
}

function ProfilePage({ profile, goals, onSaveProfile, onResetGoals }) {
  const [isEditing, setIsEditing] = useState(false);
  const publicGoals = getPublicGoals(goals);

  function handleSave(updatedProfile) {
    onSaveProfile(updatedProfile);
    setIsEditing(false);
  }

  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Professional identity</p>
          <h2>User profile</h2>
          <p>
            Manage the information that introduces you and preview exactly what
            other people would see.
          </p>
        </div>
        {!isEditing && (
          <button className="primary-button" type="button" onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
        )}
      </section>

      <div className="profile-layout">
        <section className="profile-information-card">
          <div className="profile-cover" />
          <div className="profile-information-body">
            <div className="avatar avatar-large">
              {getInitials(profile.displayName)}
            </div>
            <span className="availability-badge">
              <span className="status-dot" aria-hidden="true" />
              Learning actively
            </span>
            <h2>{profile.displayName}</h2>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-introduction">{profile.introduction}</p>

            <div className="profile-stats">
              <div>
                <strong>{goals.length}</strong>
                <span>Total goals</span>
              </div>
              <div>
                <strong>{publicGoals.length}</strong>
                <span>Shared items</span>
              </div>
            </div>

            <button
              className="reset-data-button"
              type="button"
              onClick={onResetGoals}
            >
              Reset demo goals
            </button>
          </div>
        </section>

        <div className="profile-main-column">
          {isEditing && (
            <section className="profile-editor-card">
              <ProfileForm
                profile={profile}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            </section>
          )}

          <PublicProfile profile={profile} goals={publicGoals} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
