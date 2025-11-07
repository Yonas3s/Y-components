import { useId } from "react";
import "./MetricCard.css";

type MetricCardProps = {
  title: string;
  caption?: string;
  value: string;
  deltaLabel?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  sparklineData?: number[];
  sparklineColor?: string;
  ariaLabel?: string;
};

const clampSparklineData = (data: number[]) => {
  if (data.length >= 2) {
    return data;
  }
  if (data.length === 1) {
    return [data[0], data[0]];
  }
  return [0, 0];
};

const MetricCard = ({
  title,
  caption,
  value,
  deltaLabel,
  deltaTone = "positive",
  sparklineData = [],
  sparklineColor = "#8D5BFF",
  ariaLabel,
}: MetricCardProps) => {
  const gradientId = useId();
  const data = clampSparklineData(sparklineData);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;
  const width = 120;
  const height = 40;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((point - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  });

  const deltaClass = `metric-card__delta metric-card__delta--${deltaTone}`;

  return (
    <section className="metric-card" aria-label={ariaLabel}>
      <header className="metric-card__header">
        <p className="metric-card__title">{title}</p>
        {caption && <span className="metric-card__caption">{caption}</span>}
      </header>

      <div className="metric-card__value-row">
        <span className="metric-card__value">{value}</span>
        {deltaLabel && <span className={deltaClass}>{deltaLabel}</span>}
      </div>

      <div className="metric-card__sparkline" aria-hidden="true">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={`${gradientId}-sparkline`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sparklineColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={sparklineColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="metric-card__sparkline-fill"
            d={`M ${points.join(" L ")} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
            fill={`url(#${gradientId}-sparkline)`}
          />
          <polyline
            className="metric-card__sparkline-line"
            points={points.join(" ")}
            stroke={sparklineColor}
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};

export default MetricCard;
export type { MetricCardProps };
