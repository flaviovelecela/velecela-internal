import React, { useState } from 'react';

function EditPhotoForm({ photo, onUpdate, onCancel }) {
  const [title, setTitle] = useState(photo.title);
  const [description, setDescription] = useState(photo.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...photo, title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditPhotoForm;