import { create } from "zustand";

const initialState = {
  modalIsOpen: false,
  modalForm: {
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

const useModalStore = create((set) => ({
  ...initialState,
  modalToggle: () =>
    set((state) => ({
      modalIsOpen: !state.modalIsOpen,
    })),
  modalReset: () => 
    set((state) => ({
      modalForm: initialState.modalForm
    })),
  modalFormSet: (field, value) =>
    set((state) => ({
      modalForm: {
        ...state.modalForm,
        [field]: value,
      }
    })),
  modalFormSetError: (field, value) =>
    set((state) => ({
      modalForm: {
        ...state.modalForm,
        errors: {
          ...state.modalForm.errors,
          [field]: value,
        }
      }
    })),
  loadForm: (todo) =>
    set((state) => ({
      modalForm: {
        ...todo,
        errors: initialState.modalForm.errors
      }
    }))
}));

export default useModalStore;