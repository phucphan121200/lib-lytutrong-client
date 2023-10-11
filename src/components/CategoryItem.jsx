import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";

const Button = styled.button`
    opacity: 0;
    border: 2px solid white;
    padding: 10px 20px;
    background-color: transparent;
    color: white;
    cursor: pointer;
    font-weight: 600;
    border-radius: 20px;
    transition: 0.5s ease-in-out;

    &:hover{
      background-color: white;
      color: gray;
    }
    ${mobile({
      display: "none"
    })}
    ${tablet({
      display: "none"
    })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: 0.4s ease-in-out;
  z-index: 2;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
`;

const Container = styled(Link)`
  margin: 5px;
  width: calc(25% - 10px);
  aspect-ratio: 2 / 3;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  transition: 0.5s ease-in-out;
  &:hover ${Button} {
    opacity: 1;
  }
  &:hover ${Info} {
    background-color: rgba(0, 0, 0, 0.6);
  }
  &:hover ${Image} {
    transform: scale(1.2);
  }
  ${mobile({
    margin: "5px",
    aspectRatio: "1 / 1"
  })}
  ${tablet({
    margin: "5px",
    aspectRatio: "1 / 1"
  })}
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
    transition: 0.5s ease-in-out;
    margin-top: 60%;
    font-size: 30px;
    ${mobile({
      marginTop: "45%",
      fontSize: "10px",
      marginBottom: "0px"
    })}
    ${tablet({
      marginTop: "45%",
      fontSize: "20px",
      marginBottom: "0px"
    })}
`;


const CategoryItem = ({ item }) => {
  return (
    <Container to="/books" state= {{item}} >
      <Image src={item.image} />
      <Info>
        <Title>{item.name}</Title>
          <Button>CHI TIẾT</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
