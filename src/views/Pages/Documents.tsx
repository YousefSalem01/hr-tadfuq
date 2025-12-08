import { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  Files,
  FileText,
  AlertCircle,
  FileX,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AddDocumentsModal from '../../components/AddDocumentsModal';

interface DocumentRecord {
  id: number;
  employeeName: string;
  documentType: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Pending' | 'Hold' | 'Expired';
}

const documentRecords: DocumentRecord[] = [
  { id: 1, employeeName: 'Olivia Rhye', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 2, employeeName: 'Liam Smith', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Pending' },
  { id: 3, employeeName: 'Ava Johnson', documentType: 'Certificate', issuer: 'UAE Immigration', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 4, employeeName: 'Noah Brown', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Hold' },
  { id: 5, employeeName: 'Isabella Davis', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 6, employeeName: 'Mason Wilson', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Active' },
  { id: 7, employeeName: 'Sophia Garcia', documentType: 'Certificate', issuer: 'UAE Government', issueDate: 'Nov 1, 2025', expiryDate: 'Nov 1, 2025', status: 'Pending' },
];

const Documents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(documentRecords.length / itemsPerPage);

  const handleAddDocument = (data: any) => {
    // Handle document creation
    console.log('Document data:', data);
    // You can add the document record to the list here
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-orange-500';
      case 'Hold':
        return 'bg-gray-500';
      case 'Expired':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-700';
      case 'Pending':
        return 'text-orange-700';
      case 'Hold':
        return 'text-gray-700';
      case 'Expired':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = documentRecords.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Streamline employee salary advances and payments</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add Documents
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Documents */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Files className="text-primary" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">14</div>
            <div className="text-sm text-gray-500">Total Documents</div>
          </div>
        </div>

        {/* Valid */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <FileText className="text-primary" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">$21,750</div>
            <div className="text-sm text-gray-500">Valid</div>
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="text-primary" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">$2,750</div>
            <div className="text-sm text-gray-500">Expiring Soon</div>
          </div>
        </div>

        {/* Expired */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <FileX className="text-primary" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-500">Expired</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="text-gray-600" />
          </button>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            <option>type</option>
            <option>Certificate</option>
            <option>License</option>
            <option>Passport</option>
            <option>Visa</option>
            <option>ID Card</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Employees</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Document Type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Issuer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Issue Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Expiry Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                        {getInitials(record.employeeName)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{record.employeeName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.documentType}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.issuer}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.issueDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700">{record.expiryDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(record.status)}`}></div>
                      <span className={`text-sm font-medium ${getStatusTextColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="text-gray-500">...</span>;
              }
              return null;
            })}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Add Documents Modal */}
      <AddDocumentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDocument}
      />
    </div>
  );
};

export default Documents;

