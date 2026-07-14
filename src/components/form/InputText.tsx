export default function InputText({ className, type, id, placeholder, value, onChange, label, error, ...props }) {
	return (
		<div className="form-field-wrapper">
			{label && <label className={'form-label'} htmlFor={id}>{label}</label>}
			<input
				id={id}
				type={type}
				className={`${className} ${error && 'field-error'}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{error && <div className="input-error-message">{error}</div>}
		</div>
	);
}