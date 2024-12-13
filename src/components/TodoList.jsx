import { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Subir codo en el hook', completed: false },
    { id: 2, task: 'Practicar low izquierda', completed: false },
    { id: 3, task: 'Coger sesiones próxima semana', completed: false },
  ]);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        task: e.target.value,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      e.target.value = '';
    }
  };

  return (
    <div className="todo-list-section my-8 px-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Tareas</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nueva tarea"
          onKeyDown={handleAddTask}
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-star-orange"
        />
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="form-checkbox h-5 w-5 rounded text-star-orange focus:ring-2 focus:ring-star-orange"
            />
            <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
