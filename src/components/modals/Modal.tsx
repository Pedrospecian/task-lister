import type { ReactNode } from "react";

interface ModalProps {
  modalToggle: () => void;
  maxWidth?: string;
  children: ReactNode;
}

export default function Modal({
  modalToggle,
  maxWidth = '700px',
  children,
}: ModalProps) {
	return <div className="background" onClick={modalToggle}>
		<div className="modal-body" role="dialog" aria-modal onClick={e => e.stopPropagation()} style={{ maxWidth: maxWidth }}>
			{children}
		</div>
	</div>
}