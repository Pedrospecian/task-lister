import { create } from "zustand";

const useModalStore = create((set) => ({
  modalIsOpen: false,
  modalForm: {
    id: 0,
    title: '',
    description: '',
    created_at: null,
    completed: false,
  },
  modalToggle: () =>
    set((state) => ({
      modalIsOpen: !state.modalIsOpen,
    })),
  modalReset: () => 
    set((state) => ({
      modalForm: {
        id: 0,
        title: '',
        description: '',
        created_at: null,
        completed: false,
      }
    })),
  modalFormSet: (field, value) =>
    set((state) => ({
      modalForm: {
        ...state.modalForm,
        [field]: value,
      }
    })),
  loadForm: (todo) =>
    set((state) => ({
      modalForm: todo
    }))
}));

export default useModalStore;