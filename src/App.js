import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import AppHeader from './components/GuestHeader';
import SAppHeader from './components/Header';
import AppHero from './components/Print';
import PrintConfig from './components/Print_Config';
import AppFooter from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header id="header">
       <HeaderSwitcher />
      </header>
      <main>
      <Routes>
        <Route path="/" element={<AppHero />} /> {/* Default route */}
        <Route path="/setup" element={<PrintConfig />} /> {/* Route for print config */}
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
  if (location.pathname === "/setup") {
    return <SAppHeader />;  // Render the second header for the '/setup' route
  }

  return <AppHeader />;  // Render the first header for all other routes
}

export default App;
