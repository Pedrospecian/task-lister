import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import useTodoFormStore from '../../store/useTodoFormStore'
import InputText from '../form/InputText'
import InputTextarea from '../form/InputTextarea'

export default function ModalItemCreation({ modalFormInfo, setModalFormInfo, setModalOpen, ...props }) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const todoFormSet = useTodoFormStore((state) => state.todoFormSet);
	const todoFormSetError = useTodoFormStore((state) => state.todoFormSetError);
	const todoForm = useTodoFormStore((state) => state.todoForm);
	const addTodo = useTodoStore((state) => state.addTodo);
	const editTodo = useTodoStore((state) => state.editTodo);

	const fntFormValid = () => {
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

	const fntSubmit = () => {
		if (fntFormValid()) {
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

	const fntGetActionLabel = () => {
		return todoForm.id ? 'Edit' : 'Create'
	}

	return <div className="background">
		<div className="modal-body">
			<div className="ta-center ps-relative card-section">
				{fntGetActionLabel()} item
			</div>
			<form className="card-section">
				<InputText
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
			</form>
			<div className="flx-space-between card-section">
				<button className={'btn btn-black btn-large'} onClick={modalToggle}>
					Cancel
				</button>
				<button className={'btn btn-large'} onClick={() => {
					fntSubmit();
				}}>
					{fntGetActionLabel()}
				</button>
			</div>
		</div>
	</div>
}