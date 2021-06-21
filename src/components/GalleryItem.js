import React from "react";

const GalleryItem = (props) => {
  let url = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`;
  return (
    <li>
      <img src={url} alt={props.title} />
    </li>
  );
};

export default GalleryItem;
