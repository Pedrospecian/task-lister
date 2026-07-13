import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (item) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          title: item.title,
          description: item.description,
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