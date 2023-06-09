


# S3 Image Upload

This is a React component that allows you to select an image file and upload it to an Amazon S3 bucket using the AWS SDK.

## Prerequisites

Before using this code, you need to have the following:

- An Amazon S3 bucket set up
- AWS credentials with appropriate access to the S3 bucket

## Getting Started

1. Install the required dependencies by running `npm install` or `yarn install`.

2. Open the `ImageUploader.js` file.

3. Replace the placeholder values in the `accessKeyId`, `secretAccessKey`, `region`, and `Bucket` parameters with your own AWS credentials and S3 bucket information.

4. Run the application by running `npm start` or `yarn start`.

## Usage

1. In your React application, import the `ImageUploader` component:

   ```jsx
   import ImageUploader from './ImageUploader';

    Use the ImageUploader component in your code:

    jsx

    function App() {
      return (
        <div>
          <h1>My App</h1>
          <ImageUploader />
        </div>
      );
    }

    When the component is rendered, you will see a "Select Image" button. Click on it to open the file picker and choose an image file.

    After selecting an image, you will see a preview of the image. Click on the "Upload Image" button to initiate the upload to your S3 bucket.

    The uploaded image will be logged to the console. You can perform additional actions, such as updating the UI or storing the image URL, inside the handleImageUpload function.

Customization

You can customize the appearance of the buttons and the preview image by modifying the CSS in the ImageUploader.css file.

Files in the AWS s3:

![image](https://github.com/BrunoMdz67/subir-a-aws/assets/81934385/6d72150f-c43a-4b40-9ecd-bebe96f5ddc6)


