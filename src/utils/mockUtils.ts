import type { TaxRecord, EnrichedTaxRecord, Gender } from '../types';

/**
 * Randomly assigns gender and adds static request date to tax records
 * @param records Raw tax records from API
 * @returns Enriched tax records with gender and date
 */
export const enrichTaxData = (records: TaxRecord[]): EnrichedTaxRecord[] => {
    const genders: Gender[] = ['Male', 'Female'];
    const staticDate = 'Jan 20, 2025';

    return records.map((record) => ({
        ...record,
        gender: genders[Math.floor(Math.random() * genders.length)],
        requestDate: staticDate,
    }));
};
