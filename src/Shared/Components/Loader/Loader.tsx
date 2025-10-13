import "./Loader.css";

type LoaderProps = {
  size?: number;
  color?: string;
  className?: string;
  speed?: number;
};

const Loader = ({
  size = 48,
  color = "#ffffff",
  className = "",
  speed = 1,
}: LoaderProps) => {
  const normalizedSpeed = Math.max(0.1, speed);
  const duration = (1.4 / normalizedSpeed).toFixed(2);

  return (
    <div
      className={`loader ${className}`}
      style={
        {
          "--loader-size": `${size}px`,
          "--loader-highlight": color,
          "--loader-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <span className="loader__pulse" />
    </div>
  );
};

export default Loader;
