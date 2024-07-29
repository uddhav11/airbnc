import React, { useState, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "./userContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect]= useState('')
  const {user}= useContext(UserContext);


  useEffect(() => {
    if (user){
      setName(user.name)
    }
  }, [user])

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {

    const response= await axios.post("/bookings", { checkIn, checkOut, numberOfGuests, name,  email, place:place._id,  price: numberOfDays* place.price,   });

    const bookingId= response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
    // console.log(response.data);

  };

  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price:{" "}
          <span className="font-semibold font-serif">
            ${place.price} per night
          </span>
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check in: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="py-3 px-4 border-t">
            <label>Number of Guests </label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
        </div>
        {numberOfDays > 0 && (
          <>
            <span>Number of night: {numberOfDays}</span>
            <div className="py-3 px-4 border-t">
              <label>Full name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <label>Phone number: </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              /> */}
            </div>
          </>
        )}
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place for{" "}
          {numberOfDays > 0 && <span>${numberOfDays * place.price}</span>}
        </button>
      </div>
    </>
  );
};

export default BookingWidget;
