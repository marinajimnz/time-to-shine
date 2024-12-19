import { useState } from 'react';

const TodoList = () => {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Subir codo en el hook', completed: false }, // Example task 1
    { id: 2, task: 'Practicar low izquierda', completed: false }, // Example task 2
    { id: 3, task: 'Coger sesiones próxima semana', completed: false }, // Example task 3
  ]);

  // Toggles the completion status of a task by its ID
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task // Flip the "completed" flag
      )
    );
  };

  // Adds a new task to the list when the "Enter" key is pressed
  const handleAddTask = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') { // Ensures non-empty input
      const newTask = {
        id: tasks.length + 1, // Unique ID for the task
        task: e.target.value, // Task description
        completed: false, // Default completion status
      };
      setTasks([...tasks, newTask]); // Updates the task list with the new task
      e.target.value = ''; // Clears the input field
    }
  };

  return (
    <div className="todo-list-section my-8 px-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Tareas</h2>

      {/* Input for adding new tasks */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nueva tarea" // Placeholder text
          onKeyDown={handleAddTask} // Adds task on Enter key
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-star-orange"
        />
      </div>

      {/* List of tasks */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-4">
            {/* Checkbox to toggle task completion */}
            <input
              type="checkbox"
              checked={task.completed} // Reflects the current "completed" state
              onChange={() => toggleTaskCompletion(task.id)} // Toggles completion
              className="form-checkbox h-5 w-5 rounded text-star-orange focus:ring-2 focus:ring-star-orange"
            />
            {/* Task description with a strikethrough if completed */}
            <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
