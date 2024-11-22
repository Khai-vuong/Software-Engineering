import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppGuestHeader from './components/GuestHeader';
import AppLandingHero from './components/LandingHero';
import AppFooter from './components/Footer';

function App() {
  return (
    <div className="App">
      <header id="header">
        <AppGuestHeader/>
      </header>
      <main>
        <AppLandingHero/>
      </main>
      <footer id="footer">
        <AppFooter/>
      </footer>
    </div>
  );
}

export default App;
