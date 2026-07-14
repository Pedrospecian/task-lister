export default function InputCheckbox({ className, id, placeholder, value, onChange, label, ...props }) {
	return (
		<div>
			<input type="checkbox" id={id} checked={value} onChange={onChange} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
}