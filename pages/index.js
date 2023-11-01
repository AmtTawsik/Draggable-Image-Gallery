"use client"

import { useEffect, useRef, useState } from 'react';
import imagesData from '../public/images.json';

export default function Home() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isHovering, setIsHovering] = useState(null);

  const handleMouseOver = (imageId) => {
    setIsHovering(imageId);
  };

  const handleMouseOut = () => {
    setIsHovering(null);
  };



  useEffect(() => {
    setImages(imagesData);
  }, []);

  const toggleSelectImage = (imageId) => {
    // Check if the image is already selected
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      // Image is not selected, add it to the selectedImages array
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleSelectImage = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleMultipleDelete = () => {
    // Remove selected images from the state
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const dragImage = useRef(0)
  const dragOverImage = useRef(0)

  function handleSort(){
    const imageClone = [...images]
    const temp = imageClone[dragImage.current]
    imageClone[dragImage.current] = imageClone[dragOverImage.current]
    imageClone[dragOverImage.current] = temp
    setImages(imageClone)
  }
  return (
    <div>
      <section className='flex justify-between items-center w-11/12 mx-auto'>
        <h3 className='text-2xl font-bold'>{selectedImages.length} {selectedImages.length === 1 ? <span>File</span> : <span>Files</span>} Selected</h3>
        <div className='font-bold text-red-500'>
          {selectedImages.length > 0 && (
            <button onClick={handleMultipleDelete}>Delete {selectedImages.length === 1 ? <span>File</span> : <span>Files</span>}</button>
          )}
        </div>
      </section>
      <hr className='my-2' />
      <section className="grid grid-cols-5 gap-5 w-11/12 mx-auto">
        {images.map((image, index) => (
          <div
            onMouseOver={() => handleMouseOver(image.id)}
            onMouseOut={handleMouseOut}
            className={`w-full relative border rounded-lg hover:brightness-75 hover:bg-gray-300 ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1'}  ${selectedImages.includes(image.id) ? 'brightness-[95%]' : ''}`}
            key={image.id}
            onClick={() => toggleSelectImage(image.id)} // Toggle checkbox when image is clicked
            draggable
            onDragStart={()=>(dragImage.current = index)}
            onDragEnter={()=>(dragOverImage.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e)=> e.preventDefault()}
          >
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              className="absolute top-2 left-2"
            />
            <img draggable="false" className="w-full rounded-lg" src={image.imgLink} alt={image.id} />
          </div>
        ))}
      </section>
    </div>
  );
}
