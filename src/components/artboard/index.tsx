import React from "react";
import styled from "styled-components";

const Container = styled.div`
  /* width: 100%;
  height: 100%; */
`;

const StyledArtboard = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  background: white;

  border: 2px solid #ddd;

  > :first-child {
    width: 100%;
    height: 100%;
  }
  /* } */
`;

type ArtboardProps = {
  type: ArtboardType;
};

export const Artboard: React.FC<ArtboardProps> = ({
  type,
  children,
  ...props
}) => (
  <Container className="artboard">
    <StyledArtboard data-artboard={type} {...props}>
      {children}
    </StyledArtboard>
  </Container>
);
