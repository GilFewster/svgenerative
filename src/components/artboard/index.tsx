import React from "react";
import styled from "styled-components";

const StyledArtboard = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
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
