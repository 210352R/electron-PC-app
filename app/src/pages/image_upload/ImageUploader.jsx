import React, { useState } from 'react';
import './ImageUploader.css'; // Import the CSS file for styling

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const notifyUser = (content) => {
    console.log('Notify user ------------ ');
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        new Notification('Image Uploade Notification', { body: content });
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        // Send the file and file name to the main process for saving
        console.log('Add image ------------ ');
        window.ipcRenderer.send('save-image', {
          imageData: reader.result,
          fileName: file.name,
        });
        console.log('Add image success ------------ ');
        notifyUser('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  return (
    <div className="image-uploader">
      <h2>Upload and View Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />
      <div className="image-container">
        {image ? (
          <img src={image} alt="Uploaded" className="uploaded-image" />
        ) : (
          <p className="placeholder">No image uploaded</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
