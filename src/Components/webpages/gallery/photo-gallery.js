import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './photo-gallery.module.css';

const photos = [
  { id: 1, src: '/tx-buffalo-1.jpg', title: 'Eating buffalo - Texas', description: 'Buffalo grazing in a lush, green field' },
  { id: 2, src: '/tx-mountain-1.jpg', title: 'Photo 2', description: 'Description for Photo 2' },
  { id: 3, src: '/tx-mountain-2.jpg', title: 'Photo 3', description: 'Description for Photo 3' },
  // Add more photos here
];

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="container">
      <div className={`row ${selectedPhoto ? styles.blurBackground : ''}`}>
        {photos.map(photo => (
          <div className="col-md-4" key={photo.id}>
            <img
              src={photo.src}
              alt={photo.title}
              className={`img-thumbnail ${styles.imgThumbnail}`}
              onClick={() => handlePhotoClick(photo)}
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <>
          <div className={styles.modalBackdrop}></div>
          <div className={`modal show ${styles.modal}`} style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedPhoto.title}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body text-center">
                  <img src={selectedPhoto.src} alt={selectedPhoto.title} className="img-fluid" />
                  <p>{selectedPhoto.description}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PhotoGallery;
