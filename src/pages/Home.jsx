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

const Home = ({user}) => {
  const [cart, setCart] = useState("")
  const [book, setBook] = useState("")
  // const { user } = useContext(AuthContext)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [sliderItems, setSlideItems] = useState([]);

  useEffect(() => {
    (async () => {
      const UserCart = await getUserCart(setNotify)
      setCart(UserCart?.data?.data?.cartItems)
      const book = await getListBook(setNotify)
      setBook(book?.data?.data)
      const bannerList = await getListBanner(setNotify)
      setSlideItems(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
    })()
    return;
  }, [])
  return (
    <div>
      <Navbar cart={cart} user={user}/>
      <Announcement />
      {
        sliderItems ?
          sliderItems.length != 0 ?
            <Slider sliderItems={sliderItems} />
            :
            <LoadingCircle />
          :
          <></>
      }
      <Categories />
      <Products setCart={setCart} books={book} query="" user={user}/>
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default Home;
