import FormLayout from "../FormLayout/FormLayout";
import "./CircularChartCard.css";

type ChartDatum = {
  id: string;
  label: string;
  value: number;
  color: string;
};

type CircularChartCardProps = {
  title: string;
  description?: string;
  data: ChartDatum[];
  centerLabel?: string;
  valueFormatter?: (value: number) => string;
  width?: string;
  maxWidth?: string;
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angle: number) => ({
  x: centerX + radius * Math.cos(angle),
  y: centerY + radius * Math.sin(angle),
});

type RGB = {
  r: number;
  g: number;
  b: number;
};

const hexToRgb = (hex: string): RGB | null => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return null;
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const toRgba = (rgb: RGB, alpha: number) =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

type ChartSegment = ChartDatum & {
  fill: string;
  border: string;
  legendColor: string;
};

const CircularChartCard = ({
  title,
  description,
  data,
  centerLabel = "Total",
  valueFormatter = (value) => value.toString(),
  width = "100%",
  maxWidth = "100%",
}: CircularChartCardProps) => {
  const sanitizedData = data.filter((item) => item.value > 0);
  const total = sanitizedData.reduce((sum, item) => sum + item.value, 0);
  const segments: ChartSegment[] = sanitizedData.map((item) => {
    const rgb = hexToRgb(item.color);
    const baseFill = rgb ? toRgba(rgb, 0.44) : item.color;
    const borderColor = "rgba(255, 255, 255, 0.23)";

    return {
      ...item,
      fill: baseFill,
      border: borderColor,
      legendColor: baseFill,
    };
  });
  const radius = 76;
  const strokeWidth = 10;
  const segmentCount = segments.length;
  const gapRatio = segmentCount > 1 ? 0.0075 : 0;
  const gapAngle = gapRatio * 2 * Math.PI;
  const effectiveAngle = Math.max(2 * Math.PI - segmentCount * gapAngle, 0);
  const startAngleOffset = -Math.PI / 2;
  let currentAngle = startAngleOffset;
  const capAngle = strokeWidth / (2 * radius);

  const ariaLabel =
    sanitizedData.length && total
      ? `Circle chart showing: ${sanitizedData
          .map((item) => {
            const percentage = Math.round((item.value / total) * 100);
            return `${item.label} ${percentage}%`;
          })
          .join(", ")}.`
      : "Empty circle chart.";

  return (
    <FormLayout
      title={title}
      description={description}
      width={width}
      maxWidth={maxWidth}
      className="circular-chart-card"
    >
      <div className="circular-chart-card__layout">
        <div className="circular-chart-card__chart" role="img" aria-label={ariaLabel}>
          <svg
            className="circular-chart-card__svg"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              className="circular-chart-card__track"
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
            />
            {total > 0 &&
              segments.map((segment, index) => {
                const fraction = segment.value / total;
                const arcAngle = Math.max(fraction * effectiveAngle, 0);
                if (arcAngle <= 0) {
                  return null;
                }

                if (segmentCount === 1 && arcAngle >= 2 * Math.PI - 0.0001) {
                  return (
                    <g key={segment.id}>
                      <circle
                        className="circular-chart-card__segment"
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke={segment.border}
                        strokeWidth={strokeWidth + 1.2}
                        strokeLinecap="round"
                      />
                      <circle
                        className="circular-chart-card__segment circular-chart-card__segment--fill"
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke={segment.fill}
                        strokeWidth={strokeWidth}
                      />
                    </g>
                  );
                }

                const rawStartAngle = currentAngle;
                const rawEndAngle = rawStartAngle + arcAngle;
                const startAngle = rawStartAngle + capAngle;
                const endAngle = rawEndAngle - capAngle;
                currentAngle =
                  rawEndAngle + (segmentCount > 1 && index < segmentCount - 1 ? gapAngle : 0);

                if (endAngle <= startAngle) {
                  return null;
                }

                const start = polarToCartesian(100, 100, radius, startAngle);
                const end = polarToCartesian(100, 100, radius, endAngle);
                const visibleAngle = endAngle - startAngle;
                const largeArcFlag = visibleAngle > Math.PI ? 1 : 0;

                return (
                  <g key={segment.id}>
                    <path
                      className="circular-chart-card__segment"
                      d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
                      fill="none"
                      stroke={segment.border}
                      strokeWidth={strokeWidth + 1.2}
                      strokeLinecap="round"
                    />
                    <path
                      className="circular-chart-card__segment circular-chart-card__segment--fill"
                      d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
                      fill="none"
                      stroke={segment.fill}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
          </svg>

          <div className="circular-chart-card__summary">
            <span className="circular-chart-card__summary-label">{centerLabel}</span>
            <span className="circular-chart-card__summary-value">
              {valueFormatter(total)}
            </span>
          </div>
        </div>

        <ul className="circular-chart-card__legend">
          {segments.length > 0 ? (
            segments.map((segment) => {
              const percentage = total > 0 ? Math.round((segment.value / total) * 100) : 0;
              return (
                <li key={segment.id} className="circular-chart-card__legend-item">
                  <span
                    className="circular-chart-card__legend-color"
                    style={{
                      backgroundColor: segment.legendColor,
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="circular-chart-card__legend-text">
                    <span className="circular-chart-card__legend-label">{segment.label}</span>
                    <span className="circular-chart-card__legend-meta">
                      {percentage}% · {valueFormatter(segment.value)}
                    </span>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="circular-chart-card__legend-empty">
              No selected items yet — add components to see the breakdown.
            </li>
          )}
        </ul>
      </div>
    </FormLayout>
  );
};

export type { ChartDatum };
export default CircularChartCard;
