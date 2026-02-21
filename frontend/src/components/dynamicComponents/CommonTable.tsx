import { type ReactNode, useState } from 'react';

export interface TableColumn<T> {
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
    cell?: (value: any, row: T) => ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
}

export interface CardConfig<T> {
    title: (row: T) => ReactNode;
    subtitle?: (row: T) => ReactNode;
    content: (row: T) => ReactNode;
    actions?: (row: T) => ReactNode;
    image?: (row: T) => ReactNode;
}

interface CommonTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    cardConfig?: CardConfig<T>;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    isLoading?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    bordered?: boolean;
    compact?: boolean;
    showPagination?: boolean;
    showViewToggle?: boolean;
    defaultView?: 'table' | 'grid';
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}

function CommonTable<T extends Record<string, any>>({
    columns,
    data,
    cardConfig,
    onRowClick,
    emptyMessage = 'No data available',
    isLoading = false,
    striped = false,
    hoverable = true,
    bordered = true,
    compact = false,
    showPagination = true,
    showViewToggle = true,
    defaultView = 'table',
    rowsPerPageOptions = [5, 10, 25, 50],
    defaultRowsPerPage = 10
}: CommonTableProps<T>) {

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>(defaultView);

    // Pagination calculations
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = showPagination ? data.slice(startIndex, endIndex) : data;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const getNestedValue = (obj: any, path: keyof T | string): any => {
        const pathStr = String(path);
        return pathStr.split('.').reduce((acc, part) => acc?.[part], obj);
    };

    const getCellValue = (row: T, column: TableColumn<T>) => {
        if (typeof column.accessor === 'function') {
            return column.accessor(row);
        }
        return getNestedValue(row, column.accessor as string);
    };

    const renderCell = (row: T, column: TableColumn<T>) => {
        const value = getCellValue(row, column);
        if (column.cell) {
            return column.cell(value, row);
        }
        return value;
    };

    const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
        switch (align) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            default: return 'text-left';
        }
    };

    const renderPagination = () => {
        if (!showPagination || totalPages <= 1) return null;

        const getPageNumbers = () => {
            const pages: (number | string)[] = [];
            const maxVisible = 5;

            if (totalPages <= maxVisible) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                if (currentPage <= 3) {
                    for (let i = 1; i <= 4; i++) pages.push(i);
                    pages.push('...');
                    pages.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
                } else {
                    pages.push(1);
                    pages.push('...');
                    pages.push(currentPage - 1);
                    pages.push(currentPage);
                    pages.push(currentPage + 1);
                    pages.push('...');
                    pages.push(totalPages);
                }
            }
            return pages;
        };

        return (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                {/* Left side - Rows per page */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Rows per page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        {rowsPerPageOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Center - Page info */}
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                    <span className="font-medium">{data.length}</span> results
                </div>

                {/* Right side - Page navigation */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page as number)}
                                className={`px-3 py-1 border rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const renderViewToggle = () => {
        if (!showViewToggle || !cardConfig) return null;

        return (
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'table'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    List View
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'grid'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid View
                </button>
            </div>
        );
    };

    const renderGridView = () => {
        if (!cardConfig) return null;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedData.map((row, index) => (
                    <div
                        key={index}
                        onClick={() => onRowClick?.(row)}
                        className={`bg-white rounded-lg border border-gray-200 p-5 transition-all ${hoverable ? 'hover:shadow-lg hover:border-indigo-300' : ''
                            } ${onRowClick ? 'cursor-pointer' : ''}`}
                    >
                        {/* Image */}
                        {cardConfig.image && (
                            <div className="mb-4">
                                {cardConfig.image(row)}
                            </div>
                        )}

                        {/* Title */}
                        <div className="mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {cardConfig.title(row)}
                            </h3>
                            {cardConfig.subtitle && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {cardConfig.subtitle(row)}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="mb-4 text-sm text-gray-600">
                            {cardConfig.content(row)}
                        </div>

                        {/* Actions */}
                        {cardConfig.actions && (
                            <div className="pt-3 border-t border-gray-200">
                                {cardConfig.actions(row)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderTableView = () => {
        return (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`${compact ? 'px-3 py-2' : 'px-4 py-3'} ${getAlignmentClass(column.align)} text-xs font-semibold text-gray-600 uppercase tracking-wider`}
                                    style={{ width: column.width }}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={`divide-y divide-gray-200 ${striped ? 'divide-y-0' : ''}`}>
                        {paginatedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={`
                  ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  ${hoverable ? 'hover:bg-gray-100' : ''}
                  ${onRowClick ? 'cursor-pointer' : ''}
                  transition-colors
                `}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`${compact ? 'px-3 py-2' : 'px-4 py-3'} ${getAlignmentClass(column.align)} text-sm text-gray-800`}
                                    >
                                        {renderCell(row, column)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Data</h3>
                    <p className="text-gray-600">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {renderViewToggle()}

            <div className={`bg-white rounded-lg overflow-hidden ${bordered ? 'border border-gray-200' : ''}`}>
                {viewMode === 'grid' ? renderGridView() : renderTableView()}
                {renderPagination()}
            </div>
        </div>
    );
}

export default CommonTable;
