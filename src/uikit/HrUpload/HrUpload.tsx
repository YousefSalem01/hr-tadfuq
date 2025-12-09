import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';

interface HrUploadProps {
  label?: string;
  accept?: string; // e.g., ".pdf,.doc,.docx" or "image/*" or "*"
  maxSize?: number; // in MB
  multiple?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  onChange?: (files: File[]) => void;
  containerClassName?: string;
}

const HrUpload = ({
  label,
  accept = '*',
  maxSize = 10, // 10MB default
  multiple = false,
  required = false,
  error,
  helperText,
  onChange,
  containerClassName = '',
}: HrUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get human-readable file types
  const getAcceptedTypesText = () => {
    if (accept === '*') return 'All file types';
    
    const types = accept.split(',').map(type => {
      const cleaned = type.trim();
      if (cleaned.includes('image/')) return 'Images';
      if (cleaned.includes('video/')) return 'Videos';
      if (cleaned.includes('.pdf')) return 'PDFs';
      if (cleaned.includes('.doc')) return 'DOCs';
      if (cleaned.includes('.xls')) return 'Excel';
      return cleaned.replace('.', '').toUpperCase();
    });
    
    return types.join(', ');
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `File "${file.name}" exceeds ${maxSize}MB limit`;
    }

    // Check file type
    if (accept !== '*') {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const fileMimeType = file.type;

      const isAccepted = acceptedTypes.some(type => {
        if (type.includes('*')) {
          // Handle wildcards like "image/*"
          const category = type.split('/')[0];
          return fileMimeType.startsWith(category);
        }
        // Check both extension and mime type
        return type === fileExtension || type === fileMimeType;
      });

      if (!isAccepted) {
        return `File "${file.name}" type is not allowed. Accepted: ${getAcceptedTypesText()}`;
      }
    }

    return null;
  };

  // Handle file selection
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const newFiles: File[] = [];
    let error = '';

    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        error = validationError;
        break;
      }
      newFiles.push(file);
    }

    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError('');
    const updatedFiles = multiple ? [...uploadedFiles, ...newFiles] : newFiles;
    setUploadedFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Handle click to upload
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  // Remove file
  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const displayError = error || validationError;

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-primary bg-blue-50'
            : displayError
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className={`mb-3 ${displayError ? 'text-red-500' : 'text-primary'}`} size={32} />
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-gray-500">
            {getAcceptedTypesText()} • Max {maxSize}MB
            {helperText && ` • ${helperText}`}
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          required={required && uploadedFiles.length === 0}
        />
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
          <AlertCircle size={14} />
          <span>{displayError}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <File className="text-primary flex-shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-red-600 transition-colors flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HrUpload;

