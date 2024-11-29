import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import AppHeader from './components/Header';
import AppHero from './components/Hero';
import AppFooter from './components/Footer';
import GuestAppHeader from './components/GuestHeader';
import AppHistory from './pages/History';
import AppPurchase from './pages/Purchase';
import AppHelp from './pages/Help';
import PrintConfig from './components/Print_Config';
import Print from './pages/Print';
import Login from './components/Login';
import Choice from './components/Choice';
import AppLandingHero from './components/LandingHero';
import AppGuestHero from './components/GuestHero';
import AppPrintReport from './pages/PrintReport';
import AppPrintReportDetail from './pages/PrintReportDetail';
import UserSupport from './pages/UserSupport';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header id="header">
       <HeaderSwitcher />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<AppLandingHero/>} /> {/* Default route */}
        <Route path="/choice" element={<Choice/>} /> {/* Choice */}
        <Route path="/login" element={<Login/>} /> {/* Choice */}
        <Route path="/guest" element={<AppGuestHero/>} /> {/* Guest */}
        <Route path="/logedin" element={<AppHero/>} /> {/* Loged in */}
        <Route path="/print" element={<Print />} /> {/* Route for print config */}
        <Route path="/setup" element={<PrintConfig />} /> {/* Route for print config */}
        <Route path="/history" element={<AppHistory />} /> {/* Printing History */}
        <Route path="/purchase" element={<AppPurchase />} /> {/* Purchase */}
        <Route path="/help" element={<AppHelp />} /> {/* Help */}
        <Route path="/printreport" element={<AppPrintReport />} />
        <Route path="/printreportdetail" element={<AppPrintReportDetail />} />
        <Route path="/usersupport" element={<UserSupport />} />
      </Routes>
      </main>
      <footer id="footer">
        <AppFooter/>
      </footer>
    </div>
    </BrowserRouter>
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
