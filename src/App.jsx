
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { imageData } from './imageData';
import headshot from './assets/headshot.jpg';
import lanternvid from './assets/metal/LanternVideo.mov'
import titleimage from './assets/TitleCard.png'

// Dynamically import all images from test and animations folders
const twoDImages = Object.values(import.meta.glob('./assets/2d/*.{jpg,jpeg,png,gif,JPG,JPEG}', { eager: true })).map(module => module.default);
const animationImages = Object.values(import.meta.glob('./assets/animations/*.{jpg,jpeg,png,gif,JPG,JPEG}', { eager: true })).map(module => module.default);
const metalImages = Object.values(import.meta.glob('./assets/metal/*.{jpg,jpeg,png,gif,JPG,JPEG}', { eager: true })).map(module => module.default);

function Home() {
  return (
    <div className="page home">
      <video src={lanternvid} autoplay loop playsInline className="homepage-video">
        Your browser does not support the video tag.
        </video>
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
                  <h2>{data.title || ''}</h2>
                  {data.medium && <p>{`${data.medium}`}</p>}
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
              <p>{data.title || ''}</p>
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
                  <h2>{data.title || 'Untitled'}{data.year && `, ${data.year}`}</h2>
                  
                  {data.medium && <p>{`${data.medium}`}</p>}
                  
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
              <p>{data.title || ''}</p>
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
                  <h2>{data.title || 'Untitled'}{data.year && `, ${data.year}`}</h2>

                  <p>{data.dimensions || ''}</p>
                  {data.medium && <p>{`${data.medium}`}</p>}

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
      <h1>About Me!</h1>
      <div className="about-section">
        {/* Profile Picture Placeholder */}
        <div className="about-picture">
          <img src={headshot} alt="Profile" style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', background: '#eee' }} />
          {/* Social Buttons in About */}
          <div className="social-buttons">
            <a href="https://www.instagram.com/linfinity.artworks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.13.88a1.13 1.13 0 1 1-2.26 0a1.13 1.13 0 0 1 2.26 0z"></path></svg>
            </a>
            <a href="https://www.youtube.com/@linfinity9127" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 0 0-1.94 1.94A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15.5v-7l6 3.5l-6 3.5z"></path></svg>
            </a>
            <a href="mailto:leahkerry@gmail.com" aria-label="Email">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"/></svg>

            </a>
          </div>
        </div>
        {/* Bio */}
        <div className="about-bio">
          <h2>I'm a Boston-based animator, illustrator, and metalsmith.</h2>
          <p>
            I grew up in the woods of Pennsylvania and the forested landscape of my home influences the visual style of my work. The plants and creatures constantly surprised me, and I aim to bring that same curiosity to my work by combining nature and fantasy. To me, the two inspire the same feelings of wonder and joy, so their combination invites the audience to find the fascination in what already surrounds them.
          </p>
          <p>I am a senior at Tufts University and the School of the Museum of Fine Arts (SMFA) getting a BFA in studio art and a BA in computer science.</p>
          <p>I'd love to work together! Contact me at: <strong>leahkerry@gmail.com</strong></p>

          

        </div>
        
      </div>
    </div>
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const handleHamburger = () => setNavOpen((open) => !open);
  const closeNav = () => setNavOpen(false);

  return (
    <Router basename="/art-portfolio">
      <nav className="navbar">
        {/* <div className="Title">Leah Kerry</div> */}
        <div ><img className="Title" src={titleimage} alt="Leah Kerry" /></div>
        <button className="hamburger" aria-label="Toggle navigation" onClick={handleHamburger}>
          <span style={{transform: navOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'}}></span>
          <span style={{opacity: navOpen ? 0 : 1}}></span>
          <span style={{transform: navOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'}}></span>
        </button>
        <ul className={`navlist${navOpen ? ' open' : ''}`} onClick={closeNav}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/animation">Animation</Link></li>
          <li><Link to="/metal">Metal</Link></li>
          <li><Link to="/2d-work">2D Work</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/metal" element={<Metal />} />
          <Route path="/2d-work" element={<TwoDWork />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {/* Footer Social Buttons */}
      <footer className="footer-social">
        <div className="social-buttons">
          <a href="https://instagram.com/linfinity.artworks" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.13.88a1.13 1.13 0 1 1-2.26 0a1.13 1.13 0 0 1 2.26 0z"></path></svg>
          </a>
          <a href="https://youtube.com/@linfinity9127" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 0 0-1.94 1.94A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15.5v-7l6 3.5l-6 3.5z"></path></svg>
          </a>
          <a href="mailto:leahkerry@gmail.com" aria-label="Email">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"/></svg>
          </a>
        </div>
      </footer>
    </Router>
  );
}

export default App;
