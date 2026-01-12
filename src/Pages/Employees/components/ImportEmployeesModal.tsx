import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import HrButton from '../../../uikit/HrButton/HrButton';
import HrUpload from '../../../uikit/HrUpload/HrUpload';

interface ImportEmployeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
}

const ImportEmployeesModal = ({
  isOpen,
  onClose,
  onImport,
  isLoading = false,
  error,
}: ImportEmployeesModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFilesChange = (files: File[]) => {
    setSelectedFile(files.length > 0 ? files[0] : null);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onImport(selectedFile);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Upload className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Import Employees</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Upload a file to import employee data. Supported formats: Excel, CSV.
          </p>

          <HrUpload
            accept=".xlsx,.xls,.csv"
            maxSize={10}
            onChange={handleFilesChange}
            error={error || undefined}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <HrButton
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </HrButton>
            <HrButton
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={!selectedFile || isLoading}
              isLoading={isLoading}
            >
              Save
            </HrButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportEmployeesModal;
