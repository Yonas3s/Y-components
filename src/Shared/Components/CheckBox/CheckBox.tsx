import "./CheckBox.css";

type CheckBoxProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({ name, value, checked, onChange, label }) => {
  const id = `${name}-${value}`;
  return (
    <div className="checkbox-input">
      <div className="checkbox-input-item">
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
};

export default CheckBox;
