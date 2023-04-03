import Navbar from "../components/Navbar";
import { getUserCart } from "../context/cartAPI/apiCalls"
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUser } from "../context/userAPI/apiCalls"
import { AuthContext } from "../context/authAPI/AuthContext";
import { getallBookClient } from "../context/bookAPI/apiCalls"

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const NotFound = ({userRedux}) => {
  const [user, setUser] = useState("")
  const [cart, setCart] = useState("")
  const { dispatch } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [searchBook, setSearchBook] = useState("")

  useEffect(() => {
    (async () => {
      const UserInfo = await getUser(dispatch, setNotify)
      setUser(UserInfo?.data?.data)
      const UserCart = await getUserCart(dispatch, setNotify)
      setCart(UserCart?.data?.data)
      const book = await getallBookClient(setNotify)
      setSearchBook(book?.data?.data)
    })()
    return;
  }, [])
  return (
    <div>
      <Navbar cart={cart} user={user} userRedux={userRedux} book={searchBook}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "30px" }}>
        <img src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/Untitled.png?alt=media&token=7130c7f3-dc53-4e77-a64e-908ae6f6e402" alt="" />
        <Link to="/" style={{ textDecoration: "none", color: "black" }} >
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
