
import React, { useState } from 'react';
import { ShoppingBag, Package, Clock, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock orders data
const orders = [
  {
    id: "ORD-123456",
    date: "2023-10-15",
    status: "delivered",
    total: 2500,
    items: [
      { id: "1", name: "Handmade Shawl", price: 1500, quantity: 1, image: "/placeholder.svg" },
      { id: "2", name: "Organic Tea Set", price: 1000, quantity: 1, image: "/placeholder.svg" }
    ]
  },
  {
    id: "ORD-123457",
    date: "2023-10-20",
    status: "processing",
    total: 3200,
    items: [
      { id: "3", name: "Embroidered Cushion Cover", price: 800, quantity: 2, image: "/placeholder.svg" },
      { id: "4", name: "Clay Pottery Set", price: 1600, quantity: 1, image: "/placeholder.svg" }
    ]
  },
  {
    id: "ORD-123458",
    date: "2023-10-25",
    status: "shipped",
    total: 2000,
    items: [
      { id: "5", name: "Herbal Soap Bundle", price: 500, quantity: 4, image: "/placeholder.svg" }
    ]
  }
];

// Mock cart items
const cartItems = [
  { id: "6", name: "Hand-painted Tote Bag", price: 950, quantity: 1, image: "/placeholder.svg" },
  { id: "7", name: "Beaded Jewelry Set", price: 1200, quantity: 1, image: "/placeholder.svg" },
  { id: "8", name: "Spice Mix Box", price: 450, quantity: 2, image: "/placeholder.svg" }
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("cart");
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "shipped":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <ShoppingBag className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "shipped":
        return "Shipped";
      case "processing":
        return "Processing";
      default:
        return "Unknown";
    }
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="px-4 py-6 page-transition">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">My Orders</h1>
      
      <Tabs defaultValue="cart" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="cart" className="relative">
            Cart
            <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="orders">Orders History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cart" className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Add some items to your cart from the marketplace</p>
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`flex p-4 ${index !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}`}>
                    <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                      <div className="mt-1 flex justify-between">
                        <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                        <p className="font-medium">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">₹{calculateCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                  <span className="font-medium">₹100</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{(calculateCartTotal() + 100).toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors">
                Proceed to Checkout
              </button>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No orders yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Your order history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{order.id}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 text-sm font-medium">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex py-2">
                        <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                          <div className="mt-1 flex justify-between text-sm">
                            <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                            <p className="font-medium">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-3 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-semibold">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrders;
