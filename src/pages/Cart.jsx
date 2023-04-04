import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React, { useState, useEffect, useContext } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { getUser } from "../context/userAPI/apiCalls"
import { Tab, Chip, Tooltip } from "@mui/material";
import { getUserCart, orderBook, getWaitotConfirmUser, getWaitoBorrowUser, getBorrowingUser, getReturnedUser } from "../context/cartAPI/apiCalls"
import Checkbox from '@mui/material/Checkbox';
import { CancelOutlined } from '@mui/icons-material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Notification from "../components/Notification";
import Moment from 'moment';
import PopupConfirm from "../components/popup/PopupConfirm";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ReportIcon from '@mui/icons-material/Report';
import LoadingPage from "../components/loadingPage/LoadingPage"
import { AuthContext } from "../context/authAPI/AuthContext";
import { getallBookClient } from "../context/bookAPI/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;

const TopButton = styled.button`
  width: 180px;
  height: 35px;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 2px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#2E8B57" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height: 128px;
  margin-top: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
font-size: 18px;
  display: flex;
  align-items: center;
  // margin-bottom: 20px;
  margin-right: 30px;
  // border: 1px solid teal;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  width: 50px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid gray;

  ${mobile({ margin: "5px 15px" })}
`;

const ProductAmountWait = styled.div`
  font-size: 20px;
  margin: 5px;
  justify-content: center;
  

  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 200;
  margin-right: 35px;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 150px;
  // position: fixed
`;
const SummaryBook = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 216px;
  // position: fixed
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #2E8B57;
  color: white;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  margin-top: 30px;
  &:hover {
    background-color: #349b61;
  }
