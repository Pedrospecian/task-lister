import { create } from "zustand";

const useModalStore = create((set) => ({
  modalIsOpen: false,
  modalToggle: () =>
    set((state) => ({
      modalIsOpen: !state.modalIsOpen,
    })),
}));

export default useModalStore;