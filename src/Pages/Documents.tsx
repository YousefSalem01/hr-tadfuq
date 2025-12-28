import { useState, useEffect, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Files,
  FileText,
  AlertCircle,
  FileX,
  Plus
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import AddDocumentsModal from '../uikit/AddDocumentsModal';
import HrButton from '../uikit/HrButton/HrButton';
import HrCard from '../uikit/HrCard/HrCard';
import HrSelectMenu from '../uikit/HrSelectMenu/HrSelectMenu';
import HrTable from '../uikit/HrTable/HrTable';
import { mockDocuments, DocumentRecord, documentStatusOptions, SelectOption } from '../data/mock';
import { SingleValue } from 'react-select';
import { getStatusBadgeColor, formatStatus } from '../utils';

const Documents = () => {
  const [allDocumentRecords, setAllDocumentRecords] = useState<DocumentRecord[]>(mockDocuments);
  const [documentRecords, setDocumentRecords] = useState<DocumentRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredRecordsCount, setFilteredRecordsCount] = useState(mockDocuments.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');

  useEffect(() => {
    // Filter document records based on search term and document type
    let filtered = allDocumentRecords;

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.issuer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDocType) {
      filtered = filtered.filter(record => record.status === selectedDocType);
    }

    // Update filtered count
    setFilteredRecordsCount(filtered.length);
    
    // Pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDocumentRecords(filtered.slice(startIndex, endIndex));
  }, [searchTerm, selectedDocType, currentPage, allDocumentRecords, pageSize]);

  const handleAddDocument = (data: any) => {
    const newDocument: DocumentRecord = {
      id: allDocumentRecords.length + 1,
      employeeName: data.employeeName,
      documentType: data.documentType,
      issuer: data.issuer,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      status: 'Pending',
    };
    setAllDocumentRecords([...allDocumentRecords, newDocument]);
    setIsModalOpen(false);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const columns = useMemo<ColumnDef<DocumentRecord>[]>(
    () => [
      {
        accessorKey: 'employeeName',
        header: 'Employees',
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'documentType',
        header: 'Document Type',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'issuer',
        header: 'Issuer',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'issueDate',
        header: 'Issue Date',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(status)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {formatStatus(status)}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Streamline employee salary advances and payments</p>
        </div>
        <HrButton 
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Add Documents
        </HrButton>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <HrCard
          title="Total Documents"
          value="14"
          icon={Files}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
        <HrCard
          title="Valid"
          value="$21,750"
          icon={FileText}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
        <HrCard
          title="Expiring Soon"
          value="$2,750"
          icon={AlertCircle}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
        <HrCard
          title="Expired"
          value="8"
          icon={FileX}
          iconBgColor="bg-red-50"
          iconColor="text-primary"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <HrButton variant="icon" icon={Filter} />
          <HrSelectMenu
            name="documentTypeFilter"
            placeholder="Select Type"
            options={[{ value: '', label: 'All Types' }, ...documentStatusOptions]}
            value={documentStatusOptions.find(option => option.value === selectedDocType) || null}
            onChange={(option) => {
              const selected = option as SingleValue<SelectOption>;
              setSelectedDocType(selected ? selected.value : '');
              setCurrentPage(1);
            }}
            isSearchable={false}
          />
          <HrButton variant="secondary" icon={Download}>
            Export Report
          </HrButton>
        </div>
      </div>

      {/* Documents Table */}
      <HrTable
        columns={columns}
        data={documentRecords}
        isLoading={isLoading}
        emptyText="No document records found"
        page={currentPage}
        pageSize={pageSize}
        totalItems={filteredRecordsCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

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

