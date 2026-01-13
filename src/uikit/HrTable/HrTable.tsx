import { ReactNode, useMemo, useEffect, useRef } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import HrButton from '../HrButton/HrButton';
import HrInput from '../HrInput/HrInput';
import HrSelectMenu, { Option } from '../HrSelectMenu/HrSelectMenu';

export interface HrTableProps<TData> {
  title?: string;
  rightActions?: ReactNode;

  columns: ColumnDef<TData, any>[];
  data: TData[];

  isLoading?: boolean;
  emptyText?: string;

  // Backend-friendly search (parent calls API later)
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // Backend-friendly pagination (parent calls API later)
  page?: number; // 1-based
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];

  className?: string;
  showControls?: boolean;
}

function buildPageItems(currentPage: number, totalPages: number) {
  const pages: Array<number | '...'> = [];
  for (let page = 1; page <= totalPages; page++) {
    const isEdge = page === 1 || page === totalPages;
    const isNearCurrent = page >= currentPage - 1 && page <= currentPage + 1;
    if (isEdge || isNearCurrent) {
      pages.push(page);
    } else if (page === currentPage - 2 || page === currentPage + 2) {
      pages.push('...');
    }
  }
  return pages;
}

const HrTable = <TData,>(props: HrTableProps<TData>) => {
  const {
    title,
    rightActions,
    columns,
    data,
    isLoading = false,
    emptyText = 'No data found',
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
    page = 1,
    pageSize = 10,
    totalItems,
    totalPages,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50],
    className = '',
    showControls = true,
  } = props;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search handler
  const handleSearchInput = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearchChange?.(value);
    }, 500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const computedTotalPages = useMemo(() => {
    if (typeof totalPages === 'number') return Math.max(1, totalPages);
    if (typeof totalItems === 'number') return Math.max(1, Math.ceil(totalItems / pageSize));
    return 1;
  }, [totalPages, totalItems, pageSize]);

  const pageSizeSelectOptions: Option<number>[] = useMemo(
    () =>
      pageSizeOptions.map((n) => ({
        value: n,
        label: `${n} / page`,
      })),
    [pageSizeOptions]
  );

  const selectedPageSizeOption =
    pageSizeSelectOptions.find((o) => o.value === pageSize) ?? pageSizeSelectOptions[0] ?? null;

  const { control, setValue } = useForm<{
    tableSearch: string;
    pageSize: Option<number> | null;
  }>({
    defaultValues: {
      tableSearch: searchValue ?? '',
      pageSize: selectedPageSizeOption,
    },
  });

  // Sync when parent updates
  useEffect(() => {
    setValue('tableSearch', searchValue ?? '');
  }, [searchValue, setValue]);

  useEffect(() => {
    setValue('pageSize', selectedPageSizeOption);
  }, [selectedPageSizeOption, setValue]);

  const canPaginate = !!onPageChange;
  const pageItems = useMemo(() => buildPageItems(page, computedTotalPages), [page, computedTotalPages]);

  const colCount = table.getAllLeafColumns().length || 1;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`.trim()}>
      {title && (
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          {rightActions && <div className="flex items-center gap-3">{rightActions}</div>}
        </div>
      )}

      {/* Optional table-level search with filters */}
      {showControls && onSearchChange ? (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <HrInput
              variant="text"
              name="tableSearch"
              control={control}
              onChange={(e) => handleSearchInput((e.target as HTMLInputElement).value)}
              placeholder={searchPlaceholder}
              icon={Search}
              iconPosition="left"
            />
          </div>
          {!title && rightActions && <div className="flex items-center gap-3">{rightActions}</div>}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-3 px-6 text-sm font-semibold text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={colCount} className="py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="py-8 text-center text-gray-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showControls && canPaginate ? (
        <div className="px-6 py-3 border-t border-gray-200 grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <HrButton
              variant="secondary"
              icon={ChevronLeft}
              onClick={() => onPageChange?.(Math.max(1, page - 1))}
              disabled={page <= 1}
            >
            </HrButton>
          </div>

          <div className="justify-self-center flex items-center gap-2">
            {pageItems.map((p, idx) =>
              p === '...' ? (
                <span key={`ellipsis-${idx}`} className="text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange?.(p)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    page === p ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <div className="justify-self-end flex items-center gap-2">
            {onPageSizeChange ? (
              <div className="w-32">
                <HrSelectMenu<number>
                  name="pageSize"
                  options={pageSizeSelectOptions}
                  control={control}
                  onValueChange={(value: Option<number> | null) => {
                    if (value) onPageSizeChange(value.value);
                  }}
                  isSearchable={false}
                  styles={{
                    control: (base: any) => ({
                      ...base,
                      minHeight: 36,
                      height: 36,
                      borderRadius: 8,
                      borderColor: '#e5e7eb',
                      boxShadow: 'none',
                      fontSize: 14,
                    }),
                    valueContainer: (base: any) => ({
                      ...base,
                      padding: '0 12px',
                    }),
                    indicatorsContainer: (base: any) => ({
                      ...base,
                      height: 36,
                    }),
                    dropdownIndicator: (base: any) => ({
                      ...base,
                      padding: '0 8px',
                    }),
                  }}
                />
              </div>
            ) : null}

            <HrButton
              variant="secondary"
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => onPageChange?.(Math.min(computedTotalPages, page + 1))}
              disabled={page >= computedTotalPages}
            >
            </HrButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HrTable;


