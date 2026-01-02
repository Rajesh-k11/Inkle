import axios from 'axios';
import type { TaxRecord } from './types';

const API_BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchTaxes = async (): Promise<TaxRecord[]> => {
    const response = await apiClient.get<TaxRecord[]>('/taxes');
    return response.data;
};

export const updateTax = async (id: string, data: Partial<TaxRecord>): Promise<TaxRecord> => {
    const response = await apiClient.put<TaxRecord>(`/taxes/${id}`, data);
    return response.data;
};

export const fetchCountries = async (): Promise<string[]> => {
    const response = await apiClient.get<Array<{ id: string; name: string }>>('/countries');
    return response.data.map(country => country.name);
};
