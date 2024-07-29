import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProfilePage from "./components/ProfilePage";
import HeaderPage from "./components/header"; // Assuming the component is named Header
import IndexPage from "./components/IndexPage";
import Layout from "./components/Layout";
import Log from "./components/loginpage";
import Register from "./components/Register";
import { UserContextProvider } from './components/userContext'; // Adjust the path if needed
import PlacesPage from "./components/PlacesPage";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacePage from './components/PlacePage'
import BookingsPage from "./components/BookingsPage";
import BookingPage from "./components/BookingPage"


axios.defaults.baseURL= 'http://localhost:3000'
axios.defaults.withCredentials= true;


function App() {
  return (
    <UserContextProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<IndexPage />} index/>
          <Route element={<Log />} path="/login" />
          <Route element={<Register />} path='/register' />
          <Route element={<ProfilePage />} path='/account?' />
          <Route element={<PlacesPage />} path='/account/places' />
          <Route element={<PlacesFormPage />} path='/account/places/new' />
          <Route element={<PlacesFormPage />} path='/account/places/:id' />
          <Route element={<PlacePage />} path='/place/:id' />
          <Route element={<BookingsPage />} path='/account/bookings' />
          <Route element={<BookingPage />} path='/account/bookings/:id' />




          {/* <Route element={<AccountPage />} path='/account/booking' />
          <Route element={<AccountPage />} path='/account/places' /> */}

        </Route>
      </Routes>
    </Router>
    </UserContextProvider>
    
  );
}



export default App;
