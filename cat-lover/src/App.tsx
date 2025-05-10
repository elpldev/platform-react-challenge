import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// We'll create these components later
const Home = () => <div>Home Page - Random Cats</div>;
const Breeds = () => <div>Breeds Page</div>;
const Favorites = () => <div>Favorites Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-blue-600">Cat Lover</div>
              <div className="space-x-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/breeds"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Breeds
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breeds" element={<Breeds />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
