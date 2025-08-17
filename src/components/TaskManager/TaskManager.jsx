// src/components/TaskManager/TaskManager.jsx
import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import './TaskManager.css';

function TaskManager() {

  // Add to TaskManager
  // const [filter, setFilter] = useState('all'); // all, active, completed

  // const getFilteredTasks = () => {
  //   switch (filter) {
  //     case 'active':
  //       return tasks.filter(task => !task.completed);
  //     case 'completed':
  //       return tasks.filter(task => task.completed);
  //     default:
  //       return tasks;
  //   }
  // };


  // Real state management starts here
  const [tasks, setTasks] = useState([
    // Initial sample data for testing
    {
      id: 1,
      title: "Learn React State Management",
      description: "Master useState and dynamic data handling",
      priority: "high",
      completed: false,
      dueDate: "2025-08-20",
      createdAt: "2025-08-17T10:00:00.000Z"
    },
    {
      id: 2,
      title: "Build Task CRUD Operations", 
      description: "Implement create, read, update, delete functionality",
      priority: "medium",
      completed: false,
      dueDate: "2025-08-22",
      createdAt: "2025-08-17T11:00:00.000Z"
    }
  ]);

  // Helper functions for state management
  const generateId = () => {
    return Date.now() + Math.random();
  };

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  // Task CRUD operations
  const addTask = (taskData) => {
    const newTask = {
      id: generateId(),
      ...taskData,
      completed: false,
      createdAt: getCurrentTimestamp()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    console.log('Task added:', newTask);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId 
          ? { ...task, ...updates }
          : task
      )
    );
    console.log('Task updated:', taskId, updates);
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== taskId)
    );
    console.log('Task deleted:', taskId);
  };

  const toggleTask = (taskId) => {
    updateTask(taskId, { 
      completed: !tasks.find(task => task.id === taskId)?.completed 
    });
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
    overdue: tasks.filter(task => {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate < today && !task.completed;
    }).length
  };

  return (
    <div className="task-manager">
      <div className="task-manager-header">
        <h1>Task Manager</h1>
        <TaskStats {...stats} />
      </div>
      
      <div className="task-manager-content">
        <div className="task-form-section">
          <TaskForm onAddTask={addTask} />
        </div>
        
        <div className="task-list-section">
          <TaskList 
            tasks={tasks}
            onToggleTask={toggleTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskManager;