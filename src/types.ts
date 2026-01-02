export type Gender = 'Male' | 'Female';

export interface TaxRecord {
    id: string;
    createdAt: string;
    name: string;
    avatar?: string;
    country: string;
}

export interface EnrichedTaxRecord extends TaxRecord {
    gender: Gender;
    requestDate: string;
}
