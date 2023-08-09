import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import NavBar from './components/common/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/common/registerForm';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path="/movies/:id" exact component={MovieForm}></Route>
          <Route path='/movies' component={Movies}></Route>
          <Route path='/customers' component={Customers}></Route>
          <Route path='/rental' component={Rentals}></Route>
          <Route path='/not-found' component={NotFound}></Route>
          <Route path='/login' component={LoginForm}></Route>
          <Route path='/register' component={RegisterForm}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  )
}

export default App
