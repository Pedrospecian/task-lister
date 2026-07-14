import { useEffect } from 'react'
import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import useTodoFormStore from '../../store/useTodoFormStore'
import InputText from '../form/InputText'
import InputTextarea from '../form/InputTextarea'

export default function ModalItemCreation() {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const todoFormSet = useTodoFormStore((state) => state.todoFormSet);
	const todoFormSetError = useTodoFormStore((state) => state.todoFormSetError);
	const todoForm = useTodoFormStore((state) => state.todoForm);
	const addTodo = useTodoStore((state) => state.addTodo);
	const editTodo = useTodoStore((state) => state.editTodo);

	const isFormValid = () => {
		let isFormValid = true;
		if (!todoForm.title) {
			todoFormSetError('title', 'Required field');
			isFormValid = false;
		} else {
			todoFormSetError('title', '');
		}

		if (!todoForm.description) {
			todoFormSetError('description', 'Required field');
			isFormValid = false;
		} else {
			todoFormSetError('description', '');
		}

		return isFormValid;
	}

	const handleSubmit = () => {
		if (isFormValid()) {
			if (todoForm.id) {
				editTodo(todoForm);
			} else {
				addTodo({
					title: todoForm.title,
					description: todoForm.description
				});
			}
			modalToggle();
		}
	}

	const getActionLabel = () => {
		return todoForm.id ? 'Edit' : 'Create'
	}

	const handleEscKey = (e) => {
		if (e.key === 'Escape') {
			modalToggle();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, []);

	return <div className="background">
		<div className="modal-body" role="dialog" aria-modal>
			<form onSubmit={(e) => {
				e.preventDefault();
			}}>
				<div className="ta-center ps-relative card-section">
					{getActionLabel()} item
				</div>
				<div className="card-section">
					<InputText
						id="title"
						label="Title"
						type="text" 
	            		className={'input-field'}
	            		placeholder="Title"
	            		value={todoForm.title}
	            		onChange={(e) => {
							todoFormSet('title', e.target.value);
							if (e.target.value) {
								todoFormSetError('title', '');
							}
						}}
						error={todoForm.errors.title}
					/>
					<InputTextarea
						id="description"
						label="Description"
						placeholder="Description"
						className={'input-field'}
						value={todoForm.description}
						onChange={(e) => {
							todoFormSet('description', e.target.value);
							if (e.target.value) {
								todoFormSetError('description', '');
							}
						}}
						error={todoForm.errors.description}
					/>
				</div>
				<div className="flx-space-between card-section">
					<button className={'btn btn-black btn-large'} onClick={modalToggle}>
						Cancel
					</button>
					<button className={'btn btn-large'} onClick={() => {
						handleSubmit();
					}}>
						{getActionLabel()}
					</button>
				</div>
			</form>
		</div>
	</div>
}