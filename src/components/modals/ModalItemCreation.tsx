import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import InputText from '../form/InputText'
import InputTextarea from '../form/InputTextarea'

export default function ModalItemCreation({ modalFormInfo, setModalFormInfo, setModalOpen, ...props }) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const modalFormSet = useModalStore((state) => state.modalFormSet);
	const modalFormSetError = useModalStore((state) => state.modalFormSetError);
	const modalForm = useModalStore((state) => state.modalForm);
	const addTodo = useTodoStore((state) => state.addTodo);
	const editTodo = useTodoStore((state) => state.editTodo);

	const fntFormValid = () => {
		let isFormValid = true;
		if (!modalForm.title) {
			modalFormSetError('title', 'Required field');
			isFormValid = false;
		} else {
			modalFormSetError('title', '');
		}

		if (!modalForm.description) {
			modalFormSetError('description', 'Required field');
			isFormValid = false;
		} else {
			modalFormSetError('description', '');
		}

		return isFormValid;
	}

	const fntSubmit = () => {
		if (fntFormValid()) {
			if (modalForm.id) {
				editTodo(modalForm);
			} else {
				addTodo({
					title: modalForm.title,
					description: modalForm.description
				});
			}
			modalToggle();
		}
	}

	const fntGetActionLabel = () => {
		return modalForm.id ? 'Edit' : 'Create'
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
            		value={modalForm.title}
            		onChange={(e) => {
						modalFormSet('title', e.target.value);
						if (e.target.value) {
							modalFormSetError('title', '');
						}
					}}
					error={modalForm.errors.title}
				/>
				<InputTextarea
					label="Description"
					placeholder="Description"
					className={'input-field'}
					value={modalForm.description}
					onChange={(e) => {
						modalFormSet('description', e.target.value);
						if (e.target.value) {
							modalFormSetError('description', '');
						}
					}}
					error={modalForm.errors.description}
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