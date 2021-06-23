import React from "react";

// Component Imports
import GalleryItem from "./GalleryItem";
import NoPhotos from "./NoPhotos";

const Gallery = (props) => {
  const results = props.data;

  let photos;
  if (results.length > 0) {
    photos = results.map((photo) => (
      <GalleryItem
        key={photo.id}
        id={photo.id}
        server={photo.server}
        secret={photo.secret}
        title={photo.title}
      />
    ));
  } else {
    photos = <NoPhotos />;
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default Gallery;
