
import React from 'react';
import { X, ShoppingCart, Package } from 'lucide-react';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from './dialog';

interface ProductDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    location: string;
    image: string;
    price?: string;
    description?: string;
    badge?: string;
  };
  onAddToCart: (productId: string) => void;
  onOrder: (productId: string) => void;
}

const ProductDetailView = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onOrder,
}: ProductDetailViewProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product.id);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  const handleOrder = () => {
    onOrder(product.id);
    toast({
      title: "Order placed",
      description: `Your order for ${product.title} has been placed successfully`,
      variant: "default",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative w-full aspect-video overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          <DialogClose className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 hover:bg-white dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </DialogClose>
          {product.badge && (
            <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {product.badge}
            </div>
          )}
        </div>
        
        <DialogHeader className="px-6 pt-4 pb-0">
          <DialogTitle className="text-xl font-semibold">{product.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {product.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4">
          {product.price && (
            <div className="text-lg font-bold mb-2 text-teal-600 dark:text-teal-400">
              {product.price}
            </div>
          )}
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {product.description || "No description available for this product. Please contact the seller for more information."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 gap-2"
              variant="outline"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              onClick={handleOrder}
              className="flex-1 gap-2"
            >
              <Package className="h-4 w-4" />
              Order Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailView;
