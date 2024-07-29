import React, {useState} from 'react'

const PlaceGal = ({place}) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false);


  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen">
        <div className="p-8 grid gap-4 bg-black text-white">
          <div>
            <h2 className='mr-48'>
              Photos of{" "}
              <span className="font-bold capitalize">{place.title}</span>
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-4 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img key={place._id}
                  src={"http://localhost:3000/uploads/" + photo}
                  alt="photo"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="relative ">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                  alt="photo"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:3000/uploads/" + place.photos[1]}
                alt="photo"
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={"http://localhost:3000/uploads/" + place.photos[2]}
                  alt="photo"
                />
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAllPhotos(true)}
          className="gap-1 absolute border border-black right-2 bottom-2 flex bg-white py-2 px-4 rounded-lg shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          Show more
        </button>
      </div>
    </>
  )
}

export default PlaceGal;
