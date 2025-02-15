import React, { useState } from 'react';

export default function TaxComplianceCenter() {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'File annual tax return', completed: false },
    { id: 2, task: 'Submit quarterly estimated taxes', completed: false },
    { id: 3, task: 'Review investment earnings', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleReminder = () => {
    console.log("Setting tax compliance reminder");
    alert('Reminder set for tax compliance tasks!');
  };

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="cursor-pointer mr-2"
            />
            <span className={task.completed ? 'line-through' : ''}>{task.task}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleReminder} className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-4">
        Set Reminder
      </button>
    </div>
  );
}