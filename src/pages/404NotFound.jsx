import Navbar from "../components/Navbar";
import { getUserCart } from "../context/cartAPI/apiCalls"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const NotFound = ({user}) => {
  const [cart, setCart] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      const UserCart = await getUserCart(setNotify)
      setCart(UserCart?.data?.data)
    })()
    return;
  }, [])
  return (
    <div>
      <Navbar cart={cart} user={user}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "30px" }}>
        <img src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/lib-lytutrong167899844995032729?alt=media&token=5352a6c0-b24b-4074-81c7-b44c88389e54" alt="" />
        <Link to="/" style={{ textDecoration: "none", color: "black" }} >
          <Button>VỀ TRANG CHỦ</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
