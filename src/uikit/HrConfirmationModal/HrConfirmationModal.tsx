import { X, AlertTriangle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import HrButton from '../HrButton/HrButton';

type ConfirmationType = 'danger' | 'warning' | 'info';

interface HrConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmationType;
  icon?: LucideIcon;
  itemName?: string;
}

const HrConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  icon: Icon = AlertTriangle,
  itemName,
}: HrConfirmationModalProps) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      buttonClass: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      buttonClass: 'bg-orange-600 hover:bg-orange-700',
    },
    info: {
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      buttonClass: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${styles.iconBg} rounded-lg`}>
              <Icon className={styles.iconColor} size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            {itemName ? (
              <>
                {message} <span className="font-semibold">"{itemName}"</span>? This action cannot be undone.
              </>
            ) : (
              message
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <HrButton
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              {cancelText}
            </HrButton>
            <HrButton
              type="button"
              variant="primary"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={styles.buttonClass}
            >
              {confirmText}
            </HrButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrConfirmationModal;