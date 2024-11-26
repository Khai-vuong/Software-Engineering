import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppHeader from './components/GuestHeader';
import AppHero from './components/Print_Config';
import AppFooter from './components/Footer';

function App() {
  return (
    <div className="App">
      <header id="header">
        <AppHeader/>
      </header>
      <main>
        <AppHero/>
      </main>
      <footer id="footer">
        <AppFooter/>
      </footer>
    </div>
  );
}

export default App;
