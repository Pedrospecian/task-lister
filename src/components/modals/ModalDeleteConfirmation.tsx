import { useEffect } from 'react'
import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import useTodoFormStore from '../../store/useTodoFormStore'

export default function ModalItemCreation() {
	const modalToggleConfirm = useModalStore((state) => state.modalToggleConfirm);
	const todoForm = useTodoFormStore((state) => state.todoForm);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);

	const handleDeleteItem = () => {
		deleteTodo(todoForm.id);
		modalToggleConfirm();
	}

	const handleEscKey = (e) => {
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

	return <div className="background" onClick={modalToggleConfirm}>
		<div className="modal-body" role="dialog" aria-modal onClick={e => e.stopPropagation()}>
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
		</div>
	</div>
}