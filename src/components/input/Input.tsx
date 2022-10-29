type InputProps = {
  labelText?: string; // Specify later
  type: string;
  name: string;
  value: string;
  handleChange(e: React.FormEvent<HTMLInputElement>): void;
};

const Input: React.FC<InputProps> = ({
  labelText,
  type,
  name,
  value,
  handleChange,
}) => (
  <div className="form-row">
    <label className="form-label" htmlFor={name}>
      {labelText || name}
    </label>
    <input
      className="form-input"
      id={name}
      name={name}
      value={value}
      type={type}
      onChange={handleChange}
    />
  </div>
);

export default Input;
