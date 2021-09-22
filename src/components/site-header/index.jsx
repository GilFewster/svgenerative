import React from "react";
import styled from "styled-components";

const Header = styled.header`
  padding: 20px;
  border-bottom: 1px solid #dedede;
  background-color: #333;
  color: #fff;

  h1 {
    font-weight: normal;
  }
`;

export const SiteHeader = () => (
  <Header>
    <h1>Squiggles</h1>
  </Header>
);
