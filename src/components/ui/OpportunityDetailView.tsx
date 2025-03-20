
import React from 'react';
import { X, CheckCircle } from 'lucide-react';
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

interface OpportunityDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: {
    id: string;
    title: string;
    description: string;
    image: string;
    requirements?: string[];
    contact?: string;
  };
  onApply: (opportunityId: string) => void;
}

const OpportunityDetailView = ({
  isOpen,
  onClose,
  opportunity,
  onApply,
}: OpportunityDetailViewProps) => {
  const { toast } = useToast();

  const handleApply = () => {
    onApply(opportunity.id);
    toast({
      title: "Application submitted",
      description: `Your application for "${opportunity.title}" has been submitted`,
      variant: "default",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative w-full h-32 overflow-hidden">
          <img 
            src={opportunity.image} 
            alt={opportunity.title} 
            className="w-full h-full object-cover"
          />
          <DialogClose className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 hover:bg-white dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </DialogClose>
        </div>
        
        <DialogHeader className="px-6 pt-4 pb-0">
          <DialogTitle className="text-xl font-semibold">{opportunity.title}</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {opportunity.description}
          </p>
          
          {opportunity.requirements && opportunity.requirements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
                {opportunity.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {opportunity.contact && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              <span className="font-semibold">Contact:</span> {opportunity.contact}
            </p>
          )}
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleApply}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityDetailView;
