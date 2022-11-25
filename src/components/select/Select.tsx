/* eslint-disable react/no-array-index-key */
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText ? t(`form.${labelText}`) : t(`form.${name}`)}
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
            {t(`selectOption.${itemVal}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
