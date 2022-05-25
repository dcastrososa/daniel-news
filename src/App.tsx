import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {ArticleDetail, Home} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/article-detail" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
