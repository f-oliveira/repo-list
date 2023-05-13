import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main/>} />
        <Route path="/repository/:repository" element={ <Repository/> } />
      </Routes>
    </BrowserRouter>
  );
}