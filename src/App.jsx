
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { imageData } from './imageData';

// Dynamically import all images from test and animations folders
const twoDImages = Object.values(import.meta.glob('./assets/2d/*.{jpg,jpeg,png,gif,JPG,JPEG}', { eager: true })).map(module => module.default);
const animationImages = Object.values(import.meta.glob('./assets/animations/*.{jpg,jpeg,png,gif,JPG,JPEG}', { eager: true })).map(module => module.default);
const metalImages = Object.values(import.meta.glob('./assets/metal/*.{jpg,jpeg,png,gif,JPG,JPEG}', { eager: true })).map(module => module.default);

function Home() {
  return (
    <div className="page home">
      <h1>Leah Kerry</h1>
      <p>Hi! My name is Leah Kerry. </p>
    </div>
  );
}

function Animation() {
  const [popup, setPopup] = useState(null);
  const handleClick = (img) => setPopup(img);
  const handleClose = () => setPopup(null);
  // Sort images by year (most recent first, missing year at end)
  const sortedImages = [...animationImages].sort((a, b) => {
    const aFile = a.split('/').pop();
    const bFile = b.split('/').pop();
    const aYear = imageData[aFile]?.year;
    const bYear = imageData[bFile]?.year;
    if (aYear && bYear) return bYear - aYear;
    if (aYear) return -1;
    if (bYear) return 1;
    return 0;
  });
  return (
    <div className="page animation">
      <h1>Animation</h1>
      <div className="video-list">
        <div>
            <h2>Demo Reel</h2>
            <h4>2026</h4>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/aiZTfkMJgQ8?si=k5qzJPDkyBroYU2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div>
            <h2>I HATE PEOPLE!</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/CalOqA_QuRk?si=x8AfIgorstLj4Fkp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div>
            <h2>Worm Wishes</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/QYaOi08vy_0?si=d39GRTR3nx_p2fCj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div>
            <h2>giirL Math Music Video</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/qkAC2yxBbJ4?si=TMYvfn9iAQ4LSCBG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div>
            <h2>Corrupted Pixels</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/HGVqD0L3SHU?si=TXaiwGci4UpyLEyj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>
      </div>
      {/* <div className="gallery">
        {sortedImages.map((img, index) => {
          const fileName = img.split('/').pop();
          const data = imageData[fileName] || {};
          return (
            <div key={index} className="gallery-item" onClick={() => handleClick(img)} style={{ cursor: 'pointer' }}>
              <img src={img} alt={data.title || `Animation ${index + 1}`} />
              <p>{data.title || ''}</p>
            </div>
          );
        })}
      </div> */}
      {popup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-modal" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={handleClose}>×</button>
            <img src={popup} alt="Large view" className="popup-image" />
            {(() => {
              const fileName = popup.split('/').pop();
              const data = imageData[fileName] || {};
              return (
                <>
                  <h2>{data.title || 'Untitled'}</h2>
                  {data.medium && <p>{`Medium: ${data.medium}`}</p>}
                  <p>{data.description || ''}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function Metal() {
  const [popup, setPopup] = useState(null);
  const handleClick = (img) => setPopup(img);
  const handleClose = () => setPopup(null);
  // Sort images by year (most recent first, missing year at end)
  const sortedImages = [...metalImages].sort((a, b) => {
    const aFile = a.split('/').pop();
    const bFile = b.split('/').pop();
    const aYear = imageData[aFile]?.year;
    const bYear = imageData[bFile]?.year;
    if (aYear && bYear) return bYear - aYear;
    if (aYear) return -1;
    if (bYear) return 1;
    return 0;
  });
  return (
    <div className="page metal">
      <h1>Metal</h1>
      <p>Discover my metal art pieces.</p>
      <div className="gallery">
        {sortedImages.map((img, index) => {
          const fileName = img.split('/').pop();
          const data = imageData[fileName] || {};
          return (
            <div key={index} className="gallery-item" onClick={() => handleClick(img)} style={{ cursor: 'pointer' }}>
              <img src={img} alt={data.title || `Metal ${index + 1}`} />
              <p>{data.title || 'Untitled'}</p>
            </div>
          );
        })}
      </div>
      {popup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-modal" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={handleClose}>×</button>
            <img src={popup} alt="Large view" className="popup-image" />
            {(() => {
              const fileName = popup.split('/').pop();
              const data = imageData[fileName] || {};
              return (
                <>
                  <h2>{data.title || 'Untitled'}</h2>
                  {data.medium && <p>{`Medium: ${data.medium}`}</p>}
                  <p>{data.description || ''}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function TwoDWork() {
  const [popup, setPopup] = useState(null);
  const handleClick = (img) => setPopup(img);
  const handleClose = () => setPopup(null);
  // Sort images by year (most recent first, missing year at end)
  const sortedImages = [...twoDImages].sort((a, b) => {
    const aFile = a.split('/').pop();
    const bFile = b.split('/').pop();
    const aYear = imageData[aFile]?.year;
    const bYear = imageData[bFile]?.year;
    if (aYear && bYear) return bYear - aYear;
    if (aYear) return -1;
    if (bYear) return 1;
    return 0;
  });
  return (
    <div className="page two-d-work">
      <h1>2D Work</h1>
      <div className="gallery">
        {sortedImages.map((img, index) => {
          const fileName = img.split('/').pop();
          const data = imageData[fileName] || {};
          return (
            <div key={index} className="gallery-item" onClick={() => handleClick(img)} style={{ cursor: 'pointer' }}>
              <img src={img} alt={data.title || `2D Work ${index + 1}`} />
              <p>{data.title || 'Untitled'}</p>
            </div>
          );
        })}
      </div>
      {popup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-modal" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={handleClose}>×</button>
            <img src={popup} alt="Large view" className="popup-image" />
            {(() => {
              const fileName = popup.split('/').pop();
              const data = imageData[fileName] || {};
              return (
                <>
                  <h2>{data.title || 'Untitled'}</h2>
                  <p>{data.description || ''}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function About() {
  return (
    <div className="page about">
      <h1>About</h1>
      <p>Hi! My name is Leah Kerry.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      
      <nav className="navbar">
        <div className = "Title">Leah Kerry</div>
        <ul className="navlist">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/animation">Animation</Link></li>
          <li><Link to="/metal">Metal</Link></li>
          <li><Link to="/2d-work">2D Work</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/metal" element={<Metal />} />
          <Route path="/2d-work" element={<TwoDWork />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
