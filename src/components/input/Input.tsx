type InputProps = {
  type: string;
  name: string;
  value: string;
  handleChange(e: React.FormEvent<HTMLInputElement>): void;
  labelText?: string; // Specify later
};

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}) => {
  return (
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
};

export default Input;
