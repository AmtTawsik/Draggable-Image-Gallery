"use client"

import { useEffect, useRef, useState } from 'react';
import imagesData from '../public/images.json';
import Loading from '../components/Loading';

export default function Home() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImages(imagesData);
    setLoading(false)
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

  const handleMultipleDelete = () => {
    // Remove selected images from the state
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const dragImage = useRef(0)
  const dragOverImage = useRef(0)

  // Sort all images by draging function
  const handleSort = () => {
    const imageClone = [...images]
    const temp = imageClone[dragImage.current]
    imageClone[dragImage.current] = imageClone[dragOverImage.current]
    imageClone[dragOverImage.current] = temp
    setImages(imageClone)
  }

  return (
    <div>
      {/* Header */}
      <section className='flex justify-between items-center w-11/12 mx-auto py-2'>
        {
          selectedImages.length > 0 ?
            <h3 className='text-2xl font-bold'>{selectedImages.length} {selectedImages.length === 1 ? <span>File</span> : <span>Files</span>} Selected</h3>
            :
            <h3 className='text-2xl font-bold'>Gelary</h3>
        }

        <div className='font-bold text-red-500'>
          {selectedImages.length > 0 && (
            <button onClick={handleMultipleDelete}>Delete {selectedImages.length === 1 ? <span>File</span> : <span>Files</span>}</button>
          )}
        </div>
      </section>
      <hr className='my-2' />
      {/* Gelary Start Here  */}
      {
        loading ?
          // If loading it will show loading Component 
          <section className='md:-mt-20 -mt-10'>
            <Loading />
          </section>
          :
          // else it will show Gelary 
          <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 w-11/12 mx-auto">
            {/* Show All Images with Grid Layout  */}
            {images?.map((image, index) => (
              <div
                // Add conditional class for making 1st image big 
                className={`w-full cursor-move relative border rounded-lg hover:brightness-75 hover:bg-gray-300 ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1'}  ${selectedImages.includes(image.id) ? 'brightness-[90%] bg-gray-300' : ''}`}
                key={image.id}
                onClick={() => toggleSelectImage(image.id)} // Toggle checkbox when image is clicked
                draggable // make all images draggable
                onDragStart={() => (dragImage.current = index)}
                onDragEnter={() => (dragOverImage.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image.id)} // checkbox input
                  className="absolute top-2 left-2 cursor-pointer"
                />
                <img draggable="false" className="w-full rounded-lg" src={image.imgLink} alt={image.id} />
              </div>
            ))}
            <div className='col-span-2 md:col-span-1'>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 font-bold text-xl">Add Images</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </section>
      }
      {/* Gelary End Here  */}
    </div>
  );
}