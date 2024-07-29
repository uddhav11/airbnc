import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect]= useState(false)
  const {setUser}= useContext(UserContext)

  const handleLoginSubmit= async (e) => {
    e.preventDefault()
    try{
      const response= await axios.post('/login', {
        email,
        password,
      })
      setUser(response.data);
      setRedirect(true)
    } catch (error){
      console.log(error, 'there is the error');
    }
  }

  if (redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center font-bold py-2 text-gray-500">
            Don't have an account. Click here to{" "}
            <Link className="text-black underline" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Log;
