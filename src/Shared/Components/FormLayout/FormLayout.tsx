import type { CSSProperties, ReactNode } from "react";
import "./FormLayout.css";

type FormLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  width?: string;
  maxWidth?: string;
  className?: string;
  style?: CSSProperties;
};

const FormLayout = ({
  children,
  title,
  description,
  actions,
  align = "left",
  width = "302px",
  maxWidth = "302px",
  className = "",
  style,
}: FormLayoutProps) => {
  const sectionClassName = ["form-layout", `form-layout--${align}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={sectionClassName}
      style={{
        width,
        maxWidth,
        ...style,
      }}
    >
      {(title || description) && (
        <header className="form-layout__header">
          {title && <h2 className="form-layout__title">{title}</h2>}
          {description && (
            <div className="form-layout__description">{description}</div>
          )}
        </header>
      )}

      <div className="form-layout__body">{children}</div>

      {actions && <footer className="form-layout__actions">{actions}</footer>}
    </section>
  );
};

export default FormLayout;
