import Login from "./components/Login";
import AddBook from "./components/Books/AddBook";
import BookList from "./components/Books/BookList";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

import "./App.css";

import ProtectedRoute from "./components/ProtectedRoutes";
import { useAuth } from "./components/AuthContext";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import EditBook from "./components/Books/EditBook";
import BookDetail from "./components/Books/BookDetail";

function App() {
  const auth = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={auth.isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute to="/login">
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute to="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute to="/login">
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute to="login">
              <EditBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute to="/login">
              <BookDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
