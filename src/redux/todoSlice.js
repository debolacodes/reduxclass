
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
