import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const mockTasks = [
  { id: 'task-1', title: 'Set up project structure', status: 'To Do' },
  { id: 'task-2', title: 'Design Kanban layout', status: 'In Progress' },
  { id: 'task-3', title: 'Implement drag-and-drop', status: 'In Progress' },
  { id: 'task-4', title: 'Test functionality', status: 'Done' },
];

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = {
      id: uuidv4(),
      title: newTask,
      status: 'To Do',
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (event, newStatus) => {
    const taskId = event.dataTransfer.getData('taskId');
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          className="task-card"
          draggable
          onDragStart={(event) => handleDragStart(event, task.id)}
        >
          <p>{task.title}</p>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ));
  };

  return (
    <div className="kanban-board">
      <h1>TASK BOARD</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Create a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="columns">
        <div
          className="column"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'To Do')}
        >
          <h2>TO DO</h2>
          {renderTasks('To Do')}
        </div>
        <div
          className="column"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'In Progress')}
        >
          <h2>IN PROGRESS</h2>
          {renderTasks('In Progress')}
        </div>
        <div
          className="column"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'Done')}
        >
          <h2>DONE</h2>
          {renderTasks('Done')}
        </div>
      </div>
    </div>
  );
};

export default App;
