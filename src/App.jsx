import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFound from "./pages/404NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"
import React, { useContext } from "react";
import { AuthContext } from "./context/authAPI/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route exact path='/' element={user ? <Home /> : <Login />} /> */}
        <Route exact path='/' element={<Home userRedux={user} />} />
        <Route path='/login' element={user ? <Home userRedux={user} /> : <Login />} />
        <Route path='/cart' element={user ? <Cart userRedux={user} /> : <Login />} />
        <Route path="books">
          <Route index element={<ProductList userRedux={user} />} />
          <Route path=":bookId" element={<Product userRedux={user} />} />
        </Route>
        <Route path='*' element={<NotFound userRedux={user} />} />
        {/* <Route path='/booklist' element={<ProductList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;