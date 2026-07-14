export interface ModalStore {
  modalIsOpen: boolean;
  modalConfirmIsOpen: boolean;
  modalToggle: () => void;
  modalToggleConfirm: () => void;
}