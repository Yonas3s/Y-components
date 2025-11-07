import { type ReactNode, useEffect, useId } from "react";
import FormLayout from "../FormLayout/FormLayout";
import Button from "../Button/Button";
import "./Modal.css";

type ModalAction = {
  label: string;
  onClick?: () => void;
  dismissOnClick?: boolean;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  className?: string;
  closeOnBackdrop?: boolean;
};

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  className = "",
  closeOnBackdrop = true,
}: ModalProps) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handlePrimary = () => {
    primaryAction?.onClick?.();
    if (primaryAction?.dismissOnClick !== false) {
      onClose();
    }
  };

  const handleSecondary = () => {
    secondaryAction?.onClick?.();
    if (secondaryAction?.dismissOnClick !== false) {
      onClose();
    }
  };

  const dismissViaBackdrop = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <div className={`modal ${className}`}>
      <div className="modal__backdrop" onClick={dismissViaBackdrop} />
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <FormLayout className="modal__panel" align="left" width="100%" maxWidth="420px">
          <div className="modal__content">
            <header className="modal__header">
              <div className="modal__header-row">
                {title && (
                  <h2 id={titleId} className="modal__title">
                    {title}
                  </h2>
                )}
                <button
                  type="button"
                  className="modal__close"
                  aria-label="Close modal"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
              {description && (
                <p className="modal__description">{description}</p>
              )}
            </header>
            {children && (
              <>
                <div className="modal__divider" />
                <div className="modal__body">{children}</div>
              </>
            )}
            <div className="modal__divider" />
            <footer className="modal__footer">
              {secondaryAction ? (
                <button
                  type="button"
                  className="modal__ghost-button"
                  onClick={handleSecondary}
                >
                  {secondaryAction.label}
                </button>
              ) : (
                <span className="modal__close-link" onClick={onClose}>
                  Close
                </span>
              )}
              {primaryAction && (
                <Button size="small" onClick={handlePrimary}>
                  {primaryAction.label}
                </Button>
              )}
            </footer>
          </div>
        </FormLayout>
      </div>
    </div>
  );
};

export default Modal;
