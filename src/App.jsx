// src/App.jsx
import './App.css';
import Header from './components/Header/Header';
import TaskManager from './components/TaskManager/TaskManager';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <TaskManager />
      </main>
    </div>
  );
}

export default App;