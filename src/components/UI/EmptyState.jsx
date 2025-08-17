// src/components/UI/EmptyState.jsx
import './EmptyState.css';

function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;