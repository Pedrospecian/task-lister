import useModalStore from '../store/useModalStore'
import useTodoStore from '../store/useTodoStore'
import useTodoFormStore from '../store/useTodoFormStore'
import InputCheckbox from './form/InputCheckbox'

export default function Card({ item, ...props }) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const loadForm = useTodoFormStore((state) => state.loadForm);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);
	const toggleTodo = useTodoStore((state) => state.toggleTodo);
	
	const fntEditItem = () => {
		loadForm(item);
		modalToggle();
	}

	const fntDeleteItem = () => {
		deleteTodo(item.id);
	}

	return (<div>
		<div className="card-single">
			<div className="card-section">
				<div className="card-title">{item.title}</div>
				<div className="card-date">Created at {item.created_at}</div>
			</div>
			<div className="card-section">
				{item.description}
			</div>
			<div className="card-section flx-space-between">
				<div>
					<InputCheckbox
						value={item.completed}
						onChange={() => {
							toggleTodo(item.id);
						}}
						id={`done-${item.id}`}
						label={'Done'}
					/>
				</div>
				<div className="flx-space-between">
					<button onClick={fntEditItem} className={'btn'}>Edit</button>
					<button onClick={fntDeleteItem} className={'btn btn-red'}>Delete</button>
				</div>
			</div>
		</div>
	</div>)
}