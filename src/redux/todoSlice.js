
// todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TodoAPI from "../services/todoAPI"



export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    return await TodoAPI.fetchTodos(); // not fetchTodo()
});
  

export const addTodo = createAsyncThunk('todos/addTodo', async ({ todo, completed, userId }) => {
  return await TodoAPI.addTodo(todo, completed, userId);
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedFields }) => {
  return await TodoAPI.updateTodo(id, updatedFields);
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  return await TodoAPI.deleteTodo(id);
});

// Initial State
const initialState = {
  todos: [],
  loading: false,
  error: null,
};

// Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos || []; // 'todos' key is inside API response
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })

      // Update
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.todos[index] = action.payload;
      })

      // Delete
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.meta.arg);
      });
  },
});

export default todoSlice.reducer;