`;

const ButtonCancel = styled.button`
  // width: 100px;
  background-color: #EB455F;
  color: white;
  font-weight: 600;
  border: none;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  :&hover{
    background-color: #E96479;
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
    width: 20px;
    height: 20px;
    border: 5px solid #fff;
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

const Cart = ({ userRedux }) => {
  const [valueTab, setValueTab] = useState("1")
  const handleChangeTab = async (event, newValue) => {
    setValueTab(newValue);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { dispatch } = useContext(AuthContext)
  const [user, setUser] = useState("")
  const [bookId, setBookId] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [amount, setAmount] = useState("")
  const [userCart, setUserCart] = useState("")
  const [waitotConfirmUser, setWaitotConfirmUser] = useState("")
  const [waitotBorrowUser, setWaitoBorrowUser] = useState("")
  const [borrowingUser, setBorrowingUser] = useState("")
  const [returnedUser, setReturnedUser] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [check, setCheck] = useState(false);
  const [bookSelect, setBookSelect] = useState({ cartItems: [] })
  const [searchBook, setSearchBook] = useState("")
  const [loading, setLoading] = useState(false);

  const checkOrderBook = (event, item) => {
    if (event.target.checked == true) {
      const dataOrder = JSON.parse(JSON.stringify(bookSelect))
      dataOrder.cartItems.push({ bookId: item.bookId._id, amount: item.amount })
      setBookSelect(dataOrder)
    }
    if (event.target.checked == false) {
      const dataOrder = JSON.parse(JSON.stringify(bookSelect))
      const index = bookSelect?.cartItems?.findIndex(i => i?.bookId == item.bookId._id)
      if (index !== -1) {
        dataOrder?.cartItems.splice(index, 1)
        setBookSelect(dataOrder)
      }
    }
    const curr = [...userCart];
    const index = curr.findIndex(i => i.bookId._id == item.bookId._id)
    curr[index].checked = !curr[index].checked
    setUserCart(curr)
    // curr[item._id].checked = !(curr[item._id].checked);
    // setUserCart([...curr]);
  }
  const handleQuantity = (type, id) => {
    if (type === 'dec') {
      const clone = JSON.parse(JSON.stringify(userCart))
      for (let i = 0; i < clone?.length; i++) {
        if (clone[i]?.bookId?._id == id) {
          if (clone[i].amount == 1) {
            setNotify({
              isOpen: true,
              message: "Không thể giảm thành 0",
              type: "error",
            })
          }
          if (clone[i].amount > 1 && clone[i].amount > clone[i].bookId.authStock) {
            clone[i].amount = clone[i].amount - 1
            const valueAmountChecked = bookSelect?.cartItems?.findIndex(option => option.bookId == id)
            if (valueAmountChecked != -1) {
              bookSelect.cartItems[valueAmountChecked].amount = clone[i].amount
            }
          }
          if (clone[i].amount > 1 && clone[i].amount <= clone[i].bookId.authStock) {
            clone[i].amount = clone[i].amount - 1
            const valueAmountChecked = bookSelect?.cartItems?.findIndex(option => option.bookId == id)
            if (valueAmountChecked != -1) {
              bookSelect.cartItems[valueAmountChecked].amount = clone[i].amount
            }
          }
        }
      }
      setUserCart(clone)
    }
    if (type === 'asc') {
      const clone = JSON.parse(JSON.stringify(userCart))
      for (let i = 0; i < userCart?.length; i++) {
        if (userCart[i]?.bookId?._id == id) {
          if (clone[i].amount == clone[i].bookId.authStock) {
            setNotify({
              isOpen: true,
              message: "Không thể vượt quá số lượng tối đa",
              type: "error",
            })
          }
          if (clone[i].amount >= 1 && clone[i].amount < clone[i].bookId.authStock) {
            clone[i].amount = clone[i].amount + 1
            const valueAmountChecked = bookSelect?.cartItems?.findIndex(option => option.bookId == id)
            if (valueAmountChecked != -1) {
              bookSelect.cartItems[valueAmountChecked].amount = clone[i].amount
            }
          }
        }
      }

      setUserCart(clone)
    }
  }

  const func = (item) => {
    if (new Date(item.exp).getTime() < new Date().getTime()) {
      const title = `Quá hạn trả sách ${(new Date((new Date() - new Date(item.exp))) / (1000 * 3600 * 24)).toFixed(0)} ngày`
      return (
        <Tooltip title={title} arrow={true}>
          <Chip icon={<DangerousIcon />} label="QUÁ HẠN" variant="outlined" color="error" />
        </Tooltip>
      )
    } else if (new Date(item.exp).getTime() < new Date().getTime() + 30 * 24 * 60 * 60 * 1000) {
      const title = `Còn ${(new Date((new Date().getTime() + 30 * 24 * 60 * 60 * 1000 - new Date(item.exp).getTime())) / (1000 * 3600 * 24)).toFixed(0)} ngày đến hạn trả sách`
      return (
        <Tooltip title={title} arrow={true}>
          <Chip icon={<ReportIcon />} label="CẬN HẠN" variant="outlined" color="warning" />
        </Tooltip>
      )
    } else {
      const title = `Sách được mượn vào: ${Moment(item.timeBorrow).format('HH:mm:ss, DD/MM/YYYY')}`
      return (
        <Tooltip title={title} arrow={true}>
          <Chip icon={<AutoStoriesIcon />} label="CÒN HẠN" variant="outlined" color="info" />
        </Tooltip>
      )
    }
  }
  useEffect(() => {
    (async () => {
      const UserCart = await getUserCart(dispatch, setNotify)
      setUserCart(UserCart?.data?.data?.cartItems?.reverse().map((item, checked) => ({ ...item, checked: false })))
      UserCart?.cartItems?.map(item => {
        if (item.amount > item.bookId.authStock) {
          setNotify({
            isOpen: true,
            message: "Có sách vượt quá số lượng cho phép",
            type: "error",
          })
        }
      })
      const book = await getallBookClient(setNotify)
      setSearchBook(book?.data?.data)
      const waittoconfirmCart = await getWaitotConfirmUser(setNotify)
      setWaitotConfirmUser(waittoconfirmCart?.data?.data?.cartItems?.reverse())
      const waittoborrowCart = await getWaitoBorrowUser(setNotify)
      setWaitoBorrowUser(waittoborrowCart?.data?.data?.cartItems?.reverse())
      const borrowCart = await getBorrowingUser(setNotify)
      setBorrowingUser(borrowCart?.data?.data?.cartItems?.reverse())
      const returnedCart = await getReturnedUser(setNotify)
      setReturnedUser(returnedCart?.data?.data?.cartItems?.reverse())
      const UserInfo = await getUser(dispatch, setNotify)
      setUser(UserInfo?.data?.data)
    })()
    return;
  }, [])

  const handleClick = e => {
    if (userCart) {
      if (['check', 'uncheck'].includes(e.target.name)) {
        // determine whether to update 'checked' to true or false
        const updateChecked = e.target.name === 'check';
        if (updateChecked == true) {
          const dataOrder = JSON.parse(JSON.stringify(bookSelect))
          for (let i = 0; i < userCart?.length; i++) {
            dataOrder.cartItems.push({ bookId: userCart[i].bookId._id, amount: userCart[i].amount })
          }
          setCheck(true)
          setBookSelect(dataOrder)
        } if (updateChecked == false) {
          setCheck(false)
          setBookSelect({ cartItems: [] })
        }
        setUserCart(prev => ([
          ...prev?.map(({ checked, ...rest }) => ({ ...rest, checked: updateChecked }))
        ]));
      }
    }
  };
  return (
    <div>
      {
        user ?
          <Container>
            <Navbar cart={userCart} user={user} userRedux={userRedux} book={searchBook} />
            <Announcement />
            <Wrapper>
              <Title>TỦ SÁCH CỦA BẠN</Title>
              <Top>
                {
                  check == true ?
                    <TopButton type="filled" name="uncheck" onClick={handleClick}>BỎ CHỌN TẤT CẢ</TopButton>
                    :
                    <TopButton type="filled" name="check" onClick={handleClick}>CHỌN TẤT CẢ SÁCH</TopButton>
                }

                <TopTexts>
                  {
                    userCart && waitotConfirmUser && waitotBorrowUser && borrowingUser && returnedUser ?
                      <TabContext value={valueTab} key={7}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example" key={6}>
                          <Tab label={"Đặt sách (" + userCart?.length + ")"} value="1" key={1} />
                          <Tab label={"Chờ duyệt (" + waitotConfirmUser?.length + ")"} value="2" key={2} />
                          <Tab label={"Chờ lấy (" + waitotBorrowUser?.length + ")"} value="3" key={3} />
                          <Tab label={"Đang mượn (" + borrowingUser?.length + ")"} value="4" key={4} />
                          <Tab label={"Đã trả(" + returnedUser?.length + ")"} value="5" key={5} />
                        </TabList>
                      </TabContext>
                      :
                      <TabContext value={valueTab} key={7}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example" key={6}>
                          <Tab label={"Đặt sách (" + 0 + ")"} value="1" key={1} />
                          <Tab label={"Chờ duyệt (" + 0 + ")"} value="2" key={2} />
                          <Tab label={"Chờ lấy (" + 0 + ")"} value="3" key={3} />
                          <Tab label={"Đang mượn (" + 0 + ")"} value="4" key={4} />
                          <Tab label={"Đã trả(" + 0 + ")"} value="5" key={5} />
                        </TabList>
                      </TabContext>
                  }
                </TopTexts>
                <TopButton>
                  <Link to="/books" style={{ textDecoration: "none", color: "black" }}>
                    TIẾP TỤC MƯỢN SÁCH
                  </Link>
                </TopButton>
              </Top>
              <Bottom>
                {
                  valueTab == 1 ?
                    userCart ?
                      userCart?.length != 0 ?
                        <>
                          <Info>
                            {
                              userCart?.map(item => {
                                return (
                                  <>
                                    <Product>
                                      <Checkbox
                                        key={item.bookId}
                                        checked={item.checked}
                                        onChange={(e) => checkOrderBook(e, item)}
                                        sx={{
                                          color: "black",
                                          '&.Mui-checked': {
                                            color: "teal",
                                          },
                                          '& .MuiSvgIcon-root': { fontSize: 30 }
                                        }}
                                      />
                                      <ProductDetail>
                                        <Image src={item?.bookId?.image} />
                                        <Details>
                                          <ProductName>
                                            <b>Tên sách:</b> {item?.bookId?.name}
                                          </ProductName>
                                          <ProductId>
                                            <b>Tác giả:</b> {item?.bookId?.translator}
                                          </ProductId>
                                          {/* <ProductColor color="black" /> */}
                                          <ProductSize>
                                            <b>Năm xuất bản:</b> {item?.bookId?.publicationdate}
                                          </ProductSize>
                                        </Details>
                                      </ProductDetail>
                                      <PriceDetail>
                                        <ProductAmountContainer>
                                          <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantity("dec", item?.bookId?._id)} />
                                          <ProductAmount>{item.amount}</ProductAmount>
                                          <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity("asc", item?.bookId?._id)} />
                                        </ProductAmountContainer>
                                      </PriceDetail>
                                      <CancelOutlined style={{ color: "firebrick", marginTop: "5px", marginRight: "5px", fontSize: "30px", cursor: "pointer" }}
                                        onClick={async () => {
                                          setModalOpen(true)
                                          setBookId(item.bookId._id)
                                        }} />
                                    </Product>

                                    <Hr />
                                  </>
                                )
                              })
                            }
                            <div className="modal" style={{ display: "flex", justifyContent: "center" }}>
                              {modalOpen &&
                                <PopupConfirm
                                  setOpenModal={setModalOpen}
                                  title="Bạn có muốn xóa đầu sách này?"
                                  data={bookId}
                                  isPopup={1}
                                  setNoti={setNotify}
                                  setDataUser={setUserCart}
                                />}
                            </div>
                          </Info>
                          <SummaryBook>
                            <SummaryTitle>TỔNG SỐ SÁCH</SummaryTitle>
                            <SummaryItem>
                              <SummaryItemText>Số đầu sách đã chọn</SummaryItemText>
                              <SummaryItemPrice>{bookSelect?.cartItems?.length != 0 ? bookSelect?.cartItems?.length : 0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                              <SummaryItemText>Số sách mượn</SummaryItemText>
                              <SummaryItemPrice>{bookSelect?.cartItems?.reduce((pre, cur) => { return pre + cur.amount }, 0)}</SummaryItemPrice>
                            </SummaryItem>
                            <Button style={{ cursor: "pointer" }} onClick={async () => {
                              setLoading(true)
                              await orderBook(bookSelect, setNotify)
                              const UserCart = await getUserCart(setNotify)
                              setUserCart(UserCart?.data?.data?.cartItems)
                              const waittoconfirmCart = await getWaitotConfirmUser(setNotify)
                              setWaitotConfirmUser(waittoconfirmCart?.data?.data?.cartItems)
                              setBookSelect({ cartItems: [] })
                              setLoading(false)
                              setValueTab(2)
                            }}>
                              {
                                loading ?
                                  <Loader /> :
                                  <p style={{ fontSize: "15px" }}>
                                    MƯỢN SÁCH
                                  </p>
                              }
                            </Button>
                          </SummaryBook>
                        </>
                        :
                        <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa có đầu sách nào trong tủ sách</div>
                        </div>
                      :
                      <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                        <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa có đầu sách nào trong tủ sách</div>
                      </div>
                    :
                    <></>

                }
                {
                  valueTab == 2 ?
                    waitotConfirmUser ?
                      waitotConfirmUser?.length != 0 ?
                        <>
                          <Info>
                            {
                              waitotConfirmUser?.map(item => {
                                return (
                                  <>
                                    <Product>
                                      <ProductDetail>
                                        <Image src={item.bookId.image} />
                                        <Details>
                                          <ProductName>
                                            <b>Tên sách:</b> {item.bookId.name}
                                          </ProductName>
                                          <ProductId>
                                            <b>Tác giả:</b> {item.bookId.translator}
                                          </ProductId>
                                          <ProductId>
                                            <b>Số lượng:</b> {item.amount}
                                          </ProductId>
                                          <ProductSize>
                                            <b>Năm xuất bản:</b> {item.bookId.publicationdate}
                                          </ProductSize>
                                          {/* <ProductColor color="black" /> */}

                                        </Details>
                                      </ProductDetail>
                                      <PriceDetail>
                                        <ProductAmountContainer>
                                          <ProductAmountWait>
                                            <Tooltip title="Hủy phiên mượn này?" arrow={true}>
                                              {/* <Chip icon={<FaceIcon />} label="CHỜ DUYỆT" variant="outlined" color="secondary" /> */}
                                              <ButtonCancel onClick={async () => {
                                                setModalOpen(true)
                                                setBookId(item.bookId._id)
                                                setSessionId(item._id)
                                                setAmount(item.amount)
                                                // await removeFromCart(item.bookId._id, setNotify)
                                                // const UserCart = await getUserCart(setNotify)
                                                // setUserCart(UserCart?.data?.data)
                                              }} >HỦY ĐẶT</ButtonCancel>
                                            </Tooltip>
                                          </ProductAmountWait>
                                        </ProductAmountContainer>
                                        {/* <ProductPrice>$ 30</ProductPrice> */}
                                      </PriceDetail>
                                    </Product>

                                    <Hr />
                                  </>
                                )
                              })
                            }
                            <div className="modal" style={{ display: "flex", justifyContent: "center" }}>
                              {modalOpen &&
                                <PopupConfirm
                                  setOpenModal={setModalOpen}
                                  title="Bạn có muốn hủy phiên mượn này?"
                                  id={sessionId}
                                  user={user._id}
                                  data={bookId}
                                  amount={amount}
                                  isPopup={2}
                                  setNoti={setNotify}
                                  setDataUser={setWaitotConfirmUser}
                                />}
                            </div>
                          </Info>
                          <Summary>
                            <SummaryTitle>TỔNG SỐ SÁCH</SummaryTitle>
                            <SummaryItem>
                              <SummaryItemText>Số đầu sách chờ duyệt</SummaryItemText>
                              <SummaryItemPrice>{waitotConfirmUser?.length != 0 ? waitotConfirmUser.length : 0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                              <SummaryItemText>Số sách mượn</SummaryItemText>
                              <SummaryItemPrice>{waitotConfirmUser?.reduce((pre, cur) => { return pre + cur.amount }, 0)}</SummaryItemPrice>
                            </SummaryItem>
                          </Summary>
                        </>
                        :
                        <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa có phiên nào chờ duyệt</div>
                        </div>
                      :
                      <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                        <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa có phiên nào chờ duyệt</div>
                      </div>
                    :
                    <></>
                }
                {
                  valueTab == 3 ?
                    waitotBorrowUser ?
                      waitotBorrowUser?.length != 0 ?
                        <>
                          <Info>
                            {
                              waitotBorrowUser.map(item => {
                                return (
                                  <>
                                    <Product>
                                      <ProductDetail>
                                        <Image src={item.bookId.image} />
                                        <Details>
                                          <ProductName>
                                            <b>Tên sách:</b> {item.bookId.name}
                                          </ProductName>
                                          <ProductId>
                                            <b>Tác giả:</b> {item.bookId.translator}
                                          </ProductId>
                                          <ProductId>
                                            <b>Số lượng:</b> {item.amount}
                                          </ProductId>
                                          {/* <ProductColor color="black" /> */}
                                          <ProductSize>
                                            <b>Năm xuất bản:</b> {item.bookId.publicationdate}
                                          </ProductSize>
                                        </Details>
                                      </ProductDetail>
                                      <PriceDetail>
                                        <ProductAmountContainer>
                                          <Tooltip title="Sách đã được duyệt! Hãy đến thư viện để lấy sách!" arrow={true}>
                                            <Chip icon={<BookmarkAddedIcon />} label="ĐÃ DUYỆT" variant="outlined" color="secondary" />
                                          </Tooltip>
                                        </ProductAmountContainer>
                                      </PriceDetail>
                                    </Product>
                                    <Hr />
                                  </>
                                )
                              })
                            }
                          </Info>
                          <Summary>
                            <SummaryTitle>TỔNG SỐ SÁCH</SummaryTitle>
                            <SummaryItem>
                              <SummaryItemText>Số đầu sách chờ duyệt</SummaryItemText>
                              <SummaryItemPrice>{waitotBorrowUser?.length != 0 ? waitotBorrowUser.length : 0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                              <SummaryItemText>Số sách mượn</SummaryItemText>
                              <SummaryItemPrice>{waitotBorrowUser?.reduce((pre, cur) => { return pre + cur.amount }, 0)}</SummaryItemPrice>
                            </SummaryItem>
                          </Summary>
                        </>
                        :
                        <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa có phiên nào chờ lấy</div>
                        </div>
                      :
                      <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                        <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa có phiên nào chờ lấy</div>
                      </div>
                    :
                    <></>
                }
                {
                  valueTab == 4 ?
                    borrowingUser ?
                      borrowingUser.length != 0 ?
                        <>
                          <Info>
                            {
                              borrowingUser.map(item => {
                                return (
                                  <>
                                    <Product>
                                      <ProductDetail>
                                        <Image src={item.bookId.image} />
                                        <Details>
                                          <ProductName>
                                            <b>Tên sách:</b> {item.bookId.name}
                                          </ProductName>
                                          <ProductId>
                                            <b>Tác giả:</b> {item.bookId.translator}
                                          </ProductId>
                                          <ProductId>
                                            <b>Số lượng:</b> {item.amount}
                                          </ProductId>
                                          {/* <ProductColor color="black" /> */}
                                          <ProductSize>
                                            <b>Thời gian phải trả sách:</b> {Moment(item.exp).format('HH:mm:ss, DD/MM/YYYY')}
                                          </ProductSize>
                                        </Details>
                                      </ProductDetail>
                                      <PriceDetail>
                                        <ProductAmountContainer>
                                          {func(item)}
                                        </ProductAmountContainer>
                                      </PriceDetail>
                                    </Product>
                                    <Hr />
                                  </>
                                )
                              })
                            }
                          </Info>
                          <Summary>
                            <SummaryTitle>TỔNG SỐ SÁCH</SummaryTitle>
                            <SummaryItem>
                              <SummaryItemText>Số đầu sách chờ duyệt</SummaryItemText>
                              <SummaryItemPrice>{borrowingUser?.length != 0 ? borrowingUser.length : 0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                              <SummaryItemText>Số sách mượn</SummaryItemText>
                              <SummaryItemPrice>{borrowingUser?.reduce((pre, cur) => { return pre + cur.amount }, 0)}</SummaryItemPrice>
                            </SummaryItem>
                          </Summary>
                        </>
                        :
                        <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa mượn quyển sách nào</div>
                        </div>
                      :
                      <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                        <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa mượn quyển sách nào</div>
                      </div>
                    :
                    <></>
                }
                {
                  valueTab == 5 ?
                    returnedUser ?
                      returnedUser.length != 0 ?
                        <>
                          <Info>
                            {
                              returnedUser.map(item => {
                                return (
                                  <>
                                    <Product>
                                      <ProductDetail>
                                        <Image src={item.bookId.image} />
                                        <Details>
                                          <ProductName>
                                            <b>Tên sách:</b> {item.bookId.name}
                                          </ProductName>
                                          <ProductId>
                                            <b>Tác giả:</b> {item.bookId.translator}
                                          </ProductId>
                                          <ProductId>
                                            <b>Số lượng:</b> {item.amount}
                                          </ProductId>
                                          {/* <ProductColor color="black" /> */}
                                          <ProductSize>
                                            <b>Ngày bạn trả sách</b> {item.timeReturn}
                                          </ProductSize>
                                        </Details>
                                      </ProductDetail>
                                      <PriceDetail>
                                        <ProductAmountContainer>
                                          <Tooltip title="Bạn đã trả sách thành công!" arrow={true}>
                                            <Chip icon={<BookmarkAddedIcon />} label="ĐÃ TRẢ" variant="outlined" color="success" />
                                          </Tooltip>
                                        </ProductAmountContainer>
                                      </PriceDetail>
                                    </Product>
                                    <Hr />
                                  </>
                                )
                              })
                            }
                          </Info>
                          <Summary>
                            <SummaryTitle>TỔNG SỐ SÁCH</SummaryTitle>
                            {/* <SummaryItem>
                      <SummaryItemText>Subtotal</SummaryItemText>
                      <SummaryItemPrice>$ 80</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemText>Estimated Shipping</SummaryItemText>
                      <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem> */}
                            <SummaryItem>
                              <SummaryItemText>Số đầu sách chờ duyệt</SummaryItemText>
                              <SummaryItemPrice>{returnedUser?.length != 0 ? returnedUser.length : 0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                              <SummaryItemText>Số sách mượn</SummaryItemText>
                              <SummaryItemPrice>{returnedUser?.reduce((pre, cur) => { return pre + cur.amount }, 0)}</SummaryItemPrice>
                            </SummaryItem>
                            {/* <Button>MƯỢN SÁCH</Button> */}
                          </Summary>
                        </>
                        :
                        <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                          <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa trả quyển sách nào</div>
                        </div>
                      :
                      <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
                        <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Hiện tại chưa trả quyển sách nào</div>
                      </div>
                    :
                    <></>
                }
              </Bottom>
            </Wrapper>
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

export default Cart;
