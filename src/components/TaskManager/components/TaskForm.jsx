// src/components/TaskManager/components/TaskForm.jsx
import { useState } from 'react';
import Button from '../../UI/Button';
import './TaskForm.css';

function TaskForm({ onAddTask }) {

  // Add to TaskForm component
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Task title is required';
        } else if (value.trim().length < 3) {
          newErrors.title = 'Task title must be at least 3 characters';
        } else {
          delete newErrors.title;
        }
        break;
        
      case 'dueDate':
        const today = new Date();
        const selectedDate = new Date(value);
        if (selectedDate < today) {
          newErrors.dueDate = 'Due date cannot be in the past';
        } else {
          delete newErrors.dueDate;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    validateField(name, value);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Update the handleSubmit function in TaskForm.jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (!formData.dueDate) {
      alert('Please select a due date');
      return;
    }

    // Prepare task data
    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate
    };

    // Call the parent function to add task
    onAddTask(taskData);
    
    // Reset form and collapse
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    
    setIsExpanded(false);
    
    // Success feedback
    console.log('Task submitted successfully:', taskData);
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