import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import FrontPage from './pages/FrontPage';
import NewUpload from './pages/NewUpload';
import MyUploads from './pages/MyUploads';

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route path="/" component={FrontPage} exact />
          <Route path="/upload/new" component={NewUpload} exact />
          <Route path="/upload" component={MyUploads} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
