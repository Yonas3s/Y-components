import type { ChangeEvent } from "react";
import "./Stepper.css";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const Stepper = ({
  value,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  disabled = false,
}: StepperProps) => {
  const containerClasses = ["stepper"];
  if (disabled) containerClasses.push("stepper--disabled");

  const clamp = (next: number) => Math.min(Math.max(next, min), max);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (Number.isNaN(next)) return;
    onChange(clamp(next));
  };

  const handleDecrease = () => {
    if (disabled) return;
    onChange(clamp(value - step));
  };

  const handleIncrease = () => {
    if (disabled) return;
    onChange(clamp(value + step));
  };

  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && value < max;

  return (
    <div className={containerClasses.join(" ")}>
      <div className="stepper__controls">
        <button
          type="button"
          className="stepper__button stepper__button--minus"
          onClick={handleDecrease}
          disabled={!canDecrease}
        >
          −
        </button>
        <input
          type="number"
          className="stepper__input"
          value={value}
          onChange={handleInputChange}
          step={step}
          min={Number.isFinite(min) ? min : undefined}
          max={Number.isFinite(max) ? max : undefined}
          disabled={disabled}
        />
        <button
          type="button"
          className="stepper__button stepper__button--plus"
          onClick={handleIncrease}
          disabled={!canIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Stepper;
