
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    placeholder?: string;
  }[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
}

const AddItemModal = ({ 
  isOpen, 
  onClose, 
  title, 
  fields, 
  onSubmit,
  submitLabel = "Save" 
}: AddItemModalProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center sm:items-center animate-fade-in"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="p-5 overflow-y-auto max-h-[calc(90vh-64px)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  
                  {field.type === 'image' ? (
                    <ImageUpload 
                      value={formData[field.name]}
                      onChange={(file) => handleChange(field.name, file)}
                      className="mx-auto"
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="input-field"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
              
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "button-teal w-full flex justify-center items-center",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItemModal;
