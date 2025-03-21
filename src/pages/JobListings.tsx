
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ContactCard from '@/components/ui/ContactCard';
import AddItemModal from '@/components/ui/AddItemModal';
import ContactDetailView from '@/components/ui/ContactDetailView';

// Updated mock data to include more details for the contact view
const mockContacts = [
  { 
    id: '1', 
    name: 'Aurora Raja', 
    role: 'Nourisha', 
    avatar: undefined,
    description: 'Aurora specializes in sustainable food production and dietary education for women in rural communities.',
    skills: ['Food Production', 'Nutrition Education', 'Sustainable Farming'],
    contact: 'aurora.raja@example.com',
    location: 'Bangalore, Karnataka'
  },
  { 
    id: '2', 
    name: 'Deepinder Kaur', 
    role: 'Artisan', 
    avatar: undefined,
    description: 'Deepinder creates handcrafted textiles using traditional techniques passed down through generations.',
    skills: ['Textile Design', 'Traditional Weaving', 'Natural Dyes'],
    contact: 'deepinder.kaur@example.com',
    location: 'Amritsar, Punjab'
  },
  { 
    id: '3', 
    name: 'Faiza Ali', 
    role: 'Wellness Specialist', 
    avatar: undefined,
    description: 'Faiza provides holistic health solutions combining modern science with traditional Ayurvedic practices.',
    skills: ['Ayurveda', 'Health Consulting', 'Wellness Workshops'],
    contact: 'faiza.ali@example.com',
    location: 'Hyderabad, Telangana'
  },
  { 
    id: '4', 
    name: 'Meena Sharma', 
    role: 'Crafter', 
    avatar: undefined,
    description: 'Meena specializes in sustainable crafts using recycled materials, teaching women to create marketable products.',
    skills: ['Recycled Crafts', 'Business Training', 'Product Design'],
    contact: 'meena.sharma@example.com',
    location: 'Jaipur, Rajasthan'
  },
  { 
    id: '5', 
    name: 'Priya Patel', 
    role: 'Herbal Tea Maker', 
    avatar: undefined,
    description: 'Priya creates organic herbal tea blends using locally sourced ingredients with medicinal properties.',
    skills: ['Herbalism', 'Tea Blending', 'Organic Farming'],
    contact: 'priya.patel@example.com',
    location: 'Darjeeling, West Bengal'
  },
  { 
    id: '6', 
    name: 'Lakshmi Reddy', 
    role: 'Textile Artist', 
    avatar: undefined,
    description: 'Lakshmi combines traditional textile techniques with contemporary designs to create unique fashion pieces.',
    skills: ['Fashion Design', 'Traditional Embroidery', 'Contemporary Textiles'],
    contact: 'lakshmi.reddy@example.com',
    location: 'Chennai, Tamil Nadu'
  },
];

const JobListings = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  
  const handleContactClick = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      setSelectedContact(contact);
      setIsDetailViewOpen(true);
    }
  };
  
  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedContact(null);
  };
  
  const handleAddContact = (data: Record<string, any>) => {
    // In a real app, you'd send this to an API
    const newContact = {
      id: `${contacts.length + 1}`,
      name: data.name,
      role: data.role,
      // In a real app, you'd upload the image and get a URL back
      avatar: data.image ? URL.createObjectURL(data.image) : undefined,
      description: data.description || "No description provided",
      skills: data.skills ? data.skills.split(',').map((s: string) => s.trim()) : [],
      contact: data.contact || "No contact information",
      location: data.location || "No location provided"
    };
    
    setContacts([newContact, ...contacts]);
    return Promise.resolve();
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Women Contacts</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center p-3 bg-teal-600 text-white rounded-full shadow-subtle hover:bg-teal-700 transition-colors focus-ring"
          aria-label="Add Contact"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
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
          { name: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'Enter description' },
          { name: 'skills', label: 'Skills', type: 'text', required: false, placeholder: 'Enter skills (comma separated)' },
          { name: 'contact', label: 'Contact', type: 'text', required: false, placeholder: 'Enter contact information' },
          { name: 'location', label: 'Location', type: 'text', required: false, placeholder: 'Enter location' },
          { name: 'image', label: 'Photo', type: 'image' }
        ]}
        onSubmit={handleAddContact}
        submitLabel="Add Contact"
      />
      
      {selectedContact && (
        <ContactDetailView
          isOpen={isDetailViewOpen}
          onClose={handleCloseDetailView}
          contact={selectedContact}
          onConnect={(contactId) => {
            console.log(`Connected with contact: ${contactId}`);
            // Implement connection logic here
          }}
        />
      )}
    </div>
  );
};

export default JobListings;
