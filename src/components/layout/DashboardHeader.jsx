function DashboardHeader({ profile, onOpenGoalForm }) {
  return (
    <section className="dashboard-hero">
      <div className="hero-copy">
        <p className="eyebrow light-eyebrow">Personal development hub</p>
        <h2>Keep growing, {profile.displayName.split(" ")[0]}.</h2>
        <p>
          Turn your learning goals into visible progress and build a professional
          story you are proud to share.
        </p>
        <button className="hero-button" type="button" onClick={onOpenGoalForm}>
          Create a new goal
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <span className="hero-orbit orbit-one" />
        <span className="hero-orbit orbit-two" />
        <div className="hero-progress-ring">
          <strong>Grow</strong>
          <small>one goal at a time</small>
        </div>
      </div>
    </section>
  );
}

export default DashboardHeader;
