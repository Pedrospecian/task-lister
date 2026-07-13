import useModalStore from '../store/useModalStore'
import useTodoStore from '../store/useTodoStore'

export default function Card({ item, ...props }) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const loadForm = useModalStore((state) => state.loadForm);
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
				<div className="card-date">Created at {item.createdAt}</div>
			</div>
			<div className="card-section">
				{item.description}
			</div>
			<div className="card-section flx-space-between">
				<input type="checkbox" value={item.completed} onClick={toggleTodo} />Done
			</div>
			<div className="card-section flx-space-between">
				<button onClick={fntEditItem} className={'btn'}>Edit</button>
				<button onClick={fntDeleteItem} className={'btn btn-red'}>Delete</button>
			</div>
		</div>
	</div>)
}