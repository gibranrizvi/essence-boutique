import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/HomePage';

import { auth, firestore, FirebaseContext } from './firebase';
import useAuth from './hooks/useAuth';

const App = () => {
  const currentUser = useAuth();

  // console.log(currentUser);
  // console.log(customers);

  return (
    <FirebaseContext.Provider value={{ currentUser, auth, firestore }}>
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
