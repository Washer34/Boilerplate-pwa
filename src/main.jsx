import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThemeContext from './theme/themecontext'
import MyNavbar from './components/Header/MyNavbar'
import Bouton1 from './pages/Bouton1';
import Bouton2 from './pages/Bouton2';
import Bouton3 from './pages/Bouton3';


function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const storedTheme = localStorage.getItem('theme') || 'dark';
  const [theme, setTheme] = useState(storedTheme)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme)
  }

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log("L'utilisateur a accepté l'installation");
        } else {
          console.log("L'utilisateur a refusé l'installation");
        }
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      });
    }
  };

  const handleDismissClick = () => {
    setShowInstallBanner(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="primaryContainer App" id={theme}>
        <Router>
          <MyNavbar />
          <CssBaseline />
          {showInstallBanner && deferredPrompt && (
            <div className="install-banner">
              <div>Simplifiez vos visites</div>
              <button type="button" onClick={handleInstallClick}>
                Installer l&apos;application
              </button>
              <button type="button" onClick={handleDismissClick}>
                Ignorer
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bouton1" element={<Bouton1 />} />
            <Route path="/bouton2" element={<Bouton2 />} />
            <Route path="/bouton3" element={<Bouton3 />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
