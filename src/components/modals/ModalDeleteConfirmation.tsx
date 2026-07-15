import { useEffect } from 'react'
import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import useTodoFormStore from '../../store/useTodoFormStore'
import Modal from './Modal'

export default function ModalDeleteConfirmation() {
	const modalToggleConfirm = useModalStore((state) => state.modalToggleConfirm);
	const todoForm = useTodoFormStore((state) => state.todoForm);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);

	const handleDeleteItem = () => {
		deleteTodo(todoForm.id);
		modalToggleConfirm();
	}

	const handleEscKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			modalToggleConfirm();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, []);

	return <Modal modalToggle={modalToggleConfirm} maxWidth={'550px'}>
			<div className="ta-center ps-relative card-section">
				Delete item
			</div>
			<div className="ta-center ps-relative card-section">
				Are you sure that you want to delete the item <strong>"{todoForm.title}"</strong>?
				<br />
				This action cannot be undone.
			</div>
			<div className="flx-space-between card-section">
				<button className={'btn btn-black btn-large'} role="button" onClick={modalToggleConfirm}>
					Cancel
				</button>
				<button className={'btn btn-large'} type="button" role="button" name="Confirm" onClick={() => {
					handleDeleteItem();
				}}>
					Confirm
				</button>
			</div>
		</Modal>
}