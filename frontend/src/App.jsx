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
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/userProfile" element={<UserInfo/>} />
        </Routes>
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </Router>
  )
}

const styles = {
  nav: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    justifyContent: 'right',
    backgroundColor: '#f5f5f5',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
  },
};

export default App
