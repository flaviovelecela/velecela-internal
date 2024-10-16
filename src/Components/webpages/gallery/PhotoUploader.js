import React, { useState } from 'react';
import { db } from '../../Firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function PhotoUploader() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('photo', file);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`File upload failed: ${errorText}`);
      }
  
      const { filePath } = await response.json();
      console.log('Uploaded file path:', filePath);
  
      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'photos'), {
        title,
        description,
        src: filePath,
        createdAt: new Date()
      });
      console.log('Document added with ID:', docRef.id);
  
      alert('Photo uploaded successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(`Failed to upload photo: ${error.message}`);
    }
  };

    return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Photo:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload Photo</button>
    </form>
  );
}

export default PhotoUploader;