import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { EnrichedTaxRecord } from '../types';
import { CustomSelect } from './CustomSelect';
import { fetchCountries } from '../api';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    record: EnrichedTaxRecord | null;
    onSave: (id: string, data: { name: string; country: string }) => void;
}

interface FormData {
    name: string;
    country: string;
}

export const EditModal = ({ isOpen, onClose, record, onSave }: EditModalProps) => {
    const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();

    // Fetch countries from API
    const { data: countryOptions = [] } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    useEffect(() => {
        if (record) {
            setValue('name', record.name);
            setValue('country', record.country);
        }
    }, [record, setValue]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const onSubmit = (data: FormData) => {
        if (record) {
            onSave(record.id, data);
            onClose();
            reset();
        }
    };

    if (!isOpen || !record) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Edit Customer</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                        />
                    </div>

                    {/* Country Field */}
                    <div className="mb-6">
                        <CustomSelect
                            label="Country"
                            value={watch('country')}
                            onChange={(value) => setValue('country', value)}
                            options={countryOptions}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-medium"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
