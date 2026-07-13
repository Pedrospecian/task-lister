import useModalStore from '../store/useModalStore'
import useTodoStore from '../store/useTodoStore'

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
			<div class="ta-center ps-relative">
				{modalForm.id ? 'Editar' : 'Criar'} item
			</div>
			<form>
				<input type="text" placeholder="Title" value={modalForm.title} onChange={(e) => {
					modalFormSet('title', e.target.value);
				}}/>
				<textarea placeholder="Description" value={modalForm.description} onChange={(e) => {
					modalFormSet('description', e.target.value);
				}}></textarea>
			</form>
			<div class="flx-space-between">
				<button onClick={modalToggle}>
					Cancelar
				</button>
				<button onClick={() => {
					fntSubmit();
				}}>
					{modalForm.id ? 'Editar' : 'Criar'}
				</button>
			</div>
		</div>
	</div>
}