import React, { useState } from "react";
import { css, styled, Typography } from "@mui/material";
// import { useAppSelector } from '../../redux/hooks'

// import { RegistrationForm } from '../registration/RegistrationForm'
// import { LoadingOverlay } from '../common/LoadingOverlay'

import illustrationSrc from "../../assets/Sigla.png";
// import loginIllustrationSrc from '../login/images/login_figure.png'
// import bottomWaveSrc from './images/wave.svg'
import { LoginForm } from "../generic-components/LoginForm";

enum Mode {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
}

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState(Mode.LOGIN);

  //   const loginLoading = useAppSelector(state => state.appState.loginLoading)
  //   const registerLoading = useAppSelector(state => state.appState.registerLoading)
  //   const showLoading = loginLoading || registerLoading

  const leftSectionInfo = {
    [Mode.REGISTER]: {
      title: "Find a mentor",
      subtitle: "suitable to your needs",
      src: illustrationSrc,
    },
    [Mode.LOGIN]: {
      title: "Welcome back!",
      subtitle: "",
      src: illustrationSrc,
    },
  };

  return (
    <Container>
      {/* <LoadingOverlay visible={showLoading} /> */}
      <LeftSection>
        {/* <Title variant="h3">{leftSectionInfo[mode].title}</Title>
        <SubTitle variant="h5">{leftSectionInfo[mode].subtitle}</SubTitle> */}
        <Illustration
          src={leftSectionInfo[mode].src}
          alt={`${mode} Illustration`}
        />
      </LeftSection>
      <RightSection>
        <Layer visible={mode === Mode.LOGIN}>
          <LoginForm registerClick={() => setMode(Mode.REGISTER)} />
        </Layer>
        {/* <Layer visible={mode === Mode.REGISTER}>
          <RegistrationForm loginClick={() => setMode(Mode.LOGIN)} />
        </Layer> */}
      </RightSection>
      {/* <BottomWave src={bottomWaveSrc} alt="" /> */}
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  gap: 10%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fefefe;
`;

const Title = styled(Typography)`
  user-select: none;
  font-weight: bold;
`;

const SubTitle = styled(Typography)`
  user-select: none;
  font-weight: bold;
`;

const LeftSection = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  height: 400px;
  width: 400px;
  border-radius: 50px 0 50px 0;
`;

const RightSection = styled("div")`
  display: flex;
  position: relative;
`;

const Illustration = styled("img")`
  width: 250px;
  height: 150px;
  object-fit: cover;
  -webkit-user-drag: none;
  -webkit-user-select: none;
`;

const Layer = styled("div")<{ visible?: boolean }>`
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}

  z-index: 1;
`;

const BottomWave = styled("img")`
  user-select: none;
  -webkit-user-drag: none;
  position: absolute;
  bottom: 0;
  z-index: 0;
  opacity: 0.8;
`;

export default LoginPage;
