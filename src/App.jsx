import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import FrontPage from './pages/FrontPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="Eeeh">
        <NavBar />
        <Route path="/" component={FrontPage} exact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
