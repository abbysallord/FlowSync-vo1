// src/components/TaskManager/components/TaskList.jsx
import TaskItem from './TaskItem';
import EmptyState from '../../UI/EmptyState';
import './TaskList.css';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <EmptyState 
        icon="🎯"
        title="No tasks yet"
        description="Add your first task to get started!"
      />
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>📋 Tasks</h2>
        <span className="task-count">
          {tasks.filter(task => !task.completed).length} active
        </span>
      </div>
      
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            {...task}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={(updates) => onEditTask(task.id, updates)}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;