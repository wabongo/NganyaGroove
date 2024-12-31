import React, { useState } from 'react'
import { motion } from 'framer-motion'

const images = [
  {
    id: 1,
    src: '/Rt 33/20240605_095219_lmc_8.4.jpg',
    title: 'Matatu Art Showcase',
    description: 'A stunning display of Kenyan matatu art and culture'
  },
  {
    id: 2,
    src: '/Rt 33/20240615_135711_lmc_8.4.jpg',
    title: 'Urban Transport Culture',
    description: 'The vibrant intersection of art and transportation'
  },
  {
    id: 3,
    src: '/Rt 33/20240615_155923_lmc_8.4.jpg',
    title: 'Modern Matatu Design',
    description: 'Contemporary matatu aesthetics pushing boundaries'
  },
  {
    id: 4,
    src: '/Rt 33/20240615_160357_lmc_8.4.jpg',
    title: 'Street Art Movement',
    description: 'Where street art meets mobile canvas'
  },
  {
    id: 5,
    src: '/Rt 33/20240615_160357_lmc_8.4.jpg',
    title: 'Cultural Expression',
    description: 'Matatus as a medium of cultural storytelling'
  },
  {
    id: 6,
    src: '/Rt 33/20240615_155923_lmc_8.4.jpg',
    title: 'Urban Canvas',
    description: 'The streets of Nairobi through matatu art'
  }
]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Matatu Art Gallery</h1>
          <p className="text-xl text-muted-foreground">
            Explore the vibrant world of Kenyan matatu art and culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => openModal(image)}
            >
              <div className="aspect-video">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                <p className="text-white text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white text-xl hover:text-primary/80 transition-colors"
                onClick={closeModal}
              >
                Close
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-lg">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Gallery
