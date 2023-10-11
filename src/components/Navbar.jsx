import { Badge } from "@mui/material";
import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authAPI/AuthContext";
import { logoutAdmin } from "../context/authAPI/apiCalls"
import { Tooltip } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import { mobile, tablet } from "../responsive";
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
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

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
  margin-left: 20px;
  padding: 5px;
  ${mobile({
    marginLeft: "20px"
  })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({
    display: props => props.open ? "none" : "block"
  })}
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
  ${mobile({
    display: props => props.open ? "none" : "flex"
  })}
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

const MenuItemNav = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  margin-right: 20px;
  ${mobile({
    marginRight: "10px"
  })}
`;

const LoginText = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  margin-right: 20px;
  font-weight: bold;
  color: black;
  ${mobile({
    display: "none"
  })}
  ${tablet({
    display: "none"
  })}
`;

const LoginButton = styled(Link)`
  display: none;
  ${mobile({
    display: "flex",
    textDecoration: "none",
    fontSize: "14px",
    marginRight: "5px",
    color: "gray"
  })}
  ${tablet({
    display: "flex",
    textDecoration: "none",
    fontSize: "14px",
    marginRight: "20px",
    color: "gray"
  })}
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #F7F7F7;
  transition: 0.5s;
  
`;
const Hover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  transition: 0.5s;
  background-color: #fff;
  &:hover {
    background-color: #F7F7F7;
  }
  &:hover ${Cart} {
    background-color: #DEDEDE;
  }
`;

const Searchbox = styled.div`
  margin-left: 20px;
  display: flex;
  position: relative;
  ${mobile({
    width: props => props.open ? "calc(100vw - 40px)" : "35px"
  })}
  width: ${props => props.open ? "calc(100vw - 70vw)" : "35px"};
  // background: ${props => props.open ? "#ffffff" : "#DEDEDE"};
  border-radius: 35px;
  // box-shadow: 0 0 0 5px #F7F7F7;
  ${props => props.open ?
    `
      background: #ffffff;
      box-shadow: 0 0 0 5px #F7F7F7;
    `
    :
    `
      background: #F7F7F7;
      &:hover {
        background: #DEDEDE;
        box-shadow: 0 0 0 5px #F7F7F7;
      }
    `}
  transition: 0.5s;
  ${props => props.open ?
    `.clear {
      position: absolute;
      right: 0px;
      border-radius: 35px;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s;`
    :
    ""
  }
  ${mobile({
    marginLeft: "10px"
  })}
`;

const InputSearch = styled.div`
  position: absolute;
  ${mobile({
    width: props => props.open ? "calc(100vw - 90px)" : "0px"
  })}
  ${props => props.open ? "width: calc(100vw - 80vw)" : "width: 0px"};
  height: 35px;
  transition: 0.35s;
  left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .inputText {
    position: absolute;
    ${props => props.open ? "background: white;" : "background: #DEDEDE;"}
    width: 100%;
    height: 40px;
    border: none;
  }
  
`;
const MenuBook = styled.div`
  position: absolute;
  ${mobile({
    width: props => props.open ? "calc(100vw - 40px)" : "35px"
  })}
  ${props => props.open && props.search.length > 0 ?
    `width: calc(100vw - 70vw);
    opacity: 1;`
    :
    `width: 0px;
    height: 0px;
    opacity: 0;`
  }
  // width: 430px;
  top: 49px;
  border-radius: 2px;
  // box-shadow: 0 0 0 5px #F7F7F7;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 0 0 2.5px #dedede;
`;
const MenuItemSearch = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 5px 5px 5px 5px;
  width: calc(100% - 10px);
  height: 15vh;
  background: #F7F7F7;
  border-radius: 2px;
  display: flex;
  ${mobile({
    height: "10vh"
  })}
  ${tablet({
    height: "6vh"
  })}
`;
const ImageSearch = styled.img`
  margin-left: 2.5px;
  height: 100%;
  width: 20%;
  border-radius: 2px;
  object-fit: cover;
`;
const MenuItemInfo = styled.div`
  margin: 0px 2.5px 0px 10px;
  width: calc(80% - 12.5px);
  height: 100%;
  background: #F7F7F7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const MenuItemName = styled.h3`
  font-weight: bold;
  margin: auto 0;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const MenuItemTranslator = styled.h4`
  margin: auto 0;
  // margin-bottom: 20px;
  // height: 20px;
  //width: calc(80% - 12.5px);
  font-weight: 500;
`;


