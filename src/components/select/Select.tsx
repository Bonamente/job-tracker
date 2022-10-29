/* eslint-disable react/no-array-index-key */
type SelectProps = {
  labelText?: string; // Specify later
  name: string;
  value: string;
  list: string[]; // Specify later
  handleChange(e: React.FormEvent<HTMLSelectElement>): void;
};

const Select: React.FC<SelectProps> = ({
  labelText,
  name,
  value,
  list,
  handleChange,
}) => (
  <div className="form-row">
    <label className="form-label" htmlFor={name}>
      {labelText || name}
    </label>
    <select
      className="form-select"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
    >
      {list.map((itemVal, idx) => (
        <option key={idx} value={itemVal}>
          {itemVal}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
