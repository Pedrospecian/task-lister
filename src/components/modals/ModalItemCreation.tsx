import useModalStore from '../../store/useModalStore'
import useTodoStore from '../../store/useTodoStore'
import InputText from '../form/InputText'
import InputTextarea from '../form/InputTextarea'

export default function ModalItemCreation({ modalFormInfo, setModalFormInfo, setModalOpen, ...props }) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const modalFormSet = useModalStore((state) => state.modalFormSet);
	const modalForm = useModalStore((state) => state.modalForm);
	const addTodo = useTodoStore((state) => state.addTodo);
	const editTodo = useTodoStore((state) => state.editTodo);

	const fntSubmit = () => {
		if (modalForm.title && modalForm.description) {
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

	return <div className="background">
		<div className="modal-body">
			<div class="ta-center ps-relative card-section">
				{modalForm.id ? 'Edit' : 'Create'} item
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
					}}
				/>
				<InputTextarea
					label="Description"
					placeholder="Description"
					className={'input-field'}
					value={modalForm.description}
					onChange={(e) => {
						modalFormSet('description', e.target.value);
					}}
				/>
			</form>
			<div class="flx-space-between card-section">
				<button className={'btn btn-black btn-large'} onClick={modalToggle}>
					Cancel
				</button>
				<button className={'btn btn-large'} onClick={() => {
					fntSubmit();
				}}>
					{modalForm.id ? 'Edit' : 'Create'}
				</button>
			</div>
		</div>
	</div>
}