// src/components/TaskManager/components/TaskItem.jsx
import { useState } from 'react';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import './TaskItem.css';

function TaskItem({ 
  id,
  title, 
  description, 
  priority, 
  completed, 
  dueDate,
  onToggle,
  onDelete,
  onEdit
}) {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && !completed;
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-main">
        <div className="task-header">
          <div className="task-title-section">
            <button 
              className={`task-checkbox ${completed ? 'checked' : ''}`}
              onClick={onToggle}
              aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {completed ? '✅' : '⭕'}
            </button>
            <h3 className="task-title">{title}</h3>
          </div>
          
          <div className="task-badges">
            <Badge variant={priority} text={priority} />
            {isOverdue() && <Badge variant="danger" text="Overdue" />}
          </div>
        </div>
        
        {description && (
          <p className="task-description">{description}</p>
        )}
        
        <div className="task-meta">
          <span className="due-date">
            📅 Due {formatDate(dueDate)}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
          aria-label="Edit task"
        >
          ✏️
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDelete}
          aria-label="Delete task"
        >
          🗑️
        </Button>
      </div>
    </div>
  );
}

export default TaskItem;