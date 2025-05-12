import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>CatLover</h1>
          <nav>
            <Link to="/">Cats Home</Link>
            <Link to="/breeds">Breeds</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </header>

        <main>
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
