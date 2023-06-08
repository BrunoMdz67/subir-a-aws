import React, { useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2',
  signatureVersion: 'v4',
});

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const s3 = new AWS.S3({
    accessKeyId: 'AKIAXVR3SL47OD7SR6UZ',
    secretAccessKey: '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',
    region: 'us-east-2',
    signatureVersion: 'v4',
  });

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: 'thelastpen',
      Key: `${Date.now()}_${file.name}`,
      Body: file,
    };
    try {
      const { Location } = await s3.upload(params).promise();
      setImageUrl(Location);
      console.log('Uploaded to S3:', Location);
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <h1>Test Image Upload</h1>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
}
