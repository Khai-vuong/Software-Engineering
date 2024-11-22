import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppGuestHeader from './components/GuestHeader';
import AppGuestHero from './components/GuestHero';
import AppFooter from './components/Footer';

function App() {
  return (
    <div className="App">
      <header id="header">
        <AppGuestHeader/>
      </header>
      <main>
        <AppGuestHero/>
      </main>
      <footer id="footer">
        <AppFooter/>
      </footer>
    </div>
  );
}

export default App;
