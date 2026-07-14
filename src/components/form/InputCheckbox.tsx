interface InputCheckboxProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function InputCheckbox({
	className,
	id,
	placeholder,
	value,
	onChange,
	label,
	...props
}: InputCheckboxProps) {
	return (
		<div>
			<input type="checkbox" id={id} checked={value} onChange={onChange} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
}