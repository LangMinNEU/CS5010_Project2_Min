import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
// import './index.css'

import PlanPage from './pages/PlanPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import SearchPage from './pages/SearchPage.jsx'

import "bootstrap/dist/css/bootstrap.min.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
