import Navbar from "../components/Navbar";
import { getUserCart } from "../context/cartAPI/apiCalls"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUser } from "../context/userAPI/apiCalls"

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const NotFound = () => {
  const [user, setUser] = useState("")
  const [cart, setCart] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      const UserInfo = await getUser(setNotify)
      setUser(UserInfo?.data?.data)
      const UserCart = await getUserCart(setNotify)
      setCart(UserCart?.data?.data)
    })()
    return;
  }, [])
  return (
    <div>
      <Navbar cart={cart} user={user}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "30px" }}>
        <img src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/Untitled.png?alt=media&token=7130c7f3-dc53-4e77-a64e-908ae6f6e402" alt="" />
        <Link to="/" style={{ textDecoration: "none", color: "black" }} >
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
