import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TodoStore } from '../interfaces/todo';

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (item) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              title: item.title,
              description: item.description,
              created_at: new Date().toLocaleString("pt-BR"),
              completed: false,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      editTodo: (item) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === item.id ? item : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);

export default useTodoStore;