import { create } from "zustand";
import type { ModalStore } from '../interfaces/modal';

const useModalStore = create<ModalStore>((set) => ({
  modalIsOpen: false,
  modalToggle: () =>
    set((state) => ({
      modalIsOpen: !state.modalIsOpen,
    })),
}));

export default useModalStore;