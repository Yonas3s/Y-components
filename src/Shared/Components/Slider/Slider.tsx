import type { ChangeEvent } from "react";
import "./Slider.css";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  showValue?: boolean;
};

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  showValue = true,
}: SliderProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (Number.isNaN(next)) return;
    onChange(next);
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className={`slider ${disabled ? "slider--disabled" : ""}`}>
      {label && <span className="slider__label">{label}</span>}
      <div className="slider__track-wrapper">
        <input
          type="range"
          className="slider__input"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          style={
            {
              "--slider-progress": `${progress}%`,
            } as React.CSSProperties
          }
        />
        {showValue && <span className="slider__value">{value}</span>}
      </div>
    </div>
  );
};

export default Slider;
