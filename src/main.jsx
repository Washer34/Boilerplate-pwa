import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'


function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true); // Afficher le bandeau d'installation
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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
        setShowInstallBanner(false); // Cacher le bandeau après l'interaction
      });
    }
  };

  const handleDismissClick = () => {
    setShowInstallBanner(false); // Cacher le bandeau si l'utilisateur n'est pas intéressé
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        {showInstallBanner && deferredPrompt && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              background: '#696969',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              zIndex: 9999,
            }}
          >
            <button onClick={handleInstallClick}>
              Installer l'application
            </button>
            <button onClick={handleDismissClick}>
              Ignorer
            </button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);