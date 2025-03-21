
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import OpportunityCard from '@/components/ui/OpportunityCard';
import OpportunityDetailView from '@/components/ui/OpportunityDetailView';
import AddItemModal from '@/components/ui/AddItemModal';
import { useToast } from '@/hooks/use-toast';

// Enhanced mock data with additional fields
const mockOpportunities = [
  {
    id: '1',
    title: 'Organic Herbal Teas',
    description: 'Join our tea production team to create high-quality herbal teas',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    requirements: [
      'Experience with herb processing',
      'Knowledge of tea blending techniques',
      'Available for at least 20 hours per week'
    ],
    contact: 'teajobs@nourishaco-op.com'
  },
  {
    id: '2',
    title: 'Textile Weaving Workshop',
    description: 'Learn traditional weaving techniques and join our artisan network',
    image: 'https://images.unsplash.com/photo-1528492944429-a340c92b0d2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    requirements: [
      'Interest in traditional crafts',
      'Good hand-eye coordination',
      'Commitment to learning'
    ],
    contact: 'workshops@ruralcraftscenter.org'
  },
  {
    id: '3',
    title: 'Community Kitchen Project',
    description: 'Prepare and distribute nutritious meals to local families',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e9699e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    requirements: [
      'Basic cooking skills',
      'Food safety knowledge preferred',
      'Passion for community service'
    ],
    contact: 'kitchen@communityhelpers.org'
  },
  {
    id: '4',
    title: 'Digital Skills Training',
    description: 'Free workshops to learn basic computer and internet skills',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    requirements: [
      'No previous experience required',
      'Must bring your own device if possible',
      'Regular attendance expected'
    ],
    contact: 'digitaltraining@techhub.com'
  },
  {
    id: '5',
    title: 'Sustainable Farming Project',
    description: 'Join our urban farming initiative and learn sustainable practices',
    image: 'https://images.unsplash.com/photo-1607350195728-39877630527e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    requirements: [
      'Interest in sustainable agriculture',
      'Ability to perform physical labor',
      'Commitment to environmental values'
    ],
    contact: 'farming@sustainableliving.org'
  }
];

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<null | typeof mockOpportunities[0]>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { toast } = useToast();
  
  const handleOpportunityClick = (id: string) => {
    console.log(`Opportunity clicked: ${id}`);
    const opportunity = opportunities.find(opp => opp.id === id);
    if (opportunity) {
      setSelectedOpportunity(opportunity);
      setIsDetailOpen(true);
    }
  };
  
  const handleAddOpportunity = (data: Record<string, any>) => {
    // In a real app, you'd send this to an API
    const newOpportunity = {
      id: `${opportunities.length + 1}`,
      title: data.title,
      description: data.description,
      image: data.image ? URL.createObjectURL(data.image) : 'https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      requirements: data.requirements ? data.requirements.split(',').map((req: string) => req.trim()) : [],
      contact: data.contact || '',
    };
    
    setOpportunities([newOpportunity, ...opportunities]);
    return Promise.resolve();
  };

  const handleApply = (opportunityId: string) => {
    console.log(`Applied to opportunity: ${opportunityId}`);
    // In a real app, you would make an API call to submit the application
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Job Opportunities</h1>
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
          { name: 'requirements', label: 'Requirements', type: 'textarea', required: false, placeholder: 'Enter requirements (comma separated)' },
          { name: 'contact', label: 'Contact', type: 'text', required: false, placeholder: 'Enter contact information' },
          { name: 'image', label: 'Photo', type: 'image' }
        ]}
        onSubmit={handleAddOpportunity}
        submitLabel="Add Opportunity"
      />

      {selectedOpportunity && (
        <OpportunityDetailView
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          opportunity={selectedOpportunity}
          onApply={handleApply}
        />
      )}
    </div>
  );
};

export default Opportunities;
