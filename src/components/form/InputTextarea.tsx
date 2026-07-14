interface InputTextareaProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (React.ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>);
  label?: string;
  error?: string;
}

export default function InputTextarea({
	id,
	className,
	placeholder,
	value,
	onChange,
	label,
	error
}: InputTextareaProps) {
	return (
		<div className="form-field-wrapper">
			{label && <label className={'form-label'} htmlFor={id}>{label}</label>}
			<textarea
				id={id}
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