import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getBook } from "../context/bookAPI/apiCalls"
import { addToCart } from "../context/cartAPI/apiCalls"
import Notification from "../components/Notification";
import { Chip } from "@mui/material";
import { getUserCart } from "../context/cartAPI/apiCalls"
import { getUser } from "../context/userAPI/apiCalls"
import { Link } from "react-router-dom";
import LoadingPage from "../components/loadingPage/LoadingPage"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
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
  width: 50%;
  height: 70vh;
  object-fit: cover;
  
  
  
  ${mobile({ height: "40vh" })}
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 15px;
  // border: 2px solid teal;
  border: none;
  background-color: #0E8388;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;

  &:hover{
      background-color: #3F979B;
  }
`;

const Button404 = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Product = () => {
  const location = useLocation();
  const [user, setUser] = useState("")
  const [path, bookId] = location.pathname.split("/books/");
  const [book, setBook] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [cart, setCart] = useState("")

  useEffect(() => {
    (async () => {
      const UserInfo = await getUser(setNotify)
      setUser(UserInfo?.data?.data)
      const book = await getBook(bookId, setNotify)
      setBook(book?.data?.data)
      const UserCart = await getUserCart(setNotify)
      setCart(UserCart?.data?.data?.cartItems)
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
  console.log(book)
  return (
    <div>
      {
        book ?
          <Container>
            <Navbar cart={cart} user={user} />
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
                      <b>Nhà xuất bản:</b> {book.issuingcompany}
                    </Desc>
                    <Desc>
                      <b>Số trang:</b> {book.numberofpages}
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
                      <Button onClick={async () => {
                        await addToCart(book._id, quantity, setNotify); const UserCart = await getUserCart(setNotify)
                        setCart(UserCart?.data?.data?.cartItems)
                      }}>THÊM VÀO TỦ SÁCH</Button>
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
