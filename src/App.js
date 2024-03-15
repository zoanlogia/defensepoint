import {
  BrowserRouter as Router,
  Route,
  Routes, // Use `Routes` instead of `Switch`
  Link,
} from "react-router-dom";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavoritesPage";
import ThemeToggler from "./components/button/ThemeToggler";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen dark:bg-gray-800 bg-gray-100">
        <header className="shadow">
          <nav className="shadow bg-white dark:bg-gray-800 fixed inset-x-0 top-0">
            <div className="container mx-auto px-6 py-3">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-blue-500 hover:text-blue-600 dark:text-white hover:dark:text-gray-200"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="text-blue-500 hover:text-blue-600 dark:text-white hover:dark:text-gray-200"
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 mt-10">
          <Routes>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </main>
        <footer className="h-[3rem] relative">
          <div className="fixed end-2 bottom-4">
            <ThemeToggler />
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
