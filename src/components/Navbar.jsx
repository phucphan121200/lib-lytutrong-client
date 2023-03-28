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
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
  position: fixed;
  width: 100%;
  height: 60px;
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
  font-size: 12px;
  ${mobile({ display: "none" })}
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

const MenuItemNav = styled.div`
  font-size: 14px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #F7F7F7;
  
`;
const Hover = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #fff;
  &:hover {
    background-color: #F7F7F7;
  }
  &:hover ${Cart} {
    background-color: #DEDEDE;
  }
`;

const Navbar = ({ cart, user }) => {
  const { dispatch } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handleLogout = (e) => {
    dispatch(logout())
    logoutAdmin(dispatch, setNotify);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
          </Left>
          <Center>
            <Tooltip title="Trang chủ thư viện" placement="right" >
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/favicon_w_trans.png?alt=media&token=de204428-9b31-446e-8623-c2467a173b28"
                  alt=""
                  style={{ width: "80px", height: "55px" }} />
                {/* <Logo>LÝ TỰ TRỌNG</Logo> */}
              </Link>
            </Tooltip>
          </Center>
          <Right>
            {
              user ?
                <>
                  <MenuItemNav>
                    <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
                      <Tooltip title="Tủ sách" >
                        <Hover>
                          <Cart>
                            <Badge badgeContent={cart ? cart?.reduce((pre, cur) => { return pre + cur.amount }, 0) : 0} color="info" max={99}>
                              <ShoppingCartOutlined />
                            </Badge>
                          </Cart>
                        </Hover>
                      </Tooltip>
                    </Link>
                  </MenuItemNav>
                  <Tooltip title="Tài khoản">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ mr: "20px" }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 35, height: 35 }} src={user.image}></Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    disableScrollLock={true}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={async () => {
                      setModalOpen(true)
                      handleClose();
                    }}>
                      <Avatar src={user.image} /> {user.name}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={async () => {
                      setModalOpen(true)
                      handleClose();
                    }}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Cài đặt bảo mật
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
                :
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <MenuItemNav style={{ marginRight: "35px", fontWeight: "bold", color: "black" }}
                  // onClick={async () => {
                  //   setModalLogin(true)
                  // }}
                  >Đăng nhập</MenuItemNav>
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
        <h3>Mỗi cuốn sách là một ước mơ</h3>
      </ContainerAnounce>
    </>
  );
};

export default Navbar;
