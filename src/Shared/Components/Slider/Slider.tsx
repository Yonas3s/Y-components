import type { ChangeEvent, CSSProperties } from "react";
import "./Slider.css";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
};

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
}: SliderProps) => {
  const containerClasses = ["slider"];
  if (disabled) containerClasses.push("slider--disabled");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (Number.isNaN(next)) return;
    onChange(next);
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className={containerClasses.join(" ")}>
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
            } as CSSProperties
          }
        />
        {showValue && <span className="slider__value">{value}</span>}
      </div>
    </div>
  );
};

export default Slider;