let useClickOutSide = (handle) => {
  let domNode = useRef();

  useEffect(() => {
    let handleOut = (event) => {
      if (!domNode.current.contains(event.target)) {
        handle()
      }
    };
    document.addEventListener("mousedown", handleOut);
    return () => {
      document.removeEventListener("mousedown", handleOut);
    };
  });
  return domNode
}

const length = (book, search) => {
  const listBook = book.filter((books) => books.name.toLowerCase().includes(search.toLowerCase()));
  if (listBook.length > 0) {
    return listBook.slice(0, 5).map((item) => (
      <MenuItemSearch to={"/books/" + item._id} state={item._id} >
        <ImageSearch src={item.image} />
        <MenuItemInfo>
          <MenuItemName>
            
              {item.name}
            
          </MenuItemName>
          <MenuItemTranslator>
            {item.translator}
          </MenuItemTranslator>
        </MenuItemInfo>
      </MenuItemSearch>
    )
    );
  } else {
    return (
      <MenuItemSearch >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <img src="https://cdn4.iconfinder.com/data/icons/library-4/49/library-09-512.png"
            alt=""
            style={{ width: "70px", height: "70px" }} />
          Không tìm thấy bất kì sách nào!
        </div>

      </MenuItemSearch>
    )
  }
}

const Navbar = ({ cart, user, userRedux, book }) => {
  const { dispatch } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handleLogout = (e) => {
    logoutAdmin(dispatch, setNotify);
  };
  const ref = useRef(null);
  const [search, setSearch] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [activeSearch, setActiveSearch] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleBlurFocus = () => {
    if (!activeSearch) {
      ref.current.focus();
      setActiveSearch(true);
    } if (activeSearch) {
      setActiveSearch(false);
    }
  };

  let domNode = useClickOutSide(() => {
    setActiveSearch(false)
  })

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Searchbox open={activeSearch} ref={domNode}>
              <div style={{
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "35px"
              }}
                onClick={handleBlurFocus}>
                <SearchIcon style={{ color: "gray" }} />
              </div>
              <InputSearch open={activeSearch}>
                <input ref={ref}
                  type="text"
                  placeholder="Tìm kiếm theo tên sách..."
                  value={search}
                  className="inputText"
                  style={{ fontSize: "14px" }}
                  onChange={handleSearch}
                // onBlur={handleBlurFocus}
                />
              </InputSearch>
              {
                activeSearch ?
                  <div className="clear" >
                    <ClearIcon style={{ fontSize: "15px", color: "gray", cursor: "pointer" }} onClick={() => setSearch("")} />
                  </div>
                  :
                  <></>
              }
              <MenuBook open={activeSearch} search={search} >
                {
                  book ?
                    length(book, search)
                    :
                    <></>
                }
              </MenuBook>
            </Searchbox>

          </Left>
          <Center open={activeSearch}>
            <Tooltip title="Trang chủ thư viện" placement="right" >
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/favicon_w_trans.png?alt=media&token=de204428-9b31-446e-8623-c2467a173b28"
                  alt=""
                  style={{ width: "80px", height: "55px" }} />
              </Link>
            </Tooltip>
          </Center>
          <Right open={activeSearch}>
            {
              userRedux ?
                <>
                  <MenuItemNav>
                    <Link to="/cart" style={{ textDecoration: "none", color: "gray" }}>
                      <Tooltip title="Tủ sách" >
                        <Hover>
                          <Cart>
                            <Badge badgeContent={cart ? cart?.reduce((pre, cur) => { return pre + cur.amount }, 0) : 0} color="info" max={99}>
                              <ShoppingBasketIcon />
                            </Badge>
                          </Cart>
                        </Hover>
                      </Tooltip>
                    </Link>
                  </MenuItemNav>
                  <Tooltip title="Tài khoản">
                  <MenuItemNav>
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ transition: "0.5s" }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 35, height: 35 }} src={user ? user.image : ""}></Avatar>
                    </IconButton>
                    </MenuItemNav>
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
                    {
                      userRedux ?
                        <>
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
                        </>
                        :
                        <></>
                    }
                  </Menu>
                </>
                :
                <>
                  <LoginText to="/login" >Đăng nhập</LoginText>
                  <LoginButton to="/login" >
                      <Hover>
                        <Cart><LoginIcon /></Cart>
                      </Hover>
                  </LoginButton>
                  </>
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
