import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authAPI/AuthContext";
import { logoutAdmin } from "../context/authAPI/apiCalls"
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { logout } from "../context/authAPI/AuthAction";
import Notification from "./Notification"
import PopupUserInfo from "./popup/PopupUserInfo";

const ContainerAnounce = styled.div`
  width: 100%;
  height: 30px;
  background-color: #2E8B57;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  position: fixed;
  z-index: 100;
`;

const Container = styled.div`
  height: 60px;
  width: 100%;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 12px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
  position: fixed;
  width: 100%;
  z-index: 1000;
  background-color: white;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Options = styled.div`
  display: none;
  background-color: white;
  border-radius: 5px;
  box-shadow: 10px 10px 106px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: 10px 10px 106px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 106px 0px rgba(0,0,0,0.75);
  z-index: 1000;
  color: gray
`;

const Item = styled.div`
  &:hover  ${Options}{
   display: flex;
   flex-direction: column;
   position: absolute;
   right: 20px;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  // cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ cart, user }) => {
  const { dispatch } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const handleLogout = (e) => {
    dispatch(logout())
    logoutAdmin(dispatch, setNotify);
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            {/* <Language>EN</Language> */}
            {/* <SearchContainer>
              <Input placeholder="Tìm kiếm" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer> */}
          </Left>
          <Center>
            {/* <img 
            src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/Lovepik_com-401498089-book-book-icon-free-vector-illustration-material.png?alt=media&token=2d125193-5c1d-4c07-a901-88da712361f9"
            alt=""
            style={{width: "40px", height: "40px"}}/> */}
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Logo>THƯ VIỆN</Logo>
            </Link>
          </Center>
          <Right>
            {
              user ?
                <MenuItem>
                  <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
                    <Badge badgeContent={cart ? cart?.reduce((pre, cur) => { return pre + cur.amount }, 0): 0} color="info" style={{ marginRight: "20px" }} max={99}>
                      <ShoppingCartOutlined />
                    </Badge>
                  </Link>
                  <Item>
                    <img
                      src={user.user.image}
                      alt=""
                      className="avatar"
                      style={{ width: "30px", height: "30px", borderRadius: 50, marginRight: "20px", objectFit: "cover" }}
                    />
                    <Options>
                      <span style={{
                        display: "flex",
                        padding: "5px",
                        cursor: "pointer",
                        alignItems: "center"
                      }}
                        onClick={async () => {
                          setModalOpen(true)
                        }}><SettingsIcon style={{ fontSize: "20px", marginRight: "2px" }} /> Cài đặt</span>
                      <span style={{
                        display: "flex",
                        padding: "5px",
                        cursor: "pointer",
                        alignItems: "center"
                      }}
                        onClick={handleLogout}><LogoutIcon style={{ fontSize: "20px", marginRight: "2px" }} /> Đăng xuất</span>
                    </Options>

                  </Item>
                </MenuItem>
                :
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <MenuItem style={{ marginRight: "35px", fontWeight: "bold", color: "black" }}
                  // onClick={async () => {
                  //   setModalLogin(true)
                  // }}
                  >Đăng nhập</MenuItem>
                </Link>
            }
          </Right>
        </Wrapper>
        {modalOpen &&
          <PopupUserInfo
            setOpenModal={setModalOpen}
            user={user}
            setNoti={setNotify}
          />}
        {/* {modalLogin &&
          <Login
            setOpenModal={setModalLogin}
            user={user}
            setNoti={setNotify}
          />} */}
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
      </Container>
      <ContainerAnounce>
        <h4>Một cuốn sách là một ước mơ</h4>
      </ContainerAnounce>
    </>
  );
};

export default Navbar;
