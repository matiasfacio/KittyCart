import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ContextCartProvider from "./context/ContextCart";
import ContextProductsProvider from "./context/ContextProducts";
import './App.css'

function App() {
  return (
    <Router>
      <ContextProductsProvider>
        <ContextCartProvider>
          <Nav />
          <Footer />
        </ContextCartProvider>
      </ContextProductsProvider>
    </Router>
  );
}

export default App;
