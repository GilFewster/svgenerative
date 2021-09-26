import React from "react";
import styled from "styled-components";

const StyledArtboard = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
  background: white;

  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border: 2px solid #ddd;

  > :first-child {
    width: 100%;
    /* width: 500px; */
    height: 100%;
  }
`;

type ArtboardProps = {
  type: ArtboardType;
};

export const Artboard: React.FC<ArtboardProps> = ({
  type,
  children,
  ...props
}) => (
  <StyledArtboard data-artboard={type} {...props}>
    {children}
  </StyledArtboard>
);
