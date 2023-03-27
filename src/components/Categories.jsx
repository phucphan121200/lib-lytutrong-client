import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import React, {useState, useEffect} from "react";
import { getListCategory } from "../context/categoryAPI/apiCalls";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {
  const [categories, getCategories] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      const cateList = await getListCategory(setNotify)
      getCategories(cateList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
    })()
    return;
  }, [])

  return (
    <Container>
      {
        categories?
      categories.map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))
      :
      <></>
      }
    </Container>
  );
};

export default Categories;
