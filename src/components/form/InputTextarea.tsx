interface InputTextareaProps {
  id?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
}

export default function InputTextarea({
	id,
	className,
	type,
	placeholder,
	value,
	onChange,
	label,
	error,
	...props
}: InputTextareaProps) {
	return (
		<div className="form-field-wrapper">
			{label && <label className={'form-label'} htmlFor={id}>{label}</label>}
			<textarea
				id={id}
				type={type}
				className={`textarea-field ${className} ${error && 'field-error'}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			>
			</textarea>
			{error && <div className="input-error-message">{error}</div>}
		</div>
	);
}