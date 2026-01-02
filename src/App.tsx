import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTaxes, updateTax } from './api';
import { enrichTaxData } from './utils/mockUtils';
import { TaxTable } from './components/TaxTable';
import { EditModal } from './components/EditModal';
import type { EnrichedTaxRecord } from './types';
import './index.css';

const queryClient = new QueryClient();

function TaxApp() {
  const [selectedRecord, setSelectedRecord] = useState<EnrichedTaxRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClientInstance = useQueryClient();

  // Fetch and enrich tax data
  const { data: enrichedData = [], isLoading, error } = useQuery({
    queryKey: ['taxes'],
    queryFn: async () => {
      const rawData = await fetchTaxes();
      return enrichTaxData(rawData);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; country: string } }) =>
      updateTax(id, data),
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['taxes'] });
    },
  });

  const handleEdit = (record: EnrichedTaxRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = (id: string, data: { name: string; country: string }) => {
    updateMutation.mutate({ id, data });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tax Records</h1>
        <div className="bg-white rounded-lg shadow">
          <TaxTable data={enrichedData} onEdit={handleEdit} />
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
        onSave={handleSave}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaxApp />
    </QueryClientProvider>
  );
}

export default App;
