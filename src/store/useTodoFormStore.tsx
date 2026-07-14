import { create } from "zustand";
import type { TodoForm, TodoFormStore } from '../interfaces/todo';

const initialTodoForm: TodoForm = {
  id: 0,
  title: '',
  description: '',
  created_at: null,
  completed: false,
  errors: {
    title: '',
    description: '',
  }
}

const useTodoFormStore = create<TodoFormStore>((set) => ({
  todoForm: initialTodoForm,
  formReset: () => 
    set(() => ({
      todoForm: initialTodoForm
    })),
  todoFormSet: (field, value) =>
    set((state) => ({
      todoForm: {
        ...state.todoForm,
        [field]: value,
      }
    })),
  todoFormSetError: (field, value) =>
    set((state) => ({
      todoForm: {
        ...state.todoForm,
        errors: {
          ...state.todoForm.errors,
          [field]: value,
        }
      }
    })),
  loadForm: (todo) =>
    set(() => ({
      todoForm: {
        ...todo,
        errors: initialTodoForm.errors,
      }
    })),
}));

export default useTodoFormStore;