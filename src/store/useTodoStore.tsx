import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: ({ title, description }) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          title: title,
          description: description,
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
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;