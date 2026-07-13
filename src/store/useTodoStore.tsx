import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create()(
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
              createdAt: new Date().toLocaleString("pt-BR"),
              completed: false,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
      editTodo: (item) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === item.id ? item : todo,
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      saveTodoFromLocalStorage: () =>
        set((state) => {
          localStorage.setItem('todos', state.todos);
        }),
      loadTodoFromLocalStorage: () =>
        set((state) => ({
          todos: JSON.parse(localStorage.getItem('todos')),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);

export default useTodoStore;