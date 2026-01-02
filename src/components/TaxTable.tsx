import { useState, useMemo, useEffect, useRef } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { Filter, Pencil } from 'lucide-react';
import type { EnrichedTaxRecord } from '../types';
import { GenderBadge } from './GenderBadge';
import { fetchCountries } from '../api';

interface TaxTableProps {
    data: EnrichedTaxRecord[];
    onEdit: (record: EnrichedTaxRecord) => void;
}

const columnHelper = createColumnHelper<EnrichedTaxRecord>();

export const TaxTable = ({ data, onEdit }: TaxTableProps) => {
    const [countryFilter, setCountryFilter] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Fetch all countries from API for filter dropdown
    const { data: availableCountries = [] } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    // Close filter dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    // Filter data based on selected countries
    const filteredData = useMemo(() => {
        if (countryFilter.length === 0) return data;
        return data.filter((item) => countryFilter.includes(item.country));
    }, [data, countryFilter]);

    const toggleCountryFilter = (country: string) => {
        setCountryFilter((prev) =>
            prev.includes(country)
                ? prev.filter((c) => c !== country)
                : [...prev, country]
        );
    };

    const columns = useMemo<ColumnDef<EnrichedTaxRecord, any>[]>(
        () => [
            columnHelper.accessor('name', {
                header: 'Entity',
                cell: (info) => (
                    <span className="text-primary-500 font-medium">{info.getValue()}</span>
                ),
            }),
            columnHelper.accessor('gender', {
                header: 'Gender',
                cell: (info) => <GenderBadge gender={info.getValue()} />,
            }),
            columnHelper.accessor('requestDate', {
                header: 'Request date',
                cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
            }),
            columnHelper.accessor('country', {
                header: () => (
                    <div className="flex items-center gap-2 relative" ref={filterRef}>
                        <span>Country</span>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Filter className="w-4 h-4 text-primary-600" />
                        </button>

                        {/* Filter Dropdown */}
                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10 min-w-[150px]">
                                {availableCountries.map((country) => (
                                    <label
                                        key={country}
                                        className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-gray-50"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={countryFilter.includes(country)}
                                                onChange={() => toggleCountryFilter(country)}
                                                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-700">{country}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ),
                cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
            }),
            columnHelper.display({
                id: 'actions',
                header: '',
                cell: ({ row }) => (
                    <button
                        onClick={() => onEdit(row.original)}
                        className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                ),
            }),
        ],
        [countryFilter, isFilterOpen]
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b border-gray-200">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-left px-4 py-3 text-sm font-medium text-gray-500"
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
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-4 text-sm">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
