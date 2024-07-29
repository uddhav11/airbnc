import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link key={place._id} to={'/place/'+place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl ">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square image-cover"
                    src={"http://localhost:3000/uploads/" + place.photos?.[0]}
                    alt="this is the home page photo"
                  />
                )}
              </div>
              <h3 className="font-bold">{place.address}</h3>

              <h2 className="text-sm truncate leading-4 text-gray-500">
                {place.title}
              </h2>
              <p className="mt-1">
                <span className="font-bold"> ${place.price}</span> per night
              </p>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
