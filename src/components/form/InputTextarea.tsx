export default function InputTextarea({ className, type, id, placeholder, value, onChange, label, error, ...props }) {
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