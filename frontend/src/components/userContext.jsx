

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!user) {
      const { data } = axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true)
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

// ------------------------------------------------------------------------------

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext();

// export const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get("/profile");
//         if (isMounted) {
//           setUser(data);
//           setReady(true);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         if (isMounted) {
//           setReady(true);
//         }
//       }
//     };

//     if (!user) {
//       fetchProfile();
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, setUser, ready }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
