import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import './ImageUploader.css';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    if (selectedImage) {
      const s3 = new AWS.S3({
        accessKeyId: 'AKIAXVR3SL47OD7SR6UZ',
        secretAccessKey: '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',
        region: 'us-east-2',
        signatureVersion: 'v4',
      });

      const params = {
        Bucket: 'thelastpen',
        Key: selectedImage.name,
        Body: selectedImage,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log('Error uploading image:', err);
        } else {
          console.log('Image uploaded successfully:', data.Location);
          // You can perform any additional actions here, such as updating the UI or storing the image URL.
        }
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setError('Please select an image file.');
      setPreviewImage(null);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <div>
        <button onClick={handleSelectImage}>Select Image</button>
        {selectedImage && (
          <button onClick={handleImageUpload} disabled={!selectedImage}>
            Upload Image
          </button>
        )}
      </div>
      {previewImage && (
        <img src={previewImage} alt="Preview" style={{ width: '200px', height: 'auto' }} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUploader;
