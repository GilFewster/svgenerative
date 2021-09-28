import React from "react";
import styled from "styled-components";

const StyledArtboard = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;

  > :first-child {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

type ArtboardProps = {
  type: ArtboardType;
  children?: any;
};

export const Artboard = React.forwardRef<HTMLDivElement, ArtboardProps>(
  ({ type, children, ...props }, ref) => (
    <StyledArtboard data-artboard={type} {...props} ref={ref}>
      {children}
    </StyledArtboard>
  )
);
