import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { getListBanner } from "../context/bannerAPI/apiCalls";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 30px;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  margin-top: 30px;
  height: 85%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px 100px 50px 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.a`
  color: #2E8B57;
  text-decoration: none;
  border: 2px solid #2E8B57;
  padding: 10px 20px;
  font-size: 20px;
  transition: color 0.4s linear;
  position: relative;
  border-radius: 2px;
  &:hover {
    color: white;
  }
  &:before {
    content: "";
    position: absolute;
    left:0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #2E8B57;
    // background: #8FD9D1;
    z-index: -1;
    transition: transform 0.5s;
    transform-origin: 0 0;
    transition-timing-function: cubic-bezier(0.5,1.6,0.4,0.7);
    transform: scaleX(0);
  }
  &:hover:before {
    transform: scaleX(1);
  }
`;

const Slider = ({ sliderItems }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  // const [categories, getCategories] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : (sliderItems.length - 1));
    } else {
      setSlideIndex(slideIndex < (sliderItems.length - 1) ? slideIndex + 1 : 0);
    }
  };

  useEffect(async () => {
    setInterval(() => { setSlideIndex(item => item < (sliderItems.length - 1) ? item + 1 : 0) }, 30000)
  }, [])


  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {
          sliderItems ?
            sliderItems.map((item) => (
              <Slide key={item._id}>
                <ImgContainer>
                  <Image src={item.image} />
                </ImgContainer>
                <InfoContainer>
                  <Title>{item.name}</Title>
                  <Desc>{item.description}</Desc>
                    <Button
                    href={item.link}
                    rel="noreferrer"
                    target="_blank"
                    >CHI TIẾT</Button>
                </InfoContainer>
              </Slide>
            ))
            :
            <></>
        }
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
