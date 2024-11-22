import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppHeader from './components/Header';
import AppHero from './components/Hero';
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
