import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getBook, getallBookClient } from "../context/bookAPI/apiCalls"
import { addToCart } from "../context/cartAPI/apiCalls"
import Notification from "../components/Notification";
import { Chip } from "@mui/material";
import { getUserCart } from "../context/cartAPI/apiCalls"
import { getUser } from "../context/userAPI/apiCalls"
import { Link } from "react-router-dom";
import LoadingPage from "../components/loadingPage/LoadingPage"
import { AuthContext } from "../context/authAPI/AuthContext";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px 10px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const Image = styled.img`
  width: 60%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20px
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  position: relative;
  margin-left: 30px;
  padding: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2E8B57;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.5s ease;
  &:active {
    transform: scale(0.9)
  }
  &:hover {
    background-color: #349b61;
  }
`;

const ButtonReading = styled.button`
  position: relative;
  margin-left: 30px;
  padding: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F4A460;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.5s ease;
  &:active {
    transform: scale(0.9)
  }
  &:hover {
    background-color: #CD853F;
  }
`;

const TextAddtoCart = styled.span`
  ${props => props.add ?
    "animation: text1 1.5s ease-in-out forwards;" : ""
  }
  @keyframes text1 {
    0% {
      opacity: 1;
    }
    20%, 100% {
      opacity: 0;
    }
  }
`;
const TextAddDone = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  ${props => props.add ?
    "animation: text2 1.5s ease-in-out forwards;" : ""
  }
  @keyframes text2 {
    0%, 80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const IconCart = styled.span`
  position: absolute;
  top: 50%;
  left: -10%;
  transform: translate(-50%, -50%);
  z-index: 2;
  ${props => props.add ?
    "animation: cart 1.5s ease-in-out forwards;" : ""
  }
  @keyframes cart {
    0% {
      left: -10%;
    }
    40%, 60% {
      left: 50%;
    }
    100% {
      left: 110%;
    }
  }
`;

const IconBook = styled.span`
  position: absolute;
  top: -20%;
  left: 52%;
  transform: translate(-50%, -50%);
  z-index: 2;
  ${props => props.add ?
    "animation: book 1.5s ease-in-out forwards;" : ""
  }
  @keyframes book {
    0%, 40% {
      top: -20%;
    }
    60% {
      top: 55%;
      left: 50%;
    }
    100% {
      top: 55%;
      left: 112%;
    }
  }
`;

const Product = ({ userRedux }) => {
  const { dispatch } = useContext(AuthContext)
  const location = useLocation();
  const [user, setUser] = useState("")
  const [path, bookId] = location.pathname.split("/books/");
  const [book, setBook] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [searchBook, setSearchBook] = useState("")
  const [add, setAdd] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [cart, setCart] = useState("")

  useEffect(() => {
    (async () => {
      const UserInfo = await getUser(dispatch, setNotify)
      setUser(UserInfo?.data?.data)
      const book = await getBook(bookId, setNotify)
      setBook(book?.data?.data)
      const UserCart = await getUserCart(dispatch, setNotify)
      setCart(UserCart?.data?.data?.cartItems)
      const bookSearch = await getallBookClient(setNotify)
      setSearchBook(bookSearch?.data?.data)
    })()
    return;
  }, [])

  const handleQuantity = (type, id) => {
    if (type === 'dec') {

      if (quantity == 1) {
        setNotify({
          isOpen: true,
          message: "Không thể giảm thành 0",
          type: "error",
        })
      }
      if (quantity > 1 && quantity > book.authStock) {
        setQuantity(quantity - 1)
      }
      if (quantity > 1 && quantity <= book.authStock) {
        setQuantity(quantity - 1)
      }

    }
    if (type === 'asc') {
      if (quantity == book.authStock) {
        setNotify({
          isOpen: true,
          message: "Không thể vượt quá số lượng tối đa",
          type: "error",
        })
      }
      if (quantity >= 1 && quantity < book.authStock) {
        setQuantity(quantity + 1)
      }
    }

  }
  return (
    <div>
      {
        book ?
          <Container>
            <Navbar cart={cart} user={user} userRedux={userRedux} book={searchBook} />
            {
              book.length != 0 ?
                <Wrapper>
                  <ImgContainer>
                    <Image src={book.image} />
                  </ImgContainer>
                  <InfoContainer>
                    <Title>{book.name}</Title>
                    <Desc>
                      <b>Tác giả:</b> {book.translator}
                    </Desc>
                    <Desc>
                      <b>Năm xuất bản:</b> {book.publicationdate}
                    </Desc>
                    <Desc>
                      <b>Thể loại:</b>
                      {
                        book?.categoryItems?.map(item => {
                          return (<Chip style={{ marginLeft: "10px", fontSize: "20px" }} label={item.categoryId.name} color="success" />)
                        })
                      }
                    </Desc>
                    <Desc>
                      <b>Số lượng có thể mượn:</b> {book.authStock}
                    </Desc>
                    <AddContainer>
                      <AmountContainer>
                        <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec")} />
                        <Amount>{quantity}</Amount>
                        <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity("asc")} />
                      </AmountContainer>
                      {
                        userRedux ?
                          <Button
                            onClick={async () => {
                              setAdd(true);
                              await addToCart(book._id, quantity, setNotify); const UserCart = await getUserCart(setNotify)
                              setCart(UserCart?.data?.data?.cartItems)
                              setTimeout(() => {
                                setAdd(false)
                              }, 3000)
                            }}
                          >
                            <TextAddtoCart add={add}>THÊM VÀO TỦ SÁCH</TextAddtoCart>
                            <TextAddDone add={add}>ĐÃ THÊM</TextAddDone>
                            <IconCart add={add}>
                              <ShoppingBasketIcon />
                            </IconCart>
                            <IconBook add={add}>
                              <BookIcon style={{ fontSize: "15px" }} />
                            </IconBook>
                          </Button>
                          :
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            <Button>
                              ĐĂNG NHẬP ĐỂ THÊM SÁCH!
                            </Button>
                          </Link>
                      }
                      {/* <ButtonReading> ĐỌC SÁCH </ButtonReading> */}
                    </AddContainer>
                  </InfoContainer>
                </Wrapper>
                :
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "30px", marginBottom: "15px" }}>
                  <img src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/Untitled.png?alt=media&token=7130c7f3-dc53-4e77-a64e-908ae6f6e402" alt="" />
                  <Link to="/" style={{ textDecoration: "none", color: "black" }} >
                  </Link>
                </div>
            }

            {/* <Newsletter /> */}
            <Notification
              notify={notify}
              setNotify={setNotify}
            />
            <Footer />
          </Container>
          :
          <LoadingPage />
      }
    </div>
  );
};

export default Product;
