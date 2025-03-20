
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value?: string;
  className?: string;
}

const ImageUpload = ({ onChange, value, className }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null);
      setPreview(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div 
        className={cn(
          "relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-teal-500 group",
          preview ? "border-solid border-teal-500" : ""
        )}
        onClick={triggerFileInput}
      >
        {preview ? (
          <>
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <ImageIcon size={32} className="mb-2" />
            <span className="text-sm text-center px-2">Upload image</span>
          </div>
        )}
      </div>
      
      {preview && (
        <button
          type="button"
          className="mt-2 text-sm text-red-500 hover:text-red-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
            setPreview(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
