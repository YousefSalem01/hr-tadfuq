import type { ReactNode } from 'react';

interface HrModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
}

const HrModal = ({
  isOpen,
  children,
  onClose,
  closeOnOverlayClick = false,
  overlayClassName = '',
  containerClassName = '',
}: HrModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${overlayClassName}`}
      onMouseDown={() => {
        if (closeOnOverlayClick) onClose?.();
      }}
    >
      <div
        className={containerClassName}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HrModal;

