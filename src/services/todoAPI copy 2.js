// services/TodoService.js
class TodoService {
  async fetchTodos() {
    const res = await fetch('https://dummyjson.com/todos');
    return res.json();
  }

  async addTodo(todo, completed, userId) {
    const res = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo, completed, userId }),
    });
    return res.json();
  }

  // Add other methods like updateTodo, deleteTodo...
}

// Export an instance
export default new TodoService();
