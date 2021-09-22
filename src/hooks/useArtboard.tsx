import React from "react";
import styled from "styled-components";
import { Svg, SVG } from "@svgdotjs/svg.js";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  svg {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background: white;
  }
`;

const Artboard = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
  <Container ref={ref} className="canvas" {...props}>
    <svg className="svg" viewBox="0 0 800 600" />
  </Container>
));

export const useArtboard = () => {
  const svgInstance = SVG(`.svg`) as Svg;
  return { Artboard, svgInstance };
};
