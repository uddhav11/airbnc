import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGal from "./PlaceGal";
import LinkAddress from "./LinkAddress";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "there is a problem";

  return (
    <div className=" bg-gray-100 -mx-8 px-8 pt-8 ">
      <h1 className="text-3xl">{place.title}</h1>

      <LinkAddress>{place.address}</LinkAddress>

      <PlaceGal place={place} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mb-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{place.description}</p>
          </div>
          Check-in: {place.checkIn} <br />
          Checl-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuestsNumber} <br />
        </div>
        <BookingWidget place={place} />
      </div>
      <div className='bg-white -mx-8 px-8 py-4 border-t'>
        <div>
        <h2 className="font-semibold text-2xl">Extra info</h2>
      </div>
      <div className="mt-2 mb-4 text-gray-700 text-sm leading-4">
        {place.extraInfo}
      </div>
      </div>
      
    </div>
  );
};

export default PlacePage;
