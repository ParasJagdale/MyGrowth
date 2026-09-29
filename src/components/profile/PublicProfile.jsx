function PublicProfile({ profile, goals }) {
  return (
    <section className="public-preview">
      <div className="public-preview-banner">
        <div>
          <p className="eyebrow light-eyebrow">Public profile preview</p>
          <h2>{profile.displayName}</h2>
          <p>{profile.role}</p>
        </div>
        <span className="preview-badge">Preview</span>
      </div>

      <div className="public-preview-body">
        <p className="public-introduction">{profile.introduction}</p>

        <div className="public-section-heading">
          <h3>Shared achievements</h3>
          <span>{goals.length} visible</span>
        </div>

        {goals.length === 0 ? (
          <div className="public-empty-state">
            <h3>No shared items yet</h3>
            <p>
              Select "Share on public profile" on a skill or certification to
              show it here.
            </p>
          </div>
        ) : (
          <div className="public-goal-grid">
            {goals.map((goal) => (
              <article className="public-goal-card" key={goal.id}>
                <div className="public-card-top">
                  <span className={`goal-type ${goal.type.toLowerCase()}`}>
                    {goal.type}
                  </span>
                  <span className="public-status">{goal.status}</span>
                </div>
                <h3>{goal.title}</h3>
                <p>
                  {goal.type === "Skill"
                    ? goal.skillLevel || "Developing"
                    : goal.provider || "Certification"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PublicProfile;
