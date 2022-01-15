import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import * as bootstrap from "bootstrap";

import IndexPage from './pages/index';
import KetQua from './pages/ketqua'

function App() {
  return (
    <BrowserRouter>
        <Route exact path="/" render={props => <IndexPage {...props} title="HungHau Holdings" href="/" />} />
        <Route exact path="/ketqua/:sdt" render={props => <KetQua {...props} title="HungHau Holdings" href="/ketqua/:sdt" />} />
    </BrowserRouter>
  );
}

export default App;
