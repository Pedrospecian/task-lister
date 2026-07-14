import { ReactNode } from "react";

interface ModalProps {
  modalToggle: () => void;
  maxWidth: string | '700px'
  children: ReactNode;
}

export default function Modal({
  modalToggle,
  maxWidth,
  children,
}: ModalProps) {
	return <div className="background" onClick={modalToggle}>
		<div className="modal-body" role="dialog" aria-modal onClick={e => e.stopPropagation()} style={{ maxWidth: maxWidth }}>
			{children}
		</div>
	</div>
}