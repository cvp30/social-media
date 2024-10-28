import { Image } from '@nextui-org/react';
import PropTypes from 'prop-types'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageGrid = ({ images, postId }) => {

  const navigate = useNavigate()
  const [orientation, setOrientation] = useState(false)

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;

    if (naturalWidth < naturalHeight) setOrientation(true)
  }

  const handleImage = (index) => {
    navigate(`/post/${postId}?photo=${index}`)
  }

  const layouts = {
    1: (
      <div className="grid grid-cols-1">
        <Image
          removeWrapper
          src={images[0]}
          alt="Post image"
          className="cursor-pointer min-w-96 max-w-full max-h-148 object-cover"
          onClick={() => handleImage(0)}
        />
      </div>
    ),
    2: (
      <div className="grid grid-cols-2 gap-1">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            removeWrapper
            alt={`Post image ${index}`}
            className="cursor-pointer w-full h-96 object-cover "
            onClick={() => handleImage(index)}
          />
        ))}
      </div>
    ),
    3: (
      <div className="grid grid-cols-2 gap-1">
        <Image
          src={images[0]}
          alt="Post image 1"
          removeWrapper
          onLoad={handleImageLoad}
          className={`${orientation ? 'row-span-2' : 'col-span-2'} cursor-pointer w-full h-96 object-cover `}
          onClick={() => handleImage(0)}
        />
        <Image
          src={images[1]}
          alt="Post image 2"
          removeWrapper
          className="cursor-pointer w-full h-48 object-cover "
          onClick={() => handleImage(1)}
        />
        <Image
          src={images[2]}
          alt="Post image 3"
          removeWrapper
          className="cursor-pointer w-full h-48 object-cover "
          onClick={() => handleImage(2)}
        />
      </div>
    ),
    4: (
      <div className="grid grid-cols-2 gap-1">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            removeWrapper
            alt={`Post image ${index}`}
            className='cursor-pointer w-full h-56 object-cover'
            onClick={() => handleImage(index)}
          />
        ))}
      </div>
    ),
  }

  const layout = layouts[images.length] || (
    <div className="grid grid-cols-2 gap-1 relative">
      {images.slice(0, 4).map((image, index) => (
        <Image
          key={index}
          src={image}
          removeWrapper
          alt={`Post image ${index}`}
          className="cursor-pointer w-full h-56 object-cover"
          onClick={() => handleImage(index)}
        />
      ))}
      <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
        +{images.length - 4}
      </h1>
    </div>
  )

  return (
    <div>
      {layout}
    </div>
  )
}

export default ImageGrid

ImageGrid.propTypes = {
  postId: PropTypes.string,
  images: PropTypes.array,
}