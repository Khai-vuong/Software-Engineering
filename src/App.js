import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppHeader from './components/Header';
import AppHero from './components/Hero';
import AppFooter from './components/Footer';
import Layout from './components/SPSOConfig';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header id="header">
        <AppHeader/>
      </header>
      <main>
        <Router>
          <Layout/> 
        </Router>
      </main>
      <footer id="footer">
        <AppFooter/>
      </footer>
    </div>
  );
}

export default App;
