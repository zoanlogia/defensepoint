import {
  BrowserRouter as Router,
  Route,
  Routes, // Use `Routes` instead of `Switch`
  Link,
} from "react-router-dom";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
