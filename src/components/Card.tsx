import useModalStore from '../store/useModalStore'
import useTodoStore from '../store/useTodoStore'
import useTodoFormStore from '../store/useTodoFormStore'
import InputCheckbox from './form/InputCheckbox'
import type { Todo } from '../interfaces/todo';

interface CardProps {
	item: Todo,
	key: string | null,
}

export default function Card({ item, key }: CardProps) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const modalToggleConfirm = useModalStore((state) => state.modalToggleConfirm);
	const loadForm = useTodoFormStore((state) => state.loadForm);
	const toggleTodo = useTodoStore((state) => state.toggleTodo);
	
	const handleEditItem = () => {
		loadForm(item);
		modalToggle();
	}

	const handleDeleteItem = () => {
		loadForm(item);
		modalToggleConfirm();
	}

	return (<div>
		<div className={`card-single ${item.completed ? 'card-completed' : ''}`} key={key}>
			<div className="card-section">
				<div className="card-title">{item.title}</div>
				<div className="card-date">Created at {item.createdAt}</div>
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
					<button onClick={handleEditItem} className={'btn'}>Edit</button>
					<button onClick={handleDeleteItem} className={'btn btn-red'}>Delete</button>
				</div>
			</div>
		</div>
	</div>)
}