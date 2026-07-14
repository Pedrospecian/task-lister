export default function InputCheckbox({ className, id, placeholder, value, onClick, label, ...props }) {
	return (
		<div>
			<input type="checkbox" id={id} checked={value} onClick={onClick} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
}