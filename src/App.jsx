import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout';
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VenuePage from "./pages/VenuePage";
import VenueManagerPage from "./pages/VenueManagerPage";
import CustomerPage from "./pages/CustomerPage";
import NotFound from "./pages/NotFound";
import CreateVenue from './pages/CreateVenue';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="venue/:id" element={<VenuePage />} />
        <Route path="manager" element={<VenueManagerPage />} />
        <Route path="create-venue" element={<CreateVenue />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App
