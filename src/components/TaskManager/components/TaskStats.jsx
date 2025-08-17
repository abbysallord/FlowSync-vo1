// src/components/TaskManager/components/TaskStats.jsx
import './TaskStats.css';

function TaskStats({ total, active, completed }) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="task-stats">
      <div className="stat-item">
        <div className="stat-number">{total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      
      <div className="stat-item">
        <div className="stat-number">{active}</div>
        <div className="stat-label">Active</div>
      </div>
      
      <div className="stat-item">
        <div className="stat-number">{completed}</div>
        <div className="stat-label">Completed</div>
      </div>
      
      <div className="stat-item">
        <div className="stat-number">{completionRate}%</div>
        <div className="stat-label">Progress</div>
      </div>
    </div>
  );
}

export default TaskStats;