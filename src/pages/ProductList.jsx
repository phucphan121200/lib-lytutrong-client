import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import React, { useState, useEffect, useContext } from "react";
import { } from "../context/bookAPI/apiCalls"
import { getUserCart } from "../context/cartAPI/apiCalls"
import { getListCategory } from "../context/categoryAPI/apiCalls"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterBookClient } from "../context/bookAPI/apiCalls";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useLocation } from "react-router-dom";
import LoadingCircle from "../components/loadingCircle/LoadingCircle";
import Pagination from '@mui/material/Pagination';
import { getUser } from "../context/userAPI/apiCalls"
import { AuthContext } from "../context/authAPI/AuthContext";
import LoadingPage from "../components/loadingPage/LoadingPage"

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const SelectTemp = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = ({ userRedux }) => {
  const { dispatch } = useContext(AuthContext)
  const [cate, setCate] = useState("")
  const [book, setBook] = useState("")
  const [query, setQuery] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [user, setUser] = useState("")
  const [currentPage, setcurrentPage] = useState(1)
  const [postPerPage, setpostPerPage] = useState(8)
  const location = useLocation()
  const [cart, setCart] = useState("")
  const [age, setAge] = useState(location?.state?.item._id ? location.state.item._id : 1);


  const handleChange = async (event) => {
    setAge(event.target.value);
    setBook("")
    const book = await filterBookClient(event.target.value, setNotify)
    setBook(book?.data?.data)
  };


  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPost = book?.slice(firstPostIndex, lastPostIndex)

  const setPagination = (event, value) => {
    setcurrentPage(value);
  }

  useEffect(() => {
    (async () => {
      const UserInfo = await getUser(dispatch, setNotify)
      setUser(UserInfo?.data?.data)
      const UserCart = await getUserCart(dispatch, setNotify)
      setCart(UserCart?.data?.data?.cartItems)
      const Catetory = await getListCategory(setNotify)
      setCate(Catetory?.data?.data)
      const book = await filterBookClient(age, setNotify)
      setBook(book?.data?.data)
    })()
    return;
  }, [])

  return (
    <div>
      {
        // userRedux ?
        <Container>
          <Navbar cart={cart} user={user} userRedux={userRedux} book={book} />
          {/* <Announcement /> */}
          {/* <Title>Danh mục các đầu sách</Title> */}
          <FilterContainer>
            <Filter>
              <FormControl sx={{ width: "250px", marginTop: "10px" }}>
                <InputLabel id="demo-simple-select-label">Lọc sách theo thể loại</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  MenuProps={{ disableScrollLock: true }}
                  label="Lọc sách theo thể loại"
                  onChange={handleChange}
                >
                  <MenuItem key={123456789} value={1}>Không lọc</MenuItem>
                  {
                    cate ?
                      cate.map(option => {
                        return (
                          <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                        )
                      })
                      :
                      <></>
                  }
                </Select>
              </FormControl>
            </Filter>
          </FilterContainer>
          {
            // currentPost ?
            <>
              <Products setCart={setCart} books={currentPost} query={query} user={user} userRedux={userRedux} />
              <Pagination style={{ display: "flex", justifyContent: "center" }} count={Math.ceil(book.length / postPerPage)} page={currentPage} onChange={setPagination} size="large" />
            </>
            // :
            // <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            //   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
            //   <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Không có sách nào được tìm thấy</div>
            // </div>
          }

          {/* <Pagination totalPost={book.length} postPerPage={postPerPage}/> */}
          {/* <Newsletter /> */}
          <Footer />
        </Container>
        // :
        // <LoadingPage />
      }
    </div>
  );
};

export default ProductList;
