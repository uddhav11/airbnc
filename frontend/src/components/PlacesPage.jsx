import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import AccountNavigation from "./AccountNavigation";

import PlacesFormPage from "./PlacesFormPage";
import PlaceImg from './PlaceImg'

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />

      <div className="text-center">
        <Link
          className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4" >
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id}>
              <Link
              to={"/account/places/" + place._id}
              className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300  shrink-0" >
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
            </div>
            
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
