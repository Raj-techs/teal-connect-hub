
import React from 'react';
import { X, Mail, Phone, MapPin, Link2, CheckCircle, Star } from 'lucide-react';
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

interface ContactDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  contact: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    description?: string;
    skills?: string[];
    contact?: string;
    location?: string;
  };
  onConnect: (contactId: string) => void;
}

const ContactDetailView = ({
  isOpen,
  onClose,
  contact,
  onConnect,
}: ContactDetailViewProps) => {
  const { toast } = useToast();

  const handleConnect = () => {
    onConnect(contact.id);
    toast({
      title: "Connection request sent",
      description: `Your connection request to "${contact.name}" has been sent`,
      variant: "default",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative w-full h-40 bg-gradient-to-r from-teal-500 to-teal-600 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {contact.avatar ? (
              <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-teal-700 text-white flex items-center justify-center text-2xl font-bold border-4 border-white">
                {getInitials(contact.name)}
              </div>
            )}
          </div>
          <DialogClose className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 hover:bg-white dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </DialogClose>
        </div>
        
        <DialogHeader className="px-6 pt-4 pb-0">
          <DialogTitle className="text-xl font-semibold text-center mt-2">{contact.name}</DialogTitle>
          <DialogDescription className="text-center text-teal-600 dark:text-teal-400 font-medium">
            {contact.role}
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4">
          {contact.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
              {contact.description}
            </p>
          )}
          
          {contact.skills && contact.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-1">
                {contact.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-2 mb-4">
            {contact.location && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                <span>{contact.location}</span>
              </div>
            )}
            
            {contact.contact && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-teal-500" />
                <span>{contact.contact}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2 mt-6">
            <Button 
              variant="secondary"
              className="flex-1"
              onClick={() => window.open(`mailto:${contact.contact}`)}
            >
              <Mail className="h-4 w-4 mr-1" />
              Message
            </Button>
            
            <Button 
              className="flex-1 gap-2"
              onClick={handleConnect}
            >
              <CheckCircle className="h-4 w-4" />
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailView;
