import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserInfo from './components/userProfile.jsx';
import HomePage from './components/Home.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Trang chủ</Link>
          <Link to="/" style={styles.link}>In tài liệu</Link>
          <Link to="/" style={styles.link}>Lịch sử in</Link>
          <Link to="/" style={styles.link}>Thanh toán</Link>
          <Link to="/" style={styles.link}>Hỗ trợ</Link>
          <Link to="/userProfile" style={styles.link}>User Info</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userProfile" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  )
}

const styles = {
  nav: {
    display: 'flex',
    gap: '20px',
    padding: '16px',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  linkHover: {
    backgroundColor: '#e7f1ff',
  },
};

export default App
