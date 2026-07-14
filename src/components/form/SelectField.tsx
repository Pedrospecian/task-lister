export default function SelectField({ id, className, value, label, onChange, options, error, ...props }) {
	return (
		<div className="form-field-wrapper">
			{label && <label className={'form-label'} htmlFor={id}>{label}</label>}
			<select
				id={id}
				className={`${className} ${error && 'field-error'}`}
				value={value}
				onChange={onChange}
			>
				{options.map((item) => {
	                return <option key={item.value} value={item.value}>{item.label}</option>
	            })}
            </select>
			{error && <div className="input-error-message">{error}</div>}
		</div>
	);
}