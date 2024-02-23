import React, { useState } from 'react';

export const ImageUploadComponent: React.FC<{ onImagesUploaded: (images: File[]) => void }> = ({ onImagesUploaded }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log(files)
      setSelectedImages(files);
      onImagesUploaded(files);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
    </div>
  );
};

