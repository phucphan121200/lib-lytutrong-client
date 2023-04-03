import styled from "styled-components";
import Product from "./Product";
import React, { useState, useEffect } from "react";
import { getListBook, getallBookClient, filterBookClient } from "../context/bookAPI/apiCalls";
import LoadingCircle from "./loadingCircle/LoadingCircle";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
`;


const Products = ({ setCart, books, query, user, userRedux }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  return (
    <Container>
      {
        books ?
          books.length != 0 ?
            books.filter((book) =>
              book.name.toLowerCase().includes(query)
            ).map((item) => (
              <Product item={item} key={item._id} setCart={setCart} user={user} userRedux={userRedux}/>
            ))
            :
            <div className="centerimage" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPdSkTpQc-Aq-hlCnND0fozOAOEROEZxFFAw&usqp=CAU" style={{ display: "inline-block" }}></img>
              <div style={{ fontWeight: "bold", fontSize: "20px", color: "gray" }}>Không có sách nào được tìm thấy</div>
            </div>
          :
          <>
            <Product item={""} key={1} setCart={setCart} user={user} />
            <Product item={""} key={2} setCart={setCart} user={user} />
            <Product item={""} key={3} setCart={setCart} user={user} />
            <Product item={""} key={4} setCart={setCart} user={user} />
            <Product item={""} key={5} setCart={setCart} user={user} />
            <Product item={""} key={6} setCart={setCart} user={user} />
            <Product item={""} key={7} setCart={setCart} user={user} />
            <Product item={""} key={8} setCart={setCart} user={user} />
          </>
      }
    </Container>
  );
};

export default Products;
