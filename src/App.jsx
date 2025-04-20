import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from './redux/todoSlice';

const App = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  // Fetch todos when component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    dispatch(addTodo({ todo: 'New Task from UI', completed: false, userId: 1 }));
  };

  const handleToggle = (todo) => {
    dispatch(updateTodo({ id: todo.id, updatedFields: { completed: !todo.completed } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Todos</h2>

      <button
        onClick={handleAddTodo}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Todo
      </button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => handleToggle(todo)}
            >
              {todo.todo}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
