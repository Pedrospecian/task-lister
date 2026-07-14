import { create } from "zustand";

const initialState = {
  todoForm: {
    id: 0,
    title: '',
    description: '',
    created_at: null,
    completed: false,
    errors: {
      title: '',
      description: '',
    }
  },
}

const useTodoFormStore = create((set) => ({
  ...initialState,
  formReset: () => 
    set((state) => ({
      todoForm: initialState.todoForm
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
    set((state) => ({
      todoForm: {
        ...todo,
        errors: initialState.todoForm.errors
      }
    }))
}));

export default useTodoFormStore;