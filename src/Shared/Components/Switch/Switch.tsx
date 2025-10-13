import type { ChangeEvent } from "react";
import "./Switch.css";

type SwitchProps = {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  id?: string;
};

const Switch = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  id,
}: SwitchProps) => {
  const switchId =
    id ?? `${name}-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      className={`switch ${checked ? "switch--checked" : ""} ${
        disabled ? "switch--disabled" : ""
      }`}
      htmlFor={switchId}
    >
      <input
        id={switchId}
        className="switch__input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="switch__content">
        <span className="switch__label">{label}</span>
      </span>
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
    </label>
  );
};

export default Switch;
