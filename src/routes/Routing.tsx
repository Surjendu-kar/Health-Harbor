import { Routes, Route } from 'react-router-dom';
import Home from '../pages/homePage/Home';
import { LoginPage } from '../pages/loginSignupPage/LoginPage';
import { SignupPage } from '../pages/loginSignupPage/SignupPage';
import FindDoctor from '../pages/find a doctor/FindDoctor';
import DoctorDetails from '../pages/find a doctor/DoctorDetails';
import Service from '../pages/servicePage/Service';
import AboutUs from '../pages/aboutUsPage/AboutUs';
import Contact from '../pages/contactPage/Contact';
import ProfileDetails from '../pages/profile/ProfileDetails';
import ResetPassword from '../pages/loginSignupPage/ResetPassword';
import FeedbackSection from '../components/feedbackSection/FeedbackSection';
import ProtectedRoute from '../components/ProtectedRoute';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/find-a-doctor" element={<FindDoctor />} />
      <Route path="/doctor-details" element={<DoctorDetails />} />
      <Route path="/feedback" element={<FeedbackSection />} />
      <Route path="/service" element={<Service />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfileDetails />
          </ProtectedRoute>
        } 
      />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default Routing; 