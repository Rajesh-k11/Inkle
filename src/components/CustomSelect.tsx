import { useState, useRef, useEffect } from 'react';
import { MapPin, Pencil, ChevronDown } from 'lucide-react';

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    label?: string;
}

export const CustomSelect = ({ value, onChange, options, label }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-3 py-2 text-left border rounded-md bg-white flex items-center justify-between ${isOpen ? 'border-primary-600 ring-1 ring-primary-600' : 'border-gray-300'
                    }`}
            >
                <span className="text-gray-700">{value}</span>
                <div className="flex items-center gap-2">
                    <Pencil className="w-4 h-4 text-gray-400" />
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{option}</span>
                            </div>
                            <Pencil className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
