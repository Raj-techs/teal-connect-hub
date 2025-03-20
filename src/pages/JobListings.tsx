
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ContactCard from '@/components/ui/ContactCard';
import AddItemModal from '@/components/ui/AddItemModal';

// Updated mock data to include the avatar property
const mockContacts = [
  { id: '1', name: 'Aurora Raja', role: 'Nourisha', avatar: undefined },
  { id: '2', name: 'Deepinder Kaur', role: 'Artisan', avatar: undefined },
  { id: '3', name: 'Faiza Ali', role: 'Wellness Specialist', avatar: undefined },
  { id: '4', name: 'Meena Sharma', role: 'Crafter', avatar: undefined },
  { id: '5', name: 'Priya Patel', role: 'Herbal Tea Maker', avatar: undefined },
  { id: '6', name: 'Lakshmi Reddy', role: 'Textile Artist', avatar: undefined },
];

const JobListings = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleContactClick = (id: string) => {
    console.log(`Contact clicked: ${id}`);
    // Navigate to contact details
  };
  
  const handleAddContact = (data: Record<string, any>) => {
    // In a real app, you'd send this to an API
    const newContact = {
      id: `${contacts.length + 1}`,
      name: data.name,
      role: data.role,
      // In a real app, you'd upload the image and get a URL back
      avatar: data.image ? URL.createObjectURL(data.image) : undefined,
    };
    
    setContacts([newContact, ...contacts]);
    return Promise.resolve();
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Women Contacts</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center p-3 bg-teal-600 text-white rounded-full shadow-subtle hover:bg-teal-700 transition-colors focus-ring"
          aria-label="Add Contact"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {contacts.map((contact) => (
          <ContactCard 
            key={contact.id}
            id={contact.id}
            name={contact.name}
            role={contact.role}
            avatar={contact.avatar}
            onClick={handleContactClick}
          />
        ))}
      </div>
      
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Contact"
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter contact name' },
          { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Enter role or occupation' },
          { name: 'image', label: 'Photo', type: 'image' }
        ]}
        onSubmit={handleAddContact}
        submitLabel="Add Contact"
      />
    </div>
  );
};

export default JobListings;
