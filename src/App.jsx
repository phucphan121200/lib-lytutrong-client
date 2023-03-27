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
        <Route exact path='/' element={<Home user={user}/>} />
        <Route path='/login' element={user ? <Home user={user}/> : <Login />} />
        <Route path='/cart' element={user ? <Cart user={user}/> : <Login />} />
        <Route path="books">
          <Route index element={<ProductList user={user}/>} />
          <Route path=":bookId" element={<Product user={user}/>} />
        </Route>
        <Route path='*' element={<NotFound user={user}/>} />
        {/* <Route path='/booklist' element={<ProductList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;