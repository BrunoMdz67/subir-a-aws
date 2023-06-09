import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import './ImageUploader.css';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    if (selectedFile) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAXVR3SL47OD7SR6UZ',
          secretAccessKey: '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',
          region: 'us-east-2',
          signatureVersion: 'v4',
        });

      const params = {
        Bucket: 'thelastpen',
        Key: selectedFile.name,
        Body: selectedFile,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log('Error uploading file:', err);
        } else {
          console.log('File uploaded successfully:', data.Location);
          // You can perform any additional actions here, such as updating the UI or storing the file URL.
        }
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Preview file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button onClick={handleSelectFile}>Select File</button>
        {selectedFile && (
          <button onClick={handleFileUpload} disabled={!selectedFile}>
            Upload File
          </button>
        )}
      </div>
      {previewFile && (
        <div>
          <p>Preview:</p>
          <p>{selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
