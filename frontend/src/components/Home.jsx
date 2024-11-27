// src/components/Home.jsx
import React from 'react';
// import './HomePage.css'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo">
          {/* Add your logo here */}
          {/* Example: <img src="/your-logo.png" alt="BK Printer Logo" /> */}
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>Chào mừng bạn đến với BK Printer</h1>
            <p>User1</p>
          </div>
          {/* Add an image or illustration here */}
          {/* Example: <img src="/hero-image.jpg" alt="Hero Image" /> */}
        </section>

        <section className="about">
          {/* Content about BK Printer */}
          <h2>Về BK Printer</h2>
          <p>Mô tả</p>
        </section>

        <section className="services">
          <h2>Dịch vụ của chúng tôi</h2>
          {/* List of services offered */}
          {/* Example: 
            <div className="service">
              <h3>Dịch vụ in ấn</h3>
              <p>Mô tả dịch vụ in ấn</p>
            </div>
          */}
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Liên hệ: 208 Lý Thường Kiệt, Q10, TP.HCM</p>
        <p>Điện thoại: 0123 456 789</p>
        <p>Email: info@bkprinter</p>
      </footer>
    </div>
  )
  }

const styles = {
  body: {
    fontFamily: 'sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f2f7ff',
  },
  header: {
    backgroundColor: '#f2f7ff',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  'logo img': {
    width: 50,
    height: 50,
  },
  'logo h1': {
    margin: 0,
    fontSize: 20,
  },
  'nav ul': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  'nav li': {
    marginLeft: 20,
  },
  'nav a': {
    textDecoration: 'none',
    color: '#333',
  },
  main: {
    padding: 40,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    textAlign: 'center',
  },
  'content h2': {
    fontSize: 36,
    marginBottom: 20,
  },
  'content p': {
    fontSize: 18,
    lineHeight: 1.5,
    color: '#666',
  },
  image: {
    width: 500,
  },
  'image img': {
    width: '100%',
  },
  footer: {
    backgroundColor: '#eee',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    borderTop: '1px solid #ccc',
  },
}

export default HomePage;