import React from "react";
import { styled } from "styled-components";
import Image from "./component/Image";

const App = () => {
  return (
    <div>
      <Image />
      <Footer>Copyright © Minhee Kim All rights reserved.</Footer>
    </div>
  );
};

export default App;

const Footer = styled.footer`
  position: fixed;
  bottom: 10px;
  right: 20px;
  color: black;
`;
