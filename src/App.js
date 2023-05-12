import React from "react";
import { styled } from "styled-components";
import Image from "./component/Image";

const App = () => {
  return (
    <Wrapper>
      <Header>
        <Title>
          클립보드에 저장한 이미지를 텍스트로 추출하는 웹 서비스입니다.
          <Eng>
            (A web service that extracts images stored on the clipboard as
            text.)
          </Eng>
        </Title>
        <Description>
          <div>Window: Ctrl + C </div>
          <div>Mac: Cmd + Shift + 3(전체) or 4(선택)</div>
        </Description>
      </Header>
      <Image />
      <Footer>Copyright © Minhee Kim All rights reserved.</Footer>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  background-color: white;
  width: 100%;

  position: fixed;
  top: 10px;
  left: 20px;
`;

const Title = styled.h1``;

const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 18px;
  color: black;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 10px;
  right: 20px;
  color: black;
`;

const Eng = styled.div`
  font-size: 20px;
  color: black;
`;
