// src/components/TaskManager/components/TaskList.jsx
import TaskItem from './TaskItem';
import EmptyState from '../../UI/EmptyState';
import './TaskList.css';

// Update TaskList component to use real props
function TaskList({ tasks, onToggleTask, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <EmptyState 
        icon="📋"
        title="No tasks yet"
        description="Create your first task to get started with FlowSync!"
      />
    );
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <span className="task-count">
          {activeTasks.length} active
        </span>
      </div>
      
      <div className="tasks-container">
        {/* Active tasks first */}
        {activeTasks.map(task => (
          <TaskItem
            key={task.id}
            {...task}
            onToggle={() => onToggleTask(task.id)}
            onUpdate={(updates) => onUpdateTask(task.id, updates)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
        
        {/* Completed tasks section */}
        {completedTasks.length > 0 && (
          <div className="completed-tasks-section">
            <h3>Completed ({completedTasks.length})</h3>
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                {...task}
                onToggle={() => onToggleTask(task.id)}
                onUpdate={(updates) => onUpdateTask(task.id, updates)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList