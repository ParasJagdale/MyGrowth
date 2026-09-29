import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/initialData";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">M</span>
        <div>
          <strong>MyGrowth</strong>
          <small>Learning workspace</small>
        </div>
      </div>

      <p className="sidebar-label">Main menu</p>
      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "navigation-link active" : "navigation-link"
            }
            end={item.path === "/"}
            to={item.path}
            key={item.path}
          >
            <span className="navigation-icon" aria-hidden="true">
              {item.shortLabel}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <strong>Local prototype</strong>
          <small>Saved in this browser</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
