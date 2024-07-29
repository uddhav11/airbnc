// const express= require('express')
// const mongoose= require('mongoose')
// require('dotenv').config()
// const bcrypt= require('bcryptjs')
// const cors= require('cors')
// const User= require('./models/User.js')

// const app= express()

// //this is an async so it requires an await or it can be sync
// // const bcryptSalt = bcrypt.genSaltSync(8);
// // const bcryptSalt = await bcrypt.genSalt(8);
// async function startServer() {
//     const bcryptSalt = await bcrypt.genSalt(8);
//     return bcryptSalt;
//     // Rest of your application logic here
// }

// // const salt=startServer();

// // const bcryptSalt = await bcrypt.genSalt(8);

// app.use(express.json())

// app.use(cors({
//     credential: true,
//     origin: 'http://localhost:5173'
// }))

// // mongoose.connect(process.env.MONGO_URL)
// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log('MongoDB connected successfully.'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.get('/test', (req,res) => {
//     res.json('this is a json')
//     console.log('this is');
// })

// app.post('/register', async (req, res) => {
//     const {name, email, password}= req.body;
//     const userDoc= await User.create({
//         name,
//         email,
//         password:bcrypt.hashSync(password, await startServer())
//     });
//     res.json(userDoc)
// })

// app.listen(3000)

// -----------------------------------------------------------------------------------

// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const User = require("./models/User.js");
// const cookieParser = require("cookie-parser");
// const axios = require("axios");

// const app = express();

// app.use(cookieParser());

// async function generateSalt() {
//   const bcryptSalt = await bcrypt.genSalt(8);
//   return bcryptSalt;
// }

// const jwtSecret = "asdfg";

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected successfully."))
//   .catch((err) => console.error("MongoDB connection error:", err));

// app.get("/test", (req, res) => {
//   res.json("this is a json");
//   console.log("this is");
// });

// // this is the publicjwt Secret key
// let salt;

// async function generateGlobalSalt() {
//   salt = await bcrypt.genSalt(8);
// }

// generateGlobalSalt(); // Generate salt on startup

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, salt);

//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     res.json(userDoc);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to register user" });
//   }
// });

// // app.post('/login', async (req, res) => {
// //     const {email, password}= req.body;

// //     try{
// //         const userDoc = await User.findOne({email})
// //         if (userDoc){
// //             const passOk= bcrypt.compareSync(password, userDoc.password)
// //             if (passOk){
// //                 jwt.sign({email: userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) => {
// //                     if (err) {
// //                         console.error('JWT sign error:', err);
// //                         res.status(500).json('Internal server error');
// //                         return;
// //                     }
// //                     console.log('Login successful, sending token');
// //                     // res.cookie('token', token)
// //                     res.json('login success');
// //                 });
// //             }
// //             else{
// //                 res.status(404).json('pass is not found')
// //             }
// //         }
// //     } catch(error){
// //         console.log(error);
// //     }
// // })

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("Login attempt for:", email);
//     const userDoc = await User.findOne({ email });

//     if (!userDoc) {
//       console.log("User not found for:", email);
//       return res.status(404).json("User not found");
//     }

//     const passOk = bcrypt.compareSync(password, userDoc.password);

//     if (!passOk) {
//       console.log("Incorrect password for:", email);
//       return res.status(401).json("Password is incorrect");
//     }

//     jwt.sign(
//       { email: userDoc.email, id: userDoc._id },
//       jwtSecret,
//       {},
//       (err, token) => {
//         if (err) {
//           console.error("JWT sign error:", err);
//           return res.status(500).json("Internal server error");
//         }
//         console.log("Login successful, sending token");
//         res.cookie("token", token).json(userDoc);
//       }
//     );
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json("Internal server error");
//   }
// });

// app.get("/profile", (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, salt, {}, (err, user) => {
//         if (err) throw err;
//         res.json(user)
//     });
//   } else {
//     res.json(null);
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// ---------------------------------------------------------------------------------

//q2hvV6LQ7vHZLWhX

//42crE8rWeztybphS
//   mongodb+srv://auddhav074:42crE8rWeztybphS@cluster0.xfvktsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//-- booking
// --password => IP35p5j0B4UpxzlO

// ----------------------------------------------------------------------------

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/place.js");
const Booking= require('./models/Booking')

const app = express();

app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
const jwtSecret = "asdfg";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/test", (req, res) => {
  res.json("this is a json");
  console.log("this is");
});

function getUserData(req){
   return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
      resolve(userData)
  })
   })
  
}





let salt;

async function generateGlobalSalt() {
  salt = await bcrypt.genSalt(8);
}

generateGlobalSalt(); // Generate salt on startup

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for:", email);
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      console.log("User not found for:", email);
      return res.status(404).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (!passOk) {
      console.log("Incorrect password for:", email);
      return res.status(401).json("Password is incorrect");
    }

    jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          console.error("JWT sign error:", err);
          return res.status(500).json("Internal server error");
        }
        console.log("Login successful, sending token");
        res.cookie("token", token).json(userDoc);
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal server error");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const name = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + name,
  });
  res.json(name);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuestsNumber,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuestsNumber,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuestsNumber,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuestsNumber,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

// app.post("/bookings",async (req, res) => {
//   const { place, checkIn, checkOut, numberOfGuests, name, email, price, mobile } =
//     req.body;

//   await Booking.create({
//     place, checkIn, checkOut, numberOfGuests, name, email, price, phone
//   }).then((doc) => {
//     console.log('this is the end')
//     res.json(doc);
//   }).catch((err) => {
//     console.log(err)
//   })
// });



app.post("/bookings", async (req, res) => {
  const { place, checkIn, checkOut, numberOfGuests, name, email, price, phone } = req.body;
  const userData = await getUserData(req);
  
  if (!userData) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const doc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      email,
      price,
      phone,
      user: userData.id,
    });
    console.log('Booking created successfully');
    res.json(doc);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.get('/bookings', async (req, res) => {
  const userData= await getUserData(req);
  res.json(await Booking.find({user: userData.id}).populate('place'))
})


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
