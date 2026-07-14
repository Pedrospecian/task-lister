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
	value,
	onChange,
	label
}: InputCheckboxProps) {
	return (
		<div>
			<input className={className} type="checkbox" id={id} checked={value} onChange={onChange} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
}