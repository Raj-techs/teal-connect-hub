
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import OpportunityCard from '@/components/ui/OpportunityCard';
import AddItemModal from '@/components/ui/AddItemModal';

// Mock data
const mockOpportunities = [
  {
    id: '1',
    title: 'Organic Herbal Teas',
    description: 'Join our tea production team to create high-quality herbal teas',
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Textile Weaving Workshop',
    description: 'Learn traditional weaving techniques and join our artisan network',
    image: 'https://images.unsplash.com/photo-1528492944429-a340c92b0d2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Community Kitchen Project',
    description: 'Prepare and distribute nutritious meals to local families',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e9699e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Digital Skills Training',
    description: 'Free workshops to learn basic computer and internet skills',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Sustainable Farming Project',
    description: 'Join our urban farming initiative and learn sustainable practices',
    image: 'https://images.unsplash.com/photo-1607350195728-39877630527e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleOpportunityClick = (id: string) => {
    console.log(`Opportunity clicked: ${id}`);
    // Navigate to opportunity details
  };
  
  const handleAddOpportunity = (data: Record<string, any>) => {
    // In a real app, you'd send this to an API
    const newOpportunity = {
      id: `${opportunities.length + 1}`,
      title: data.title,
      description: data.description,
      image: data.image ? URL.createObjectURL(data.image) : 'https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    };
    
    setOpportunities([newOpportunity, ...opportunities]);
    return Promise.resolve();
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Job Opportunities</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center p-3 bg-teal-600 text-white rounded-full shadow-subtle hover:bg-teal-700 transition-colors focus-ring"
          aria-label="Add Opportunity"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="space-y-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard 
            key={opportunity.id}
            id={opportunity.id}
            title={opportunity.title}
            description={opportunity.description}
            image={opportunity.image}
            onClick={handleOpportunityClick}
          />
        ))}
      </div>
      
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Opportunity"
        fields={[
          { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter opportunity title' },
          { name: 'description', label: 'Description', type: 'text', required: true, placeholder: 'Enter brief description' },
          { name: 'image', label: 'Photo', type: 'image' }
        ]}
        onSubmit={handleAddOpportunity}
        submitLabel="Add Opportunity"
      />
    </div>
  );
};

export default Opportunities;
