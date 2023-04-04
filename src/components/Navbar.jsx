import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext, useState, useEffect, useRef } from "react";
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
  transition: 0.5s;
  
`;
const Hover = styled.div`
  display: flex;
  margin-right: 10px;
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
  width: ${props => props.open ? "430px" : "35px"};
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
`;

const InputSearch = styled.div`
  position: absolute;
  ${props => props.open ? "width: 350px;" : "width: 0px;"}
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
  ${props => props.open && props.search.length > 0 ?
    `width: 430px;
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
const MenuItemSearch = styled.div`
  margin: 5px 5px 5px 5px;
  width: calc(100% - 10px);
  height: 15vh;
  background: #F7F7F7;
  border-radius: 2px;
  display: flex;
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
      <MenuItemSearch >
        <ImageSearch src={item.image} />
        <MenuItemInfo>
          <MenuItemName>
            <Link to={"/books/" + item._id} state={item._id} style={{ textDecoration: "none", color: "black" }}>
              {item.name}
            </Link>
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
  console.log(userRedux)
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
  console.log(user)
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
          <Center>
            <Tooltip title="Trang chủ thư viện" placement="right" >
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/favicon_w_trans.png?alt=media&token=de204428-9b31-446e-8623-c2467a173b28"
                  alt=""
                  style={{ width: "80px", height: "55px" }} />
              </Link>
            </Tooltip>
          </Center>
          <Right>
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
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ mr: "20px", transition: "0.5s" }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 35, height: 35 }} src={user ? user.image : ""}></Avatar>
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
