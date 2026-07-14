import { create } from "zustand";
import type { ModalStore } from '../interfaces/modal';

const useModalStore = create<ModalStore>((set) => ({
  modalIsOpen: false,
  modalConfirmIsOpen: false,
  modalToggle: () =>
    set((state) => ({
      modalIsOpen: !state.modalIsOpen,
    })),
  modalToggleConfirm: () =>
    set((state) => ({
      modalConfirmIsOpen: !state.modalConfirmIsOpen,
    })),
}));

export default useModalStore;