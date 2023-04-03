import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  AddShoppingCart,
  InfoOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import styled from "styled-components";
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from "../context/authAPI/AuthContext";
import { addToCart } from "../context/cartAPI/apiCalls"
import Notification from "./Notification";
import { getUserCart } from "../context/cartAPI/apiCalls"
import { scence_1 } from "../responsive";


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  object-fit: cover;
  width: 55%;
  transition: all 0.3s ease;
`;

const Container = styled.div`
  margin: 10px;
  width: calc(25% - 20px);
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
  &:hover ${Image}{
    height: 85%;
    width: 65%;
  }
  ${scence_1({ width: "307px" })}
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;


const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Login = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Loader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 5px solid #dddddd;
    border-top-color: #B2B2B2;
    border-radius: 50%;
    animation: loading 0.75s ease infinite;
  }
  @keyframes loading {
    from {
      transform: rotate(0turn)
    }
    to {
      transform: rotate(1turn)
    }
  }
`;

const Product = ({ item, key, setCart, user, userRedux }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  return (
    <Container key={item._id}>
      <Circle />
      {
        item ?
          <>
            <Image src={item.image} />
            {
              userRedux ?
                <Info>
                  <Tooltip title="Thêm vào giỏ hàng"
                    onClick={async () => {
                      await addToCart(item._id, 1, setNotify);
                      const UserCart = await getUserCart(setNotify)
                      setCart(UserCart?.data?.data?.cartItems)
                    }}>
                    <Icon>
                      <AddShoppingCart />
                    </Icon>
                  </Tooltip>
                  <Link to={"/books/" + item._id} state={item._id} style={{ textDecoration: "none", color: "black" }}>
                    <Tooltip title="Xem chi tiết">
                      <Icon >
                        <InfoOutlined />
                      </Icon>
                    </Tooltip>
                  </Link>
                </Info>
                :
                <Info>
                  <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <Login>
                      Đăng nhập
                    </Login>
                  </Link>
                </Info>
            }

          </>
          :
          <Loader />
      }
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </Container>
  );
};

export default Product;
