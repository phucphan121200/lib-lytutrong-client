import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import React, { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}

`;

const Categories = ({ categories }) => {
  return (
    <Container>
      {
        categories ?
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
