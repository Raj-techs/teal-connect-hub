import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import JobCard from '@/components/ui/JobCard';
import AddItemModal from '@/components/ui/AddItemModal';
import ProductDetailView from '@/components/ui/ProductDetailView';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

// Mock data with added price and description
const mockJobs = [
  {
    id: '1',
    title: 'Handmade Embroidered Buntings',
    location: 'Village Bazaar Warehouse',
    image: 'https://5.imimg.com/data5/MO/JW/MY-26657759/photo-craft-work.jpg',
    badge: '30+',
    price: '₹899',
    description: 'Beautiful handmade embroidered buntings made by skilled artisans from local villages. Each piece is unique and tells a story of tradition and craftsmanship.'
  },
  {
    id: '2',
    title: 'Organic Herbal Teas',
    location: 'Nourisha Co-operative',
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '₹349',
    description: 'A collection of organic herbal teas sourced directly from small-scale farmers. These teas are made with sustainably harvested ingredients and support local livelihoods.'
  },
  {
    id: '3',
    title: 'Hand-woven Textile Products',
    location: 'Rural Crafts Center',
    image: 'https://images.unsplash.com/photo-1528492944429-a340c92b0d2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    price: '₹1,499',
    description: 'Exquisitely hand-woven textiles created using traditional techniques passed down through generations. Each product supports rural artisans and helps preserve cultural heritage.'
  },
  {
    id: '4',
    title: 'Traditional Artwork & Paintings',
    location: 'Women Artisans Collective',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '₹2,999',
    description: 'Authentic traditional artwork and paintings created by women artisans. These pieces showcase indigenous art forms and provide sustainable livelihoods for women in rural communities.'
  },
  {
    id: '5',
    title: 'Handmade Jewelry Collection',
    location: 'Artisan Showcase',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    badge: '10+',
    price: '₹749',
    description: 'Unique handmade jewelry crafted with care using locally sourced materials. Each piece is created by skilled artisans who incorporate traditional designs with modern aesthetics.'
  },
  {
    id: '6',
    title: 'Organic Skincare Products',
    location: 'Wellness Hub',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: '₹599',
    description: 'All-natural skincare products made with organic ingredients harvested from community gardens. These products are chemical-free and support sustainable farming practices.'
  }
];

const Marketplace = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | typeof mockJobs[0]>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const handleJobClick = (id: string) => {
    console.log(`Job clicked: ${id}`);
    const product = jobs.find(job => job.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsDetailOpen(true);
    }
  };
  
  const handleAddJob = (data: Record<string, any>) => {
    const newJob = {
      id: `${jobs.length + 1}`,
      title: data.title,
      location: data.location,
    image: data.image ? URL.createObjectURL(data.image) : mockJobs[0].image,

      price: data.price || '₹499',
      description: data.description || 'No description provided.',
    };
    
    setJobs([newJob, ...jobs]);
    return Promise.resolve();
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Added to cart: ${productId}`);
  };

  const handleOrder = (productId: string) => {
    console.log(`Ordered: ${productId}`);
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Job Catalog</h1>
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
          { name: 'price', label: 'Price', type: 'text', required: true, placeholder: 'Enter price' },
          { name: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'Enter product description' },
          { name: 'image', label: 'Photo', type: 'image' }
        ]}
        onSubmit={handleAddJob}
        submitLabel="Add Job"
      />

      {selectedProduct && (
        <ProductDetailView
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onOrder={handleOrder}
        />
      )}
    </div>
  );
};

export default Marketplace;
