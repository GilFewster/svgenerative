import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  &:first-child {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background: white;

    width: 100%;
    height: 100%;

    border: 2px solid #ddd;
  }
`;

type ArtboardProps = {
  type: ArtboardType;
};

export const Artboard: React.FC<ArtboardProps> = React.forwardRef(
  ({ type, children, ...props }, ref: React.Ref<SVGSVGElement>) => {
    return (
      <Container data-artboard={type} {...props}>
        {children}
      </Container>
    );
  }
);
