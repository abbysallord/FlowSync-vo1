// src/components/TaskManager/components/TaskItem.jsx
import { useState } from 'react';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import './TaskItem.css';

// Update TaskItem to handle real interactions
function TaskItem({ 
  id, title, description, priority, completed, dueDate, 
  onToggle, onUpdate, onDelete 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title : title,
    description : description || ''
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      title : title,
      description : description
    });
  };

  const handleSaveEdit = () => {
    if (editData.title.trim()) {
      onUpdate({
        title: editData.title.trim(),
        description: editData.description.trim()
      });
      setIsEditing(false);
    } else {
      alert('Title cannot be empty')
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title : title,
      description : description
    });
    setIsEditing(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
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
            >
              {completed ? '✅' : '⭕'}
            </button>
            
            {isEditing ? (
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="task-edit-input"
                autoFocus
              />
            ) : (
              <h3 className="task-title">{title}</h3>
            )}
          </div>
          
          <div className="task-badges">
            <Badge variant={priority} text={priority.toUpperCase()} />
            {isOverdue() && <Badge variant="danger" text="OVERDUE" />}
          </div>
        </div>
        
        {isEditing ? (
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="task-edit-input"
            rows="2"
          />
        ) : (
          description && <p className="task-description">{description}</p>
        )}
        
        <div className="task-meta">
          <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
            Due: {formatDate(dueDate)}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        {isEditing ? (
          <>
            <Button variant="success" size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={handleEditClick}>
              Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDeleteClick}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem