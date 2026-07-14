export default function InputTextarea({ className, type, id, placeholder, value, onChange, label, errors, ...props }) {
	return (
		<div className="form-field-wrapper">
			{label && <label className={'form-label'} for={id}>{label}</label>}
			<textarea
				id={id}
				type={type}
				className={`textarea-field ${className}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			>
			</textarea>
		</div>
	);
}