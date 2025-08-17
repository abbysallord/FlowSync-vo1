// src/components/TaskManager/components/TaskForm.jsx
import { useState } from 'react';
import Button from '../../UI/Button';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      id: Date.now(), // Simple ID generation for now
      ...formData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <div className="task-form-collapsed">
        <button 
          className="task-form-trigger"
          onClick={() => setIsExpanded(true)}
        >
          + Add New Task
        </button>
      </div>
    );
  }

  return (
    <div className="task-form">
      <div className="task-form-header">
        <h3>✨ Create New Task</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form-content">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="What needs to be done?"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add more details about this task..."
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-actions">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
          >
            ✅ Create Task
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;