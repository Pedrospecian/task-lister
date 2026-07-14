export default function InputText({ className, type, id, placeholder, value, onChange, label, errors, ...props }) {
	return (
		<div className="form-field-wrapper">
			{label && <label className={'form-label'} for={id}>{label}</label>}
			<input
				id={id}
				type={type}
				className={className}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}