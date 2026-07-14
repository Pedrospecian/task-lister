export default function InputCheckbox({ className, id, placeholder, value, onClick, label, ...props }) {
	return (
		<>
			<input type="checkbox" id={id} checked={value} onClick={onClick} />
			{label && <label for={id}>{label}</label>}
		</>
	);
}