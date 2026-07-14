export default function InputCheckbox({ className, id, placeholder, value, onClick, onChange, label, ...props }) {
	return (
		<>
			<input type="checkbox" id={id} value={value} onClick={onClick} onChange={onChange} />
			{label && <label for={id}>{label}</label>}
		</>
	);
}