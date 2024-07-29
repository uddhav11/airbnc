// import axios from "axios";
// import React, {useState} from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
//   const registerUser=(e) =>{
//     e.preventDefault()
//     axios.post('/register', {
//         name,
//         email,
//         password,
//     })
//   }
//   return (
//     <div className="mt-4 grow flex items-center justify-around">
//       <div className="mb-32">
//         <h1 className="text-4xl text-center mb-4 ">Register</h1>
//         <form className="max-w-md mx-auto" onSubmit={registerUser}>
//           <input
//             type="text"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="primary">Register</button>
//           <div className="text-center font-bold py-2 text-gray-500">
//             Already have an account{" "}
//             <Link className="text-black underline" to={"/login"}>
//               Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
      });
      setSuccess("User registered successfully!");
      setError("");  // Clear any previous errors
      console.log('User registered successfully:', response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error : "An error occurred");
      setSuccess("");  // Clear any previous success message
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">Register</button>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="text-center font-bold py-2 text-gray-500">
            Already have an account{" "}
            <Link className="text-black underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
