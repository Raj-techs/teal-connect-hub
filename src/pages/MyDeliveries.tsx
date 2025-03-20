
import React, { useState } from 'react';
import { Check, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for my deliveries
const mockMyDeliveries = [
  { 
    id: '1', 
    name: 'Handmade Embroidered Buntings', 
    pickupLocation: 'Village Bazaar Warehouse',
    dropoffLocation: 'Meadow Heights Apartments',
    distance: 3.5,
    earnings: 7,
    status: 'in-progress',
    acceptedAt: '2025-03-20T09:30:00',
  },
  { 
    id: '2', 
    name: 'Organic Herbal Teas', 
    pickupLocation: 'Nourisha Co-operative',
    dropoffLocation: 'Green Valley Residency',
    distance: 5.2,
    earnings: 10.4,
    status: 'delivered',
    acceptedAt: '2025-03-19T14:15:00',
    deliveredAt: '2025-03-19T15:45:00',
  },
  { 
    id: '3', 
    name: 'Hand-woven Textile Products', 
    pickupLocation: 'Rural Crafts Center',
    dropoffLocation: 'Urban Hub Apartments',
    distance: 7.8,
    earnings: 15.6,
    status: 'delivered',
    acceptedAt: '2025-03-18T11:20:00',
    deliveredAt: '2025-03-18T13:10:00',
  },
];

const MyDeliveries = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const activeDeliveries = mockMyDeliveries.filter(delivery => delivery.status === 'in-progress');
  const completedDeliveries = mockMyDeliveries.filter(delivery => delivery.status === 'delivered');
  
  const totalEarnings = completedDeliveries.reduce((sum, delivery) => sum + delivery.earnings, 0);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Deliveries</h1>
        <div className="flex items-center space-x-2 mt-2">
          <TrendingUp size={18} className="text-teal-600" />
          <p className="text-gray-600">
            Total Earnings: <span className="font-medium text-teal-600">${totalEarnings.toFixed(2)}</span>
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-3 mb-20">
          {activeDeliveries.length > 0 ? (
            activeDeliveries.map((delivery) => (
              <Card key={delivery.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{delivery.name}</h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        In Progress
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-1 text-gray-600 text-sm">
                      <MapPin size={16} className="flex-shrink-0 mt-0.5 text-teal-600" />
                      <div>
                        <p>Pickup: {delivery.pickupLocation}</p>
                        <p>Dropoff: {delivery.dropoffLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-1 text-gray-600 text-sm">
                        <Clock size={16} className="text-teal-600" />
                        <span>Accepted: {formatDate(delivery.acceptedAt)}</span>
                      </div>
                      <span className="font-medium text-teal-600">${delivery.earnings.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No active deliveries
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-3 mb-20">
          {completedDeliveries.length > 0 ? (
            completedDeliveries.map((delivery) => (
              <Card key={delivery.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{delivery.name}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Delivered
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-1 text-gray-600 text-sm">
                      <MapPin size={16} className="flex-shrink-0 mt-0.5 text-teal-600" />
                      <div>
                        <p>Pickup: {delivery.pickupLocation}</p>
                        <p>Dropoff: {delivery.dropoffLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-1 text-gray-600 text-sm">
                        <Check size={16} className="text-green-600" />
                        <span>Delivered: {formatDate(delivery.deliveredAt!)}</span>
                      </div>
                      <span className="font-medium text-teal-600">${delivery.earnings.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No completed deliveries
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyDeliveries;
