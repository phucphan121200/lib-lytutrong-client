import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { getUserCart } from "../context/cartAPI/apiCalls"
import { getUser } from "../context/userAPI/apiCalls"
import React, { useEffect, useState, useContext } from "react";
import { getallBookClient } from "../context/bookAPI/apiCalls";
import { AuthContext } from "../context/authAPI/AuthContext";
import { getListBanner } from "../context/bannerAPI/apiCalls";
import LoadingCircle from "../components/loadingCircle/LoadingCircle";
import { getListCategory } from "../context/categoryAPI/apiCalls";
import LoadingPage from "../components/loadingPage/LoadingPage"

const Home = ({ userRedux }) => {
  const [cart, setCart] = useState("")
  const [user, setUser] = useState("")
  const [book, setBook] = useState("")
  const [searchBook, setSearchBook] = useState("")
  const { dispatch } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [categories, getCategories] = useState("")
  const [sliderItems, setSlideItems] = useState([]);

  useEffect(() => {
    (async () => {
      const UserCart = await getUserCart(dispatch, setNotify)
      setCart(UserCart?.data?.data?.cartItems)

      const UserInfo = await getUser(dispatch, setNotify)
      setUser(UserInfo?.data?.data)

      const bannerList = await getListBanner(setNotify)
      setSlideItems(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))

      const book = await getallBookClient(setNotify)
      setSearchBook(book?.data?.data)
      const arrayBook = [...book?.data?.data]
      for (let i = arrayBook?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayBook[i], arrayBook[j]] = [arrayBook[j], arrayBook[i]];
      }
      if (arrayBook?.length >= 8) {
        let array8length = []
        for (let i = 0; i < 8; i++) {
          array8length.push(arrayBook[i])
        }
        setBook(array8length);
      }

      const cateList = await getListCategory(setNotify)
      getCategories(cateList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
    })()
    return;
  }, [])
  return (
    <div>
      {
        sliderItems.length != 0 ?
          <>
            < Navbar cart={cart} user={user} userRedux={userRedux} book={searchBook} />
            <Slider sliderItems={sliderItems} />
            <Categories categories={categories ? categories : ""} />
            <Products setCart={setCart} books={book ? book : ""} query="" user={user} userRedux={userRedux} />
            <Footer />
          </>
          :
          <LoadingPage />
      }
    </div >
  );
};

export default Home;
