import useModalStore from '../store/useModalStore'
import useTodoStore from '../store/useTodoStore'

export default function Card({ item, ...props }) {
	const modalToggle = useModalStore((state) => state.modalToggle);
	const loadForm = useModalStore((state) => state.loadForm);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);
	
	const fntEditItem = () => {
		loadForm(item);
		modalToggle();
	}

	const fntDeleteItem = () => {
		deleteTodo(item.id);
	}

	return <div>
		{item.title} - {item.description}
		<button onClick={fntEditItem}>Editar</button>
		<button onClick={fntDeleteItem}>Excluir</button>
	</div>
}