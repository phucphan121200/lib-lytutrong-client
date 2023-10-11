import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import React, { useState, useContext } from "react";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from "../context/authAPI/apiCalls";
import { AuthContext } from "../context/authAPI/AuthContext";
import Notification from "../components/Notification";
import login_1 from "../assets/image/login-1.png"


const Container = styled.div`
position: fixed;
display: flex;
justify-content: center;
background: linear-gradient(
  rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0.5)
),
url("https://static.vecteezy.com/system/resources/previews/002/058/893/original/exotic-tropical-plant-background-free-vector.jpg")
  center;
align-items: center;
width: 100%;
height: 100%;
top: 0px;
left: 0px;
z-index: 1000;
${mobile({ flexDirection: "column-reverse"})} ${tablet({ flexDirection: "column-reverse"})}
`;

const Wrapper = styled.div`
  width: 30%;
  height: 70%;
  // padding: 50px 50px;
  display: flex;
  border-radius: 20px 0px 0px 20px;
  
  // align-items: center;
  flex-direction: column;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: none;
  ${mobile({ width: "100%", 
  borderRadius: "0px 0px 20px 20px", 
  height: "auto",
  paddingBottom: "35px",
  boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px" })}
  ${tablet({ width: "60%", 
  borderRadius: "0px 0px 20px 20px", 
  height: "auto",
  paddingBottom: "35px",
  boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px" })}
`;

const WrapperImg = styled.div`
  width: 30%;
  height: 70%;
  // padding: 50px 50px;
  display: flex;
  border-radius: 0px 20px 20px 0px;
  justify-content: center;
  //align-items: center;
  flex-direction: column;
  background-color: #2E8B57;
  // background-color: #8FD9D1;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  border: none;
  ${mobile({ width: "100%",
  height: "30%", 
  objectFit: "cover", 
  backgroundColor: "white", 
  borderRadius: "20px 20px 0px 0px;",
  alignItems: "center" })}
  ${tablet({ width: "60%",
  height: "20%", 
  objectFit: "cover", 
  backgroundColor: "white", 
  borderRadius: "20px 20px 0px 0px;",
  alignItems: "center" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  // padding-bottom: 40px;
  margin: 80px 0px 0px 30px;
  ${mobile({ margin: "20px 0px 0px 0px", 
  display: "flex",
  alignItems: "center", 
  justifyContent: "center"})}
  ${tablet({ margin: "20px 0px 0px 0px", 
  display: "flex",
  alignItems: "center", 
  justifyContent: "center"})}

`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  justify-content: start;
  ${mobile({
    marginTop: "30px"
  })}
  ${tablet({
    marginTop: "30px"
  })}
`;

const Image = styled.img`
${mobile({
  height: "100%",
  width: "50%",
  objectFit: "cover",
})}
${tablet({
  height: "100%",
  width: "50%",
  objectFit: "cover",
})}
`;
const InputUI = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  // width: 100%;
  height: 50px;
  border: none;
  background-color: #2E8B57;
  color: white;
  cursor: pointer;
  // margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  box-shadow: 0px 8px 0px #1e5737,0px 8px 2px #222222;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0px 5px 0px #1e5737,0px 5px 2px #222222;
    margin-top: 3px;
  }
  &:active {
    box-shadow: none;
    margin-top: 8px;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Loader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 5px solid #fff;
    border-top-color: #B2B2B2;
    border-radius: 50%;
    animation: loading 0.75s ease infinite;
  }
  @keyframes loading {
    from {
      transform: rotate(0turn)
    }
    to {
      transform: rotate(1turn)
    }
  }
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [idcard, setIdcard] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isFetching, dispatch } = useContext(AuthContext);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ idcard, password }, dispatch, setNotify);
    setLoading(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Đăng nhập</Title>
        <Form>
          <TextField
            // fullWidth
            required
            size='small'
            name='issuingcompany'
            id="outlined-required"
            // placeholder="Điền số điện thoại của bạn"
            label="CCCD/ Mã định danh"
            sx={{
              '& > :not(style)': { marginRight: "30px", marginLeft: "30px" },
            }}
            onChange={(e) => setIdcard(e.target.value)}
          />
          <FormControl sx={{ margin: "30px" }}
            variant="outlined"
            size="small"
            id="outlined-required"
            required
            // fullWidth
            onChange={(e) => setPassword(e.target.value)}>
            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="password"
            />
          </FormControl>
          <Button onClick={handleLogin} >
            {
              loading ?
                <Loader />
                :
                <p style={{ fontSize: "15px" }}>
                  ĐĂNG NHẬP
                </p>
            }
          </Button>
        </Form>
      </Wrapper>
      <WrapperImg>
        <Image src={login_1}/>
      </WrapperImg>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </Container>

  );
};

export default Login;
