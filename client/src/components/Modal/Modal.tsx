import React, { ReactNode } from "react";
import "./Modal.scss";

type ModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  hideFooter?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  title = "Modal Title",
  children,
  onClose,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  hideFooter = false,
}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>

        {!hideFooter && (
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>
              {cancelText}
            </button>
            {onSubmit && (
              <button className="submit-button" onClick={onSubmit}>
                {submitText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
