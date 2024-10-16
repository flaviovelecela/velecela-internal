import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase/firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../Context/AuthContext';
import PhotoUploader from './PhotoUploader';
import EditPhotoForm from './EditPhotoForm'; // You'll need to create this component

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const { userRoles } = useAuth();  // Use userRoles (plural) instead of userRole

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const photosCollection = collection(db, 'photos');
    const q = query(photosCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const photoList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPhotos(photoList);
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
  };

  const handleDelete = async (photo) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, 'photos', photo.id));

        // If you have an API for deleting files on the server, use this:
        const response = await fetch('/api/delete-photo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: photo.src }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete photo from server');
        }

        // Refresh the photo list
        fetchPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
        alert('Failed to delete photo. Please try again.');
      }
    }
  };

  const handleUpdatePhoto = async (updatedPhoto) => {
    try {
      await updateDoc(doc(db, 'photos', updatedPhoto.id), {
        title: updatedPhoto.title,
        description: updatedPhoto.description,
      });
      setEditingPhoto(null);
      fetchPhotos();
    } catch (error) {
      console.error('Error updating photo:', error);
      alert('Failed to update photo. Please try again.');
    }
  };

  return (
    <div className="container">
      {/* Show uploader if the user has "contributor" or "admin" roles */}
      {userRoles?.includes('contributor') || userRoles?.includes('admin') ? (
        <PhotoUploader onPhotoUploaded={fetchPhotos} />
      ) : null}

      <div className="row">
        {photos.map(photo => (
          <div className="col-md-4" key={photo.id}>
            <img src={photo.src} alt={photo.title} className="img-thumbnail" />
            <h5>{photo.title}</h5>
            <p>{photo.description}</p>
            {/* Show edit/delete options if the user has "contributor" or "admin" roles */}
            {userRoles?.includes('contributor') || userRoles?.includes('admin') ? (
              <div>
                <button onClick={() => handleEdit(photo)}>Edit</button>
                <button onClick={() => handleDelete(photo)}>Delete</button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Render the Edit Photo Form if a photo is being edited */}
      {editingPhoto && (
        <EditPhotoForm
          photo={editingPhoto}
          onUpdate={handleUpdatePhoto}
          onCancel={() => setEditingPhoto(null)}
        />
      )}
    </div>
  );
}

export default PhotoGallery;
