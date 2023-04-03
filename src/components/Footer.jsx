import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.a`
  width: 50%;
  margin-bottom: 10px;
  text-decoration: none;
  color: #000;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>THƯ VIỆN</Logo>
        <Desc>
        Một thư viện là một kho sưu tập các nguồn thông tin, được chọn lựa bởi các chuyên gia và có thể được tiếp cận để tham khảo hay mượn, thường là trong một môi trường yên tĩnh phù hợp cho học tập.
        </Desc>
        <SocialContainer>
          <SocialIcon
          color="3B5999"
          href="https://www.facebook.com/lytutrongvungtau"
          target="_blank">
            <Facebook />
          </SocialIcon>
          {/* <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon> */}
        </SocialContainer>
      </Left>
      <Center>
        <Title>Đường dẫn nhanh</Title>
        <List>
          <ListItem
          href="https://thuvienlytutrong.netlify.app/"
          >Trang chủ mượn sách</ListItem>
          <ListItem
          href="https://quanly-thuvienlytutrong.netlify.app/"
          >Trang quản lý sách</ListItem>
          <ListItem
          href="https://thuvienlytutrong.netlify.app/books/"
          >Danh sách đầu sách</ListItem>
          <ListItem
          href="https://thuvienlytutrong.netlify.app/cart/"
          >Tủ sách của bạn</ListItem>
          {/* <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>Liên hệ</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> 242 Đường 2/9, Phường 8, TP. Vũng Tàu, BR-VT
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> 0254 3515 779
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> tieuhoclytutrong.p8.vt@gmail.com
        </ContactItem>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
      </Right>
    </Container>
  );
};

export default Footer;
