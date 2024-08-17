import React from "react";

export const ImageUploadComponent: React.FC<{
  onImagesUploaded: (images: File[]) => void;
  required: boolean;
}> = ({ onImagesUploaded, required }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const promises = files.map(
        (file) =>
          new Promise<File>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target?.result as string;
              const imageData = dataURLtoFile(imageBase64, file.name);
              resolve(imageData);
            };
            reader.readAsDataURL(file);
          })
      );

      Promise.all(promises).then((images) => {
        onImagesUploaded(images);
      });
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        required={required}
      />
    </div>
  );
};
