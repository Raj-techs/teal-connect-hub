
import React, { useState } from 'react';
import { Search, MapPin, Clock, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';

// Mock data for delivery products
const mockDeliveryProducts = [
  { 
    id: '1', 
    name: 'Handmade Embroidered Buntings', 
    pickupLocation: 'Village Bazaar Warehouse',
    dropoffLocation: 'Meadow Heights Apartments',
    distance: 3.5,
    price: 7, // $2 per km
    deadline: 'Today, 5:00 PM',
    customerName: 'Meera Singh',
    customerPhone: '+91 98765 43210',
    specialInstructions: 'Please handle with care, fragile items inside.'
  },
  { 
    id: '2', 
    name: 'Organic Herbal Teas', 
    pickupLocation: 'Nourisha Co-operative',
    dropoffLocation: 'Green Valley Residency',
    distance: 5.2,
    price: 10.4,
    deadline: 'Tomorrow, 2:00 PM',
    customerName: 'Arjun Kumar',
    customerPhone: '+91 87654 32109',
    specialInstructions: 'Leave at reception if not at home.'
  },
  { 
    id: '3', 
    name: 'Hand-woven Textile Products', 
    pickupLocation: 'Rural Crafts Center',
    dropoffLocation: 'Urban Hub Apartments',
    distance: 7.8,
    price: 15.6,
    deadline: 'Today, 7:00 PM',
    customerName: 'Shanti Patel',
    customerPhone: '+91 76543 21098',
    specialInstructions: 'Call before delivery.'
  },
  { 
    id: '4', 
    name: 'Traditional Artwork & Paintings', 
    pickupLocation: 'Women Artisans Collective',
    dropoffLocation: 'Creative Space Gallery',
    distance: 2.1,
    price: 4.2,
    deadline: 'Tomorrow, 10:00 AM',
    customerName: 'Ravi Desai',
    customerPhone: '+91 65432 10987',
    specialInstructions: 'Deliver only to the owner.'
  },
];

const DeliveryDashboard = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  
  const filteredProducts = mockDeliveryProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleProductClick = (id: string) => {
    const product = mockDeliveryProducts.find(p => p.id === id);
    if (product) {
      setCurrentProduct(product);
      setIsDrawerOpen(true);
    }
  };
  
  const handleAcceptDelivery = () => {
    // In a real app, you'd update the database
    console.log(`Accepted delivery for product: ${currentProduct?.name}`);
    setIsDrawerOpen(false);
    
    // Navigate to my deliveries or show a toast notification
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Delivery Dashboard</h1>
        <button
          className="flex items-center justify-center p-3 bg-teal-600 text-white rounded-full shadow-subtle hover:bg-teal-700 transition-colors focus-ring"
          aria-label="Delivery Registration"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search deliveries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 w-full bg-gray-100 border-gray-100 rounded-full"
          />
        </div>
      </div>
      
      <div className="space-y-3 mb-20">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                
                <div className="flex items-start space-x-1 text-gray-600 text-sm">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5 text-teal-600" />
                  <div>
                    <p>Pickup: {product.pickupLocation}</p>
                    <p>Dropoff: {product.dropoffLocation}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-1 text-gray-600 text-sm">
                    <Clock size={16} className="text-teal-600" />
                    <span>{product.distance} km</span>
                  </div>
                  <span className="font-medium text-teal-600">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl">{currentProduct?.name}</DrawerTitle>
            <DrawerDescription>Delivery details</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Pickup & Dropoff</h4>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-teal-600" />
                <div>
                  <p>Pickup: {currentProduct?.pickupLocation}</p>
                  <p>Dropoff: {currentProduct?.dropoffLocation}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Customer</h4>
              <p className="text-gray-600">{currentProduct?.customerName}</p>
              <p className="text-gray-600">{currentProduct?.customerPhone}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Delivery Details</h4>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={18} className="text-teal-600" />
                <p>Deadline: {currentProduct?.deadline}</p>
              </div>
              <p className="text-gray-600">Distance: {currentProduct?.distance} km</p>
              <p className="font-medium text-teal-600">Price: ${currentProduct?.price.toFixed(2)}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Special Instructions</h4>
              <p className="text-gray-600">{currentProduct?.specialInstructions}</p>
            </div>
            
            <Button 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full mt-4"
              onClick={handleAcceptDelivery}
            >
              Accept Delivery
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DeliveryDashboard;
