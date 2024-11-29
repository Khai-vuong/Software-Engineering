import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import AppHeader from './components/Header';
import AppHero from './components/Hero';
import AppFooter from './components/Footer';
import GuestAppHeader from './components/GuestHeader';
import AppHistory from './pages/History';
import AppPurchase from './pages/Purchase';
import AppHelp from './pages/Help';
import AppUser from './pages/User';
import PrintConfig from './components/Print_Config';
import Print from './pages/Print';
import Login from './components/Login';
import Choice from './components/Choice';
import AppLandingHero from './components/LandingHero';
import AppGuestHero from './components/GuestHero';
import AppPrintStatus from './components/Print_Status';
import Layout from './components/SPSOConfig';
import AppSposHistory from './pages/SposHistory';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <div className="App">
      <header id="header">
       <HeaderSwitcher />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<AppLandingHero/>} /> {/* Default route */}
        <Route path="/choice" element={<Choice/>} /> {/* Choice */}
        <Route path="/login" element={<Login/>} /> {/* Log in */}
        <Route path="/loginasstaff" element={<Layout/>} /> {/* Log in */}
        <Route path="/guest" element={<AppGuestHero/>} /> {/* Guest */}
        <Route path="/logedin" element={<AppHero/>} /> {/* Loged in */}
        <Route path="/print" element={<Print />} /> {/* Route for print config */}
        <Route path="/confirm" element={<AppPrintStatus />} /> {/* Route for print status */}
        <Route path="/setup" element={<PrintConfig />} /> {/* Route for print config */}
        <Route path="/history" element={<AppHistory />} /> {/* Printing History */}
        <Route path="/purchase" element={<AppPurchase />} /> {/* Purchase */}
        <Route path="/help" element={<AppHelp />} /> {/* Help */}
        <Route path="/user" element={<AppUser />} /> {/* user */}
        <Route path="/sposhistory" element={<AppSposHistory />} /> {/* user */}
      </Routes>
      </main>
      <footer id="footer">
        <AppFooter/>
      </footer>
    </div>
    </BrowserRouter>
    </AuthProvider>
  );
}
function HeaderSwitcher() {
  const location = useLocation(); // Get the current location

  // Conditionally render the header based on the current path
  if (location.pathname === "/" || location.pathname === "/choice" || location.pathname === "/login" || location.pathname === "/guest") {
    return <GuestAppHeader />;  // Render the second header for the '/setup' route
  }


  return <AppHeader />;  // Render the first header for all other routes
}

export default App;
