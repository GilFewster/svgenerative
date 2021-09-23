import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  display: inline;
  border: solid 1px #acacac;
  text-transform: uppercase;
  min-width: 80px;

  padding: 0.5em 0.25em;
  border-radius: 5px;
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  background: #fff;

  &:hover {
    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.5);
    font-size: 0.9em;
    background: linear-gradient(
      153deg,
      rgba(238, 238, 238, 1) 0%,
      rgba(255, 255, 255, 1) 30%,
      rgba(228, 228, 228, 1) 100%
    );
  }
`;

export const Button: React.FC<HTMLButtonElement> = (children, ...props) => (
  <ButtonStyles {...props}>{children}</ButtonStyles>
);
