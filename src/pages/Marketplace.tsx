
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import JobCard from '@/components/ui/JobCard';
import AddItemModal from '@/components/ui/AddItemModal';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data
const mockJobs = [
  {
    id: '1',
    title: 'Handmade Embroidered Buntings',
    location: 'Village Bazaar Warehouse',
    image: 'https://images.unsplash.com/photo-1594142404303-8b2cc0b4c9c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    badge: '30+'
  },
  {
    id: '2',
    title: 'Organic Herbal Teas',
    location: 'Nourisha Co-operative',
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Hand-woven Textile Products',
    location: 'Rural Crafts Center',
    image: 'https://images.unsplash.com/photo-1528492944429-a340c92b0d2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    badge: 'New'
  },
  {
    id: '4',
    title: 'Traditional Artwork & Paintings',
    location: 'Women Artisans Collective',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Handmade Jewelry Collection',
    location: 'Artisan Showcase',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    badge: '10+'
  },
  {
    id: '6',
    title: 'Organic Skincare Products',
    location: 'Wellness Hub',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const Marketplace = () => {
  const isMobile = useIsMobile();
  const [jobs, setJobs] = useState(mockJobs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleJobClick = (id: string) => {
    console.log(`Job clicked: ${id}`);
    // Navigate to job details
  };
  
  const handleAddJob = (data: Record<string, any>) => {
    // In a real app, you'd send this to an API
    const newJob = {
      id: `${jobs.length + 1}`,
      title: data.title,
      location: data.location,
      image: data.image ? URL.createObjectURL(data.image) : 'https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    };
    
    setJobs([newJob, ...jobs]);
    return Promise.resolve();
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Job Catalog</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center p-3 bg-teal-600 text-white rounded-full shadow-subtle hover:bg-teal-700 transition-colors focus-ring"
          aria-label="Add Job"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-3`}>
        {jobs.map((job) => (
          <JobCard 
            key={job.id}
            id={job.id}
            title={job.title}
            location={job.location}
            image={job.image}
            badge={job.badge}
            onClick={handleJobClick}
          />
        ))}
      </div>
      
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Job"
        fields={[
          { name: 'title', label: 'Job Title', type: 'text', required: true, placeholder: 'Enter job title' },
          { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Enter location' },
          { name: 'image', label: 'Photo', type: 'image' }
        ]}
        onSubmit={handleAddJob}
        submitLabel="Add Job"
      />
    </div>
  );
};

export default Marketplace;
