export default function ModalItemCreation({ modalFormInfo, setModalFormInfo, setModalOpen, ...props }) {
	return <div className="background">
		<div className="modal-body">
			<div class="ta-center ps-relative">
				Criar item
			</div>
			<form>
				<input type="text" placeholder="Title" />
				<textarea placeholder="Description"></textarea>
			</form>
			<div class="flx-space-between">
				<button onClick={() => {
					setModalOpen(false);
				}}>
					Cancelar
				</button>
				<button onClick={() => {

				}}>
					Criar
				</button>
			</div>
		</div>
	</div>
}