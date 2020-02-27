import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/HomePage';

import { auth, firestore, FirebaseContext } from './firebase';
import useAuth from './hooks/useAuth';
import useTickets from './hooks/useTickets';

const App = () => {
  const currentUser = useAuth();

  const ticketCollection = useTickets();

  return (
    <FirebaseContext.Provider
      value={{ currentUser, ticketCollection, auth, firestore }}
    >
      <div className="App">
        <Router>
          <Header />

          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
