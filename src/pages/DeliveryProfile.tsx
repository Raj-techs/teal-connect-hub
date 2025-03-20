
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import ImageUpload from '@/components/ui/ImageUpload';
import { Star } from 'lucide-react';

// Mock delivery person data
const mockDeliveryPerson = {
  id: '1',
  name: 'Arjun Kumar',
  email: 'arjun.kumar@example.com',
  phone: '+91 98765 43210',
  vehicleType: 'Motorcycle',
  vehicleNumber: 'MH-02-AB-1234',
  profileImage: undefined,
  isAvailable: true,
  ratings: 4.8,
  totalDeliveries: 87,
  totalEarnings: 1258.50
};

const DeliveryProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: mockDeliveryPerson.name,
    email: mockDeliveryPerson.email,
    phone: mockDeliveryPerson.phone,
    vehicleType: mockDeliveryPerson.vehicleType,
    vehicleNumber: mockDeliveryPerson.vehicleNumber
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isAvailable, setIsAvailable] = useState(mockDeliveryPerson.isAvailable);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd update the profile data in MongoDB
      // and update the profile image in Firebase Storage if changed
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="text-gray-300" size={16} />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={16} />);
      }
    }
    
    return stars;
  };

  return (
    <div className="px-4 py-6 page-transition">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Delivery Profile</h1>
        <p className="text-gray-600 mt-1">Manage your delivery account</p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Performance Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">Rating</p>
              <div className="flex items-center justify-center mt-1">
                <span className="font-semibold mr-1">{mockDeliveryPerson.ratings}</span>
                <div className="flex">
                  {renderStars(mockDeliveryPerson.ratings)}
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Deliveries</p>
              <p className="font-semibold mt-1">{mockDeliveryPerson.totalDeliveries}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Earnings</p>
              <p className="font-semibold text-teal-600 mt-1">${mockDeliveryPerson.totalEarnings.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Availability</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={isAvailable} 
                onCheckedChange={setIsAvailable} 
                id="availability"
              />
              <label htmlFor="availability" className="text-sm font-medium">
                {isAvailable ? 'Available' : 'Unavailable'}
              </label>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              {isAvailable 
                ? 'You are currently available to receive delivery requests.' 
                : 'You are currently not receiving new delivery requests.'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <ImageUpload
                  onChange={setProfileImage}
                  value={mockDeliveryPerson.profileImage}
                  className="mb-2"
                />
                <p className="text-sm text-gray-500">Change profile picture</p>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <Input
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number
                </label>
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryProfile;
