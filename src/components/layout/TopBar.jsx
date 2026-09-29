import { Link, useLocation } from "react-router-dom";

const pageNames = {
  "/": "Overview",
  "/skills": "My Skills",
  "/certifications": "Certifications",
  "/plan": "Learning Plan",
  "/profile": "Profile",
};

function getInitials(displayName) {
  const nameParts = displayName.trim().split(" ");
  const firstInitial = nameParts[0]?.charAt(0) || "U";
  const lastInitial = nameParts.length > 1 ? nameParts.at(-1).charAt(0) : "";

  return (firstInitial + lastInitial).toUpperCase();
}

function TopBar({ profile, onOpenGoalForm }) {
  const location = useLocation();
  const currentPageName = pageNames[location.pathname] || "MyGrowth";

  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">Workspace</p>
        <h1>{currentPageName}</h1>
      </div>

      <div className="topbar-actions">
        <button className="primary-button compact-button" type="button" onClick={onOpenGoalForm}>
          <span aria-hidden="true">+</span>
          Add goal
        </button>

        <Link className="topbar-profile" to="/profile" aria-label="Open profile">
          <span className="avatar avatar-small">{getInitials(profile.displayName)}</span>
          <span className="topbar-profile-copy">
            <strong>{profile.displayName}</strong>
            <small>{profile.role}</small>
          </span>
        </Link>
      </div>
    </header>
  );
}

export default TopBar;
