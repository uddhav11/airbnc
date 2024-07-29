import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotosUploader from "./photosUploader";
import Perks from "./Perks";
import AcccountNavigation from "./AccountNavigation";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuestsNumber, setMaxGuestsNumber] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice]= useState(40)
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuestsNumber(data.maxGuestsNumber);
      setPrice(data.price)
    });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <h2 className="text-gray-300 text-sm">{text}</h2>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };




  const savePlace = async (e) => {
    e.preventDefault();

    try {
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn: parseInt(checkIn),
        checkOut: parseInt(checkOut),
        maxGuestsNumber: parseInt(maxGuestsNumber, 10),
        price:parseInt(price),
      };


      if (id) {
        await axios.put("/places", { id, ...placeData });
      } else {
        await axios.post("/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error saving place:', error);
      alert('There was an error saving the place. Please check your input values.');
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <div className="">
        <AcccountNavigation />
        <form onSubmit={savePlace}>
          {preInput("Title", "Title for your place")}
          <input
            type="text"
            placeholder="title, for example: my beautiful house"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {preInput("Address", "Address of the place")}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <h2 className="text-2xl mt-4">Photos</h2>
          {/* <p className="text-gray-300 text-sm"></p> */}
          {
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
          }

          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {preInput("Perks", "Select the perks")}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <Perks selected={perks} onChange={setPerks} />
          </div>

          <h2 className="text-2xl mt-4">Extrainfo</h2>
          <p className="text-gray-300 text-sm">Rules and other things</p>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          {preInput(
            "Check in&out time",
            "Enter the check in and out time and make sure to keep a window open for cleaning"
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1">Check in</h3>
              <input
                type="text"
                placeholder="14:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out</h3>
              <input
                type="text"
                placeholder="9:00"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                placeholder="number of guests"
                value={maxGuestsNumber}
                onChange={(e) => setMaxGuestsNumber(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price</h3>
              <input
                type="number"
                placeholder="number of guests"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

          </div>
          <div className="">
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
