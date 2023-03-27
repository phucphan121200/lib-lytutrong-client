import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { getUserCart } from "../context/cartAPI/apiCalls"
import React, { useEffect, useState, useContext } from "react";
import { getListBook } from "../context/bookAPI/apiCalls";
import { AuthContext } from "../context/authAPI/AuthContext";
import { getListBanner } from "../context/bannerAPI/apiCalls";
import LoadingCircle from "../components/loadingCircle/LoadingCircle";
import { getListCategory } from "../context/categoryAPI/apiCalls";
import LoadingPage from "../components/loadingPage/LoadingPage"

const Home = ({ user }) => {
  const [cart, setCart] = useState("")
  const [book, setBook] = useState("")
  // const { user } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [categories, getCategories] = useState("")
  const [sliderItems, setSlideItems] = useState([]);
  const [test, setTest] = useState(null);

  useEffect(() => {
    (async () => {
      const UserCart = await getUserCart(setNotify)
      setCart(UserCart?.data?.data?.cartItems)
      const book = await getListBook(setNotify)
      setBook(book?.data?.data)
      const bannerList = await getListBanner(setNotify)
      setSlideItems(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
      const cateList = await getListCategory(setNotify)
      getCategories(cateList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
    })()
    return;
  }, [])
  return (
    <div>
      {
        sliderItems && categories && book ?
          <>
            < Navbar cart={cart} user={user} />
            <Announcement />
            {
              sliderItems.length != 0 ?
                <Slider sliderItems={sliderItems} />
                :
                <LoadingCircle />
            }
            <Categories categories={categories} />
            <Products setCart={setCart} books={book} query="" user={user} />
            {/* <Newsletter /> */}
            <Footer />
          </>
          :
          <LoadingPage />
      }
    </div >
  );
};

export default Home;
