import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import * as bootstrap from "bootstrap";

import IndexPage from './pages/index';

function App() {
  return (
    <BrowserRouter>
        <Route exact path="/" render={props => <IndexPage {...props} title="HungHau Holdings" href="/" />} />
    </BrowserRouter>
  );
}

export default App;
