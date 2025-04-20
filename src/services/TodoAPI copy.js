export default class todoAPI {
    baseUrl = 'https://dummyjson.com/todos'
    
    async fetchTodos() {
        const res = await fetch('https://dummyjson.com/todos');
        return res.json();
    }
    
  
    async retrieveTodo(id) {
      try {
        const res = await fetch(`${this.baseUrl}/${id}`);
        if (!res.ok) throw new Error('Todo not found');
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(`Error retrieving todo with ID ${id}:`, err);
      }
    }
  
    async addTodo(todo, completed, userId) {
      try {
        const res = await fetch(this.baseUrl + '/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todo, completed, userId }),
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  
    async updateTodo(id, updatedFields) {
      try {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFields),
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(`Error updating todo with ID ${id}:`, err);
      }
    }
  
    async deleteTodo(id) {
      try {
        const res = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(`Error deleting todo with ID ${id}:`, err);
      }
    }
  }